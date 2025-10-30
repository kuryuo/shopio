import {create} from "zustand";
import {productsApi} from "@/api/productsApi.ts";
import type {ProductPayload, ProductResponse} from "@/types/products.ts";

interface ProductState {
    products: ProductResponse[];
    filteredProducts: ProductResponse[];
    selectedProduct: ProductResponse | null;
    loading: boolean;
    error: string | null;

    getAllProducts: () => Promise<void>;
    getProductById: (uuid: string) => Promise<void>;
    createProduct: (payload: ProductPayload) => Promise<void>;
    updateProduct: (uuid: string, payload: ProductPayload) => Promise<void>;
    deleteProduct: (uuid: string) => Promise<void>;
    getProductsByTag: (tags: string[]) => Promise<void>;
}

export const useProductsStore = create<ProductState>((set,get) => ({
    products: [],
    filteredProducts: [],
    selectedProduct: null,
    loading: false,
    error: null,

    getAllProducts: async () => {
        set({ loading: true, error: null });

        try{
            const response = await productsApi.getAllProducts();
            set({ products: response });
        } catch (err: any) {
            set({ error: err.message });
        } finally {
            set({ loading: false });
        }
    },

    getProductById: async(uuid: string) => {
        set({ loading: true, error: null });

        try{
            const response = await productsApi.getProductById(uuid);
            set({ selectedProduct: response });
        } catch (err: any) {
            set({ error: err.message });
        } finally {
            set({ loading: false });
        }
    },

    createProduct: async (payload: ProductPayload) => {
        set({ loading: true, error: null });

        try{
            const response = await productsApi.createProduct(payload)
            set({ products: [...get().products, response]});
        } catch (err: any) {
            set({ error: err.message });
        } finally {
            set({ loading: false });
        }
    },

    updateProduct: async (uuid: string, payload: ProductPayload) => {
        set({ loading: true, error: null });

        try {
            const response = await productsApi.updateProduct(uuid, payload)
            const updatedProducts = get().products.map((p) =>
                p.uuid === uuid ? response : p
            );

            set({
                products: updatedProducts,
                selectedProduct: response,
            });
        } catch (err: any) {
            set({ error: err.message });
        } finally {
            set({ loading: false });
        }
    },

    deleteProduct: async (uuid: string) => {
        set({ loading: true, error: null });

        try {
            await productsApi.deleteProduct(uuid);

            set({
                products: get().products.filter((p) => p.uuid !== uuid),
                selectedProduct: get().selectedProduct?.uuid === uuid ? null : get().selectedProduct,
            });
        } catch (err: any) {
            set({ error: err.message });
        } finally {
            set({ loading: false });
        }
    },

    getProductsByTag: async (tags: string[]) => {
        set({ loading: true, error: null });

        try{
            const response = await productsApi.getProductsByTag(tags);

            set({ filteredProducts: response });
        } catch (err: any) {
            set({ error: err.message });
        } finally {
            set({ loading: false });
        }
    },
}));