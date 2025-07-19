import { InertiaLink, usePage } from "@inertiajs/inertia-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ProductsIndex() {
    const { products } = usePage().props;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl mb-6">Products</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {products.map((product) => (
                    <Card key={product.id} className="p-4">
                        <h2 className="text-xl font-semibold">
                            {product.name}
                        </h2>
                        <p className="text-sm mb-4">{product.description}</p>
                        <InertiaLink href={`/products/${product.id}`}>
                            <Button variant="outline">View Details</Button>
                        </InertiaLink>
                    </Card>
                ))}
            </div>
        </div>
    );
}
