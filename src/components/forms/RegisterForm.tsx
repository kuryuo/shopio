import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/common/Loader";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import type {RegisterPayload} from "@/types/auth.ts";

interface RegisterFormProps {
    onSubmit: (payload: RegisterPayload) => void;
    loading: boolean;
    error: string | null;
}

export function RegisterForm({ onSubmit, loading, error }: RegisterFormProps) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ username, email, password });
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
                <Label htmlFor="reg-username">Имя пользователя</Label>
                <Input
                    id="reg-username"
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div>
                <Label htmlFor="reg-email">Email</Label>
                <Input
                    id="reg-email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div>
                <Label htmlFor="reg-password">Пароль</Label>
                <Input
                    id="reg-password"
                    type="password"
                    placeholder="Минимум 8 символов"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div>
                <Label htmlFor="reg-password-confirm">Повторите пароль</Label>
                <Input
                    id="reg-password-confirm"
                    type="password"
                    placeholder="Повторите пароль"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Loader text="Создание..." /> : "Создать аккаунт"}
            </Button>

            <ErrorMessage message={error} />
        </form>
    );
}
