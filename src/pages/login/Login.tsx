/**
 * v0 by Vercel.
 * @see https://v0.dev/t/1ADs2FRNaQg
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ModeToggle } from "@/components/mode-toggle"


export function Login() {
  return (
    <div className="flex">
      <div className='h-screen w-9/12 flex flex-col justify-between border-r border-foreground/5 bg-banner bg-no-repeat bg-cover bg-top object-cover p-4 text-muted-foreground'>
        <div className='flex items-center gap-3 text-lg text-foreground'>
        </div>
        <footer className='text-sm text-white font-semibold'>
          All rights reserved to CodeHere® - {new Date().getFullYear()}
        </footer>
      </div>
      <div className="flex items-center justify-center h-screen m-auto">
        <span className=" absolute top-8 right-8">
          <ModeToggle />
        </span>
        <Card className="mx-auto max-w-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
            <CardDescription>Insira seu email e senha para logar em sua conta!</CardDescription>
          </CardHeader>
          <Separator className="w-4/5 m-auto mb-2" />
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="email@exemplo.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}