import AuthPage from "@/pages/AuthPage.tsx";
import { useAuthStore } from "@/store/authStore.ts";
import type {LoginPayload, RegisterPayload} from "@/types/auth.ts";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";


function AuthContainer() {
    const { login, register, tokens, loading, error } = useAuthStore();
    const navigate = useNavigate();

    const handleLogin = (payload: LoginPayload) => login(payload);
    const handleRegister = (payload: RegisterPayload) => register(payload);

    useEffect(() => {
        if (tokens) {
            navigate("/products");
        }
    }, [tokens, navigate]);

    return (
        <AuthPage
            onLogin={handleLogin}
            onRegister={handleRegister}
            loading={loading}
            error={error}
        />
    );
}

export default AuthContainer;
