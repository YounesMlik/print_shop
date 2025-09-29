import React from "react";
import { Head, Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/_carousel"
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import VariantPicker from "@/components/variant-picker";
import { useTranslation } from "react-i18next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CartLine, ShoppingCart, shoppingCart } from "@/components/shopping-cart/shopping-cart-store";
import { SetRequired, SetRequiredDeep } from "type-fest";
import { Resource } from "@/types/global";


type ProductShowProps = {
    product_resource: Resource<SetRequiredDeep<Product, "images" | "tags" | "options" | "category" | "category.super_category">>
}
export default function ProductShow({ product_resource }: ProductShowProps) {
    const { t } = useTranslation();
    const product = product_resource.data;


    const [selectedOption, setSelectedOption] = React.useState<SetRequired<Option, "option_attributes"> | null>(null);
    const [quantity, setQuantity] = React.useState(1);
    const local_shoppingCart = new ShoppingCart(
        !selectedOption
            ? []
            : [new CartLine(product, selectedOption, quantity)]
    );


    // console.log(toJS(shoppingCart.items));


    return (
        <div className="container mx-auto p-4 max-w-xl grid gap-4">
            <Head title={product.name} />
            <Breadcrumbs>
                <Link href={route('products.index')} >
                    {t("products")}
                </Link>
                <Link href={route('super-categories.show', { super_category: product.category.super_category.id, })} >
                    {product.category.super_category.name}
                </Link>
                <Link href={route('categories.show', { category: product.category.id, })} >
                    {product.category.name}
                </Link>
                <span>
                    {product.name}
                </span>
            </Breadcrumbs>

            <h1 className="text-2xl font-bold mb-4">{product.name}</h1>

            {product.images.length === 0 ? "" :
                <Carousel>
                    <CarouselContent>
                        {product.images.map((image, key) => (
                            <CarouselItem key={key}>
                                <AspectRatio ratio={16 / 9}>
                                    <img src={image.url} alt="product image" className="rounded-md w-full h-full object-contain" />
                                </AspectRatio>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            }

            <div className="flex flex-wrap gap-1">
                {product.tags.map(tag =>
                    <Badge asChild key={tag.id}>
                        <Link href={route('products.index')} data={{ tags: [tag.id] }}>
                            {tag.name}
                        </Link>
                    </Badge>
                )}
            </div>

            {product.description && (
                <p className="mb-6 text-foreground">{product.description}</p>
            )}

            <VariantPicker
                options={product.options as SetRequired<Option, "option_attributes">[]}
                selectedOption={selectedOption}
                onOptionChange={setSelectedOption}
                quantity={quantity}
                onQuantityChange={setQuantity}
                label={t("option_picker.choose_an_option")}
                no_options_available_label={t("option_picker.no_options_available")}
            />

            <div className="flex gap-4 justify-between mt-6 w-full">
                {/*    WARNING: COMMENTED OUT BECAUSE OF BUG
                 <CheckoutDialog shoppingCart={local_shoppingCart} >
                    <Button
                        className="grow"
                        disabled={selectedOption === null}
                    >
                        {t("checkout.open")}
                    </Button>
                </CheckoutDialog> 
                */}


                <Button
                    className="grow"
                    disabled={selectedOption === null}
                    onClick={() => shoppingCart.add(product, selectedOption as NonNullable<typeof selectedOption>, quantity)}
                >
                    {t("shopping_cart.add")}
                </Button>
            </div>
        </div>
    );
}