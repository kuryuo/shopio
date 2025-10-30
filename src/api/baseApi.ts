import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
import { useAuthStore } from '../store/authStore';

export const api = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

export async function baseFetch<T>(
    endpoint: string,
    options: AxiosRequestConfig = {}
): Promise<T> {
    try {
        const response = await api.request<T>({
            url: endpoint,
            ...options,
            method: options.method || 'GET',
        });
        return response.data;
    } catch (err: any) {
        const msg = err.response?.data?.message || err.message || 'HTTP Error';
        throw new Error(msg);
    }
}

api.interceptors.request.use(config => {
    const tokens = useAuthStore.getState().tokens;
    if (tokens?.access?.token) {
        config.headers['Authorization'] = `Bearer ${tokens.access.token}`;
    }
    return config;
});

api.interceptors.response.use(
    response => response,
    async error => {
        if (error.response?.status === 401) {
            const store = useAuthStore.getState();
            const refreshToken = store.tokens?.refresh;

            if (!refreshToken) {
                store.logout(); // нет токена — разлогиниваем
                return Promise.reject(error);
            }

            try {
                await store.refresh(refreshToken);
                const newTokens = store.tokens;
                if (newTokens?.access) {
                    error.config.headers['Authorization'] = `Bearer ${newTokens.access}`;
                    return api.request(error.config);
                }
            } catch {
                store.logout();
            }
        }
        return Promise.reject(error);
    }
);
