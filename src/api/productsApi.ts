import { baseFetch } from './baseApi';
import type {ProductPayload, ProductResponse} from "@/types/products.ts";

export const productsApi = {
    getAllProducts: async (): Promise<ProductResponse[]> => {
        return baseFetch<ProductResponse[]>(`/products`);
    },
    getProductById: async (uuid: string): Promise<ProductResponse> => {
        return baseFetch<ProductResponse>(`/products/${uuid}`)
    },
    createProduct: async (payload: ProductPayload): Promise<ProductResponse> => {
        return baseFetch<ProductResponse>('/products', {
            method: 'POST',
            data: { payload },
        })
    },
    updateProduct: async (uuid:string, payload: ProductPayload): Promise<ProductResponse> => {
        return baseFetch<ProductResponse>(`/products/${uuid}`,{
            method: 'POST',
            data: { payload },
        })
    },
    deleteProduct: async (uuid: string): Promise<void> => {
        return baseFetch<void>(`/products/${uuid}`, {})
    },
    getProductsByTag: async (tags: string[]): Promise<ProductResponse[]> => {
        return baseFetch<ProductResponse[]>('/products/tags', {
            method: 'GET',
            data: tags,
        });
    }
}