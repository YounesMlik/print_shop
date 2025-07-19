import React, { useState } from "react";
import { usePage } from "@inertiajs/inertia-react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";

export default function ProductShow() {
    const { product } = usePage().props;

    // Debug: make sure product structure is correct
    if (!product || !product.options) {
        return (
            <div className="p-4 text-red-600">
                Product data is missing or incomplete.
            </div>
        );
    }

    const [selectedOptions, setSelectedOptions] = useState(
        Object.fromEntries(product.options.map((option) => [option.id, ""]))
    );

    const handleOptionChange = (optionId, value) => {
        setSelectedOptions((prev) => ({
            ...prev,
            [optionId]: value,
        }));
    };

    const buildWhatsAppLink = () => {
        let message = `Order for: ${product.name}\n`;
        product.options.forEach((option) => {
            const selectedValue = selectedOptions[option.id] || "Not selected";
            message += `${option.name}: ${selectedValue}\n`;
        });

        const encoded = encodeURIComponent(message);
        const phone = "212600000000"; // Update this with your business number
        return `https://wa.me/${phone}?text=${encoded}`;
    };

    return (
        <div className="container mx-auto p-4 max-w-xl">
            <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
            {product.description && (
                <p className="mb-6 text-gray-600">{product.description}</p>
            )}

            {product.options.length > 0 ? (
                product.options.map((option) => (
                    <div key={option.id} className="mb-4">
                        <label className="block mb-1 font-medium">
                            {option.name}
                        </label>

                        {option.optionAttributes?.length ? (
                            <Select
                                value={selectedOptions[option.id]}
                                onValueChange={(val) =>
                                    handleOptionChange(option.id, val)
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue
                                        placeholder={`Select ${option.name}`}
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    {option.optionAttributes.map((attr) => (
                                        <SelectItem
                                            key={attr.id}
                                            value={attr.name}
                                        >
                                            {attr.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        ) : (
                            <div className="text-sm text-gray-500 italic">
                                No options available
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <p className="text-gray-500">No configurable options.</p>
            )}

            <Button
                className="mt-6 w-full"
                onClick={() => window.open(buildWhatsAppLink(), "_blank")}
            >
                Order via WhatsApp
            </Button>
        </div>
    );
}
