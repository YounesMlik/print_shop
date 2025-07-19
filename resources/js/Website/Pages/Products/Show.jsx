import React, { useState } from "react";
import { usePage } from "@inertiajs/inertia-react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function ProductShow() {
    const { product } = usePage().props;

    // State for options selection, keyed by option id
    const [selectedOptions, setSelectedOptions] = useState(
        Object.fromEntries(product.options.map((o) => [o.id, ""]))
    );

    const handleOptionChange = (optionId, value) => {
        setSelectedOptions((prev) => ({ ...prev, [optionId]: value }));
    };

    const buildWhatsAppLink = () => {
        let message = `Order for: ${product.name}\n`;
        product.options.forEach((option) => {
            const selected = selectedOptions[option.id] || "Not selected";
            message += `${option.name}: ${selected}\n`;
        });
        const encoded = encodeURIComponent(message);
        const phone = "212600000000"; // Replace with your phone
        return `https://wa.me/${phone}?text=${encoded}`;
    };

    return (
        <div className="container mx-auto p-4 max-w-lg">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="mb-6">{product.description}</p>

            {product.options.map((option) => (
                <div key={option.id} className="mb-4">
                    <label className="block mb-1 font-medium">
                        {option.name}
                    </label>
                    <Select
                        value={selectedOptions[option.id]}
                        onValueChange={(value) =>
                            handleOptionChange(option.id, value)
                        }
                    >
                        <Select.Trigger
                            className="w-full"
                            aria-label={option.name}
                        >
                            <Select.Value
                                placeholder={`Select ${option.name}`}
                            />
                        </Select.Trigger>
                        <Select.Content>
                            {option.optionAttributes.map((attr) => (
                                <Select.Item key={attr.id} value={attr.name}>
                                    {attr.name}
                                </Select.Item>
                            ))}
                        </Select.Content>
                    </Select>
                </div>
            ))}

            <Button
                onClick={() => window.open(buildWhatsAppLink(), "_blank")}
                className="mt-6 w-full"
            >
                Order via WhatsApp
            </Button>
        </div>
    );
}
