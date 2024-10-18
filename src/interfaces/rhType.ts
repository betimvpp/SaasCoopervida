import { z } from "zod"

const humanResourceSchema = z.object({
    id: z.string(),
    email: z.string().email(),
    nome_completo: z.string(),
    cpf: z.string(),
    telefone: z.string(),
    rua: z.string(),
    cidade: z.string(),
    banco: z.string(),
    agencia: z.string(),
    conta: z.string(),
    cargo: z.string()
})

export type HumanResourceType = z.infer<typeof humanResourceSchema>