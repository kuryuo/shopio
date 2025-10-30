import { create } from 'zustand';
import { authApi } from '../api/authApi.ts';
import type {TokenPair, LoginPayload, RegisterPayload, RefreshPayload} from '../types/auth.ts';

interface AuthState {
    tokens: TokenPair | null;
    loading: boolean;
    error: string | null;

    login: (payload: LoginPayload) => Promise<void>;
    register: (payload: RegisterPayload) => Promise<void>;
    refresh: (payload: RefreshPayload) => Promise<void>;
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    tokens: null,
    loading: false,
    error: null,

    login: async (payload) => {
        set({ loading: true, error: null });

        try {
            const response = await authApi.login(payload);
            set({ tokens: response });
        } catch (err: any) {
            set({ error: err.message });
        } finally {
            set({ loading: false });
        }
    },

    register: async (payload) => {
        set({ loading: true, error: null });

        try {
            const response = await authApi.register(payload);
            set({ tokens: response });
        } catch (err: any) {
            set({ error: err.message });
        } finally {
            set({ loading: false });
        }
    },

    refresh: async (payload) => {
        try {
            const newTokens = await authApi.refreshToken(payload);
            set({ tokens: newTokens });
        } catch (err: any) {
            set({ tokens: null, error: err.message });
        }
    },

    logout: async () => {
        set({
            tokens: null,
            error: null,
            loading: false,
        });
    },
}));


