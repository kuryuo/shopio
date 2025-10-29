import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import type {LoginPayload, RegisterPayload} from "@/types/auth.ts";
import { LoginForm } from "@/components/forms/LoginForm";
import { RegisterForm } from "@/components/forms/RegisterForm";

interface AuthPageProps {
    onLogin: (payload: LoginPayload) => void;
    onRegister: (payload: RegisterPayload) => void;
    loading: boolean;
    error: string | null;
}

export default function AuthPage({
                                     onLogin,
                                     onRegister,
                                     loading,
                                     error,
                                 }: AuthPageProps) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader>
                    <CardTitle>Войти или зарегистрироваться</CardTitle>
                    <CardDescription>
                        Используйте email и пароль или создайте новый аккаунт
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <Tabs defaultValue="login" className="w-full">
                        <TabsList className="mb-6 w-full">
                            <TabsTrigger className="w-1/2" value="login">
                                Вход
                            </TabsTrigger>
                            <TabsTrigger className="w-1/2" value="register">
                                Регистрация
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="login">
                            <LoginForm onSubmit={onLogin} loading={loading} error={error} />
                        </TabsContent>

                        <TabsContent value="register">
                            <RegisterForm onSubmit={onRegister} loading={loading} error={error} />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
