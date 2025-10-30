import ProductsPage from "@/pages/ProductsPage.tsx";
import {useProductsStore} from "@/store/productsStore.ts";
import {useEffect} from "react";

function ProductsContainer() {
    const { products, getAllProducts, loading, error } = useProductsStore();

    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <ProductsPage
            products={products}
            loading={loading}
            error={error}
        />
    );
}

export default ProductsContainer;