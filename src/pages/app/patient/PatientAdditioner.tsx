import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useHabilitys } from "@/contexts/habilitiesContext";

export const PatientAdditioner = () => {
    const { habilities, loading } = useHabilitys();

    return (
        <DialogContent className="min-w-[1000px]">
            <DialogHeader>
                <DialogTitle>Adicionar Paciente</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
                <Table >
                    <TableBody className="grid grid-cols-3">
                        <TableRow>
                            <TableCell className="font-semibold">Nome:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Input id="nome" type="text" placeholder="Ex: Pedro Silva" />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">E-mail:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Input id="email" type="email" placeholder="Ex: exemplo@email.com" />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">CPF:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Input id="cpf" type="text" placeholder="Ex: 00011122233" />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">Telefone:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Input id="telefone" type="text" placeholder="Ex: 74988776655" />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">Cidade:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Input id="cidade" type="text" placeholder="Ex: Alagoinhas" />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">Rua:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Input id="rua" type="text" placeholder="Ex: Rua Silva Lopes" />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">Pagamento/Dia:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Input id="pagamento_dia" type="number" placeholder="Ex: 26/10/2024" />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">Pagamento/Profissional:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Input id="pagamento_a_profissional" type="number" placeholder="Ex: 26/10/2024" />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">Plano de Saúde:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Input id="plano" type="text" placeholder="Ex: Planserve" />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">Status:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Select
                                    defaultValue="Ativo"
                                >
                                    <SelectTrigger >
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem className="cursor-pointer" value="Ativo">Ativo</SelectItem>
                                        <SelectItem className="cursor-pointer" value="Inativo">Inativo</SelectItem>
                                    </SelectContent>
                                </Select>
                            </TableCell>
                        </TableRow>
                        <TableRow className="col-span-3 flex">
                            <TableCell className="font-semibold">Especialidades:</TableCell>
                            <TableCell className="w-full grid grid-cols-3 gap-2">
                                {loading ? (
                                    <p>Carregando especialidades...</p>
                                ) : (
                                    habilities.map((hability) => (
                                        <div key={hability.especialidade_id} className="flex items-center space-x-2">
                                            <Checkbox id={`especialidade-${hability.especialidade_id}`} />
                                            <label
                                                htmlFor={`especialidade-${hability.especialidade_id}`}
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                {hability.nome}
                                            </label>
                                        </div>
                                    ))
                                )}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
            <DialogFooter className="mt-2">
                <Button type="submit">Editar</Button>
            </DialogFooter>
        </DialogContent>
    )
}
