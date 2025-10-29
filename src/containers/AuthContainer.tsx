import AuthPage from "@/pages/AuthPage.tsx";
import { useAuthStore } from "@/store/authStore.ts";
import type {LoginPayload, RegisterPayload} from "@/types/auth.ts";

function AuthContainer() {
    const { login, register, loading, error } = useAuthStore();

    const handleLogin = (payload: LoginPayload) => login(payload);
    const handleRegister = (payload: RegisterPayload) => register(payload);

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
