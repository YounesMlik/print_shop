import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { sendWhatsappMessage } from "@/components/helpers";
import { Badge } from "@/components/ui/badge";

import VariantPicker from "@/components/product-option-picker";
import { useTranslation } from "react-i18next";

export default function ProductShow({ product_resource }) {
    const { t } = useTranslation();
    const product = product_resource.data;

    const [selectedOption, setSelectedOption] = React.useState(null);
    const [message, setMessage] = React.useState("");

    // console.log(message);

    function optionSelectedHandler(option) {
        setSelectedOption(option);
        setMessage(buildWhatsAppMessage(product, option))
    }

    return (
        <div className="container mx-auto p-4 max-w-xl grid gap-4">
            <Head title={product.name} />
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href={route('products.index')} >
                                {t("products")}
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href={route('products.index', { super_category: product.category.super_category.id, })} >
                                {product.category.super_category.name}
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href={route('products.index', { category: product.category.id, })} >
                                {product.category.name}
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{product.name}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

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
                <p className="mb-6 text-gray-600">{product.description}</p>
            )}

            <VariantPicker options={product.options} onChange={optionSelectedHandler} />

            <Button
                className="mt-6 w-full"
                disabled={selectedOption === null}
                onClick={() => sendWhatsappMessage(message)}
            >
                {t("order_via_whatsapp")}
            </Button>
        </div>
    );
}


function buildWhatsAppMessage(product, option) {
    let message = `Product name: ${product.name}\n`;
    message += `Option name: ${option.name}\n`;
    message += `Option Attributes:\n`;
    option.option_attributes.forEach((attribute) => {
        message += `    ${attribute.name}: ${attribute.value}\n`;
    });
    return message;
};