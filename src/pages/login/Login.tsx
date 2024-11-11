import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "@/contexts/authContext";
import { useNavigate } from "react-router-dom";
import supabase from "@/lib/supabase";

const signInForm = z.object({
  email: z.string().email(),
  password: z.string(),
});

type SignInForm = z.infer<typeof signInForm>;

export function Login() {
  const { register, handleSubmit } = useForm<SignInForm>();
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleLogin(dataResp: SignInForm) {
    const loginSuccess = await login(dataResp);

    if (loginSuccess) {
      // Após o login bem-sucedido, obtemos a session do Supabase
      const { data, error } = await supabase.auth.getSession();
      const session = data?.session;

      if (session) {
        // Obtenha a role do usuário após o login
        const { data: user, error: userError } = await supabase
          .from('funcionario') // Substitua 'funcionario' pela tabela correta, se necessário
          .select('role')
          .eq('funcionario_id', session.user.id)
          .single();

        if (userError) {
          console.error("Erro ao obter a role do usuário", userError);
          return;
        }

        const userRole = user?.role;

        // Redireciona com base na role do usuário
        switch (userRole) {
          case "admin":
            navigate("/dashboard"); // Admin tem acesso total
            break;
          case "rh":
            navigate("/recursoshumanos"); // RH tem acesso a recursos humanos e escalas
            break;
          default:
            navigate("/escala"); // Qualquer outra role é redirecionada para a escala
            break;
        }
      }
    }

  }


  return (
    <Card className="mx-auto">
      <Helmet title="Login" />
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>Insira seu email e senha para logar em sua conta!</CardDescription>
      </CardHeader>
      <Separator className="w-4/5 m-auto mb-2" />
      <CardContent>
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="email@exemplo.com" required {...register("email")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required {...register("password")} />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
