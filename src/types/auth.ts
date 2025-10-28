export interface User {
    id: number;
    username: string;
    email: string;
}

export interface TokenPair {
    access: string;
    refresh: string;
}

export interface AuthResponse {
    user: User;
    tokens: TokenPair;
}

export interface LoginPayload {
    username: string;
    password: string;
}

export interface RegisterPayload {
    username: string;
    password: string;
    email: string;
}
