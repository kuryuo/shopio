import { baseFetch } from './baseApi';
import type { AuthResponse, LoginPayload, RegisterPayload, TokenPair } from '../types/auth';

export const authApi = {
    login: async (payload: LoginPayload): Promise<AuthResponse> => {
        return baseFetch<AuthResponse>('auth/login', {
            method: 'POST',
            data: payload,
        });
    },

    register: async (payload: RegisterPayload): Promise<AuthResponse> => {
        return baseFetch<AuthResponse>('auth/register', {
            method: 'POST',
            data: payload,
        });
    },

    refreshToken: async (refresh: string): Promise<TokenPair> => {
        return baseFetch<TokenPair>('auth/obtaintokenpair', {
            method: 'POST',
            data: { refresh },
        });
    },
};
