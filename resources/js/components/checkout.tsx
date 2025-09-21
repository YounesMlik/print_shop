import { sendWhatsappMessage } from "@/components/helpers"
import { CartLine, shoppingCart as globalShoppingCart, ShoppingCart } from "@/components/shopping-cart/shopping-cart-store"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, userStore } from "@/components/user-store"
import { observer } from "mobx-react-lite"
import { useTranslation } from "react-i18next"
import { KeyAsString, WritableKeysOf } from "type-fest"


type CheckoutProps = React.ComponentProps<typeof Dialog>

export const Checkout = observer(({ children, ...props }: CheckoutProps) => {
  return (
    <CheckoutDialog shoppingCart={globalShoppingCart} >
      {children}
    </CheckoutDialog>
  )
})

type CheckoutDialogProps = React.ComponentProps<typeof Dialog> & { shoppingCart: ShoppingCart }

export const CheckoutDialog = observer(({ children, shoppingCart, ...props }: CheckoutDialogProps) => {
  const { t } = useTranslation();
  const message = buildWhatsAppMessage(userStore, shoppingCart)
  return (
    <Dialog>
      <form id="checkout_form"
        onSubmit={(e) => {
          e.preventDefault();

          sendWhatsappMessage(message)
        }}>
        <DialogTrigger asChild>
          {children ?? <Button>{t("checkout.open")}</Button>}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t("checkout.title")}</DialogTitle>
            <DialogDescription>
              {t("checkout.description")}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            {["name", "address", "email"]
              .map((field, i) => (
                <div className="grid gap-3" key={i}>
                  <Label htmlFor={field}>{t(`checkout.${field}` as any)}</Label>
                  <Input id={field} name={field} required
                    value={(userStore as any)[field]}
                    onChange={(e) => (userStore as any).set(field, e.target.value)}
                  />
                </div>
              ))}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">{t("checkout.cancel")}</Button>
            </DialogClose>
            <Button form="checkout_form" type="submit">{t("order_via_whatsapp")}</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
})


export function buildWhatsAppMessage(
  customer: User,
  { lines, itemCount, total }: ShoppingCart,
) {
  const header = [
    `Customer name: ${customer.name}`,
    `Address: ${customer.address}`,
    customer.email ? `Email: ${customer.email}` : null,
    "",
    "--- Cart ---",
  ]
    .filter(Boolean)
    .join("\n");

  const body = lines.map((line, i) => renderLine(line, i)).join("\n\n");

  const footer = [
    "",
    "--- Summary ---",
    `Total items: ${itemCount}`,
    `Total price: ${fmt(total)}`,
  ].join("\n");

  return [header, body, footer].join("\n");
}

function renderLine(
  { product, option, quantity, total }: CartLine,
  i: number,
) {
  return [
    `#${i + 1}`,
    `Product name: ${product.name}`,
    `Option name: ${option.name}`,
    `Quantity: ${quantity}`,
    `Unit price: ${fmt(option.price)}`,
    `Subtotal: ${fmt(total)}`,
    renderAttrs(option.option_attributes),
  ].join("\n");
};

function renderAttrs(attrs: { name: string; value: string | number }[]) {
  return [
    "Option Attributes:",
    ...attrs.map(a => `    ${a.name}: ${a.value}`)
  ].join("\n");
}

function fmt(n: number, c = "MAD") {
  return new Intl.NumberFormat(undefined, { style: "currency", currency: c }).format(n);
}