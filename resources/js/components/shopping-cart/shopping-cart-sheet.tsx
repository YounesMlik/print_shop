import { observer } from "mobx-react-lite";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import { CartLine, shoppingCart } from "./shopping-cart-store"; // your dict-based singleton store
import { QuantitySelector } from "@/components/quantity-selector";
import { useTranslation } from "react-i18next";
import { Checkout } from "@/components/checkout";


export const ShoppingCartSheet = observer(() => {
  const { t } = useTranslation();
  const itemCount = shoppingCart.itemCount;
  const total = shoppingCart.total;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="relative">
          <ShoppingCart className="mr-2 h-4 w-4" />
          {t("shopping_cart.trigger")}
          {itemCount > 0 && (
            <Badge className="ml-2">
              {t("shopping_cart.items_count", { count: itemCount })}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="flex w-full max-w-lg flex-col p-0">
        <SheetHeader className="px-6 py-4">
          <SheetTitle className="text-lg">{t("shopping_cart.title")}</SheetTitle>
        </SheetHeader>

        <Separator />

        <ScrollArea className="flex-1 px-6 py-4">
          {shoppingCart.isEmpty ? (
            <EmptyState />
          ) : (
            <div className="space-y-4">
              {shoppingCart.lines.map((line, key) => (
                <CartLineRow
                  key={key}
                  lineItem={line}
                />
              ))}
            </div>
          )}
        </ScrollArea>

        <Separator />

        <SheetFooter className="px-6 py-4">
          <div className="w-full space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{t("shopping_cart.total")}</span>
              <span className="font-medium">{formatMoney(total)}</span>
            </div>
            <div className="flex gap-2">
              <Checkout>
                <Button
                  className="flex-1"
                  disabled={shoppingCart.isEmpty}
                >
                  {t("checkout.open")}
                </Button>
              </Checkout>

              <Button
                variant="ghost"
                disabled={shoppingCart.isEmpty}
                onClick={() => shoppingCart.clear()}
              >
                {t("shopping_cart.clear")}
              </Button>
            </div>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
});

function EmptyState() {
  const { t } = useTranslation();
  return (
    <div className="flex h-40 flex-col items-center justify-center text-center text-sm text-muted-foreground">
      <ShoppingCart className="mb-2 h-5 w-5" />
      {t("shopping_cart.empty")}
    </div>
  );
}

type LineProps = {
  lineItem: CartLine
};

const CartLineRow = observer(function CartLineRow({ lineItem }: LineProps) {
  const { t } = useTranslation();
  const { product, option, quantity } = lineItem;

  const dec = () => shoppingCart.setQuantity(product.id, option.id, quantity - 1);
  const inc = () => shoppingCart.setQuantity(product.id, option.id, quantity + 1);
  const remove = () => shoppingCart.remove(product.id, option.id);

  const onManualQty = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(0, Number(e.target.value.replace(/\D/g, "")));
    shoppingCart.setQuantity(product.id, option.id, val);
  };

  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-2xl border p-3 shadow-sm">
      <div className="min-w-0">
        <div className="truncate font-medium">{product.name}</div>
        <div className="truncate text-xs text-muted-foreground">{option.name}</div>
        <div className="mt-1 text-xs text-muted-foreground">
          {formatMoney(option.price)} / unit
        </div>

        <QuantitySelector
          value={quantity}
          onChange={(quantity) => shoppingCart.setQuantity(product.id, option.id, quantity)}
        />
      </div>

      <div className="flex flex-col items-end gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={remove}
          className="h-8 w-8"
          title={t("shopping_cart.remove")}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
        <div className="text-right text-sm font-semibold">
          {formatMoney(lineItem.total)}
        </div>
      </div>
    </div>
  );
});

// ---- utils ----
function formatMoney(value: number, currency = "MAD", locale = "fr-MA") {
  try {
    return new Intl.NumberFormat(locale, { style: "currency", currency }).format(value);
  } catch {
    return `${value.toFixed(2)} ${currency}`;
  }
}