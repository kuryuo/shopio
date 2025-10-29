import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader } from "@/components/common/Loader";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import type {LoginPayload} from "@/types/auth.ts";

interface LoginFormProps {
    onSubmit: (payload: LoginPayload) => void;
    loading: boolean;
    error: string | null;
}

export function LoginForm({ onSubmit, loading, error }: LoginFormProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ username, password });
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
                <Label htmlFor="login-username">Имя пользователя</Label>
                <Input
                    id="login-username"
                    type="text"
                    placeholder="yourname"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div>
                <Label htmlFor="login-password">Пароль</Label>
                <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Checkbox
                        id="remember"
                        checked={remember}
                        onCheckedChange={(checked) => setRemember(!!checked)}
                    />
                    <Label htmlFor="remember">Запомнить меня</Label>
                </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Loader text="Вход..." /> : "Войти"}
            </Button>

            <ErrorMessage message={error} />
        </form>
    );
}
