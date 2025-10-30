import { ProductCard } from "@/components/common/ui/ProductCard";
import type {ProductResponse} from "@/types/products.ts";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import { Loader } from "@/components/common/Loader";

interface ProductsPageProps {
    products: ProductResponse[];
    loading: boolean;
    error: string | null;
}

export default function ProductsPage({products, loading, error}: ProductsPageProps) {
    if (loading) {
        return (
            <div className="flex justify-center mt-10">
                <Loader text="Загрузка товаров..." />
            </div>
        );
    }

    if (error) {
        return <ErrorMessage message={error} />;
    }

    if (products.length === 0) {
        return <div className="text-center mt-10 text-slate-500">Нет товаров</div>;
    }

    return (
        <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product: ProductResponse) => (
                    <ProductCard key={product.uuid} product={product} />
                ))}
            </div>
        </div>
    );
};
