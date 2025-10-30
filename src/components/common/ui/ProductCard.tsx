import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ProductResponse } from "@/types/products";

interface ProductCardProps {
    product: ProductResponse;
    onClick?: () => void;
}

export const ProductCard = ({ product, onClick }: ProductCardProps) => {
    return (
        <Card className="w-full cursor-pointer" onClick={onClick}>
            <div className="relative h-48 w-full">
                <img
                    src={product.image.url}
                    alt={product.name}
                    className="object-cover rounded-t-md"
                />
            </div>

            <CardContent>
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
                <div className="mt-2 font-bold">
                    {product.price} {product.currency}
                </div>

                <div className="flex flex-wrap gap-1 mt-2">
                    {product.tags.map(tag => (
                        <Badge key={tag.uuid}>{tag.name}</Badge>
                    ))}
                </div>
            </CardContent>

            <CardFooter className="flex justify-end">
                <Button size="sm">Подробнее</Button>
            </CardFooter>
        </Card>
    );
};
