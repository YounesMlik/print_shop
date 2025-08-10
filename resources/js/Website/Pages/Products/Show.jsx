import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
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

export default function ProductShow({ product_resource }) {
    const product = product_resource.data;

    const [selectedOption, setSelectedOption] = React.useState(null);

    // console.log(product);

    const buildWhatsAppLink = () => {
        let message = `Product name: ${product.name}\n`;
        console.log(selectedOption);

        message += `Option name: ${selectedOption.name}\n`;
        message += `Option Attributes:\n`;
        selectedOption.option_attributes.forEach((attribute) => {
            message += `    ${attribute.name}: ${attribute.value}\n`;
        });
        sendWhatsappMessage(message);
    };

    return (
        <div className="container mx-auto p-4 max-w-xl grid gap-4">
            <Head title={product.name} />
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href={route('products.index')} >
                                Products
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

            <VariantPicker options={product.options} value={selectedOption?.id} onChange={setSelectedOption} />

            <Button
                className="mt-6 w-full"
                onClick={() => buildWhatsAppLink()}
            >
                Order via WhatsApp
            </Button>
        </div>
    );
}
