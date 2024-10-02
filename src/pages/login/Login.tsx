import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Helmet } from "react-helmet-async"
import { useForm } from "react-hook-form"
import { z } from "zod";
import { toast } from "sonner"
import supabase from "@/lib/supabase"

const signInForm = z.object({
  email: z.string().email(),
  password: z.string()
});

type SignInForm = z.infer<typeof signInForm>;

export function Login() {
  const { register, handleSubmit } = useForm<SignInForm>();

  async function handleLogin(dataResp: SignInForm) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: dataResp.email,
        password: dataResp.password,
      }) 

      if (error) throw error
      console.log(data)
      toast.success("Sucesso, você irá ser redirecionado para a página principal!")
      
    } catch (error) {
      console.error(error)
      toast.error("Usuario ou Senha invalido!")
    }
  }

  return (
    <Card className="mx-auto max-w-sm">
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
  )
}