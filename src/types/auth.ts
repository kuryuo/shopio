export interface Token {
    token: string;
}

export interface TokenPair {
    refresh: Token;
    access: Token;
}

export interface AuthResponse {
    refresh: Token;
    access: Token;
}

export interface LoginPayload {
    username: string;
    password: string;
}

export interface RegisterPayload {
    email: string;
    username: string;
    password: string;
}

export interface RefreshPayload {
    token: string;
}
