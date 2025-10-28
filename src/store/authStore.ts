import { create } from 'zustand';
import { authApi } from '../api/authApi.ts';
import type { User, TokenPair, LoginPayload, RegisterPayload } from '../types/auth.ts';

interface AuthState {
    user: User | null;
    tokens: TokenPair | null;
    loading: boolean;
    error: string | null;

    login: (payload: LoginPayload) => Promise<void>;
    register: (payload: RegisterPayload) => Promise<void>;
    refresh: (refresh: string) => Promise<void>;
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    tokens: null,
    loading: false,
    error: null,

    login: async (payload) => {
        set({ loading: true, error: null });

        try {
            const response = await authApi.login(payload);
            set({ user: response.user, tokens: response.tokens });
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
            set({user: response.user, tokens: response.tokens});
        }catch(err: any) {
            set({error: err.message});
        } finally {
            set({ loading: false });
        }
    },

    refresh: async (payload) => {
        const tokens = get().tokens;
        if (!tokens?.refresh) return;

        try {
            const newTokens = await authApi.refreshToken(payload);
            set({tokens: newTokens});
        } catch(err: any) {
            set({ tokens: null, user: null, error: err.message });
        }
    },

    logout: async () => {
        set({
            user: null,
            tokens: null,
            error: null,
            loading: false,
        });
    }

}));


