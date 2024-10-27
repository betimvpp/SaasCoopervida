import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

export const CollaboratorAdditioner = () => {
    return (
        <DialogContent className="min-w-[1000px]">
            <DialogHeader>
                <DialogTitle>Adicione um colaborador: </DialogTitle>
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
                            <TableCell className="font-semibold">Banco:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Input id="banco" type="text" placeholder="Ex: Banco do Brasil" />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">Agencia:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Input id="agencia" type="text" placeholder="Ex: 1111-1" />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">Conta:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Input id="conta" type="text" placeholder="Ex: 111222333" />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">Cargo:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem className="cursor-pointer" value="colaborador">Colaborador</SelectItem>
                                        <SelectItem className="cursor-pointer" value="fisioterapeuta">Fisioterapeuta</SelectItem>
                                        <SelectItem className="cursor-pointer" value="enfermeiro">Enfermeiro</SelectItem>
                                        <SelectItem className="cursor-pointer" value="tecnico-enfermagem">Técnico de Enfermagem</SelectItem>
                                    </SelectContent>
                                </Select>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">Status:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Select defaultValue="Ativo">
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
                        <TableRow>
                            <TableCell ></TableCell>
                            <TableCell className="flex justify-start -mt-2">

                            </TableCell>
                        </TableRow>
                        <TableRow className="col-span-3 flex">
                            <TableCell className="font-semibold">Habilidades:</TableCell>
                            <TableCell className="w-full justify-start grid grid-cols-3 ">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="ventrilação" />
                                    <label
                                        htmlFor="ventrilação"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Ventrilação Mecânica
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="aspiração" />
                                    <label
                                        htmlFor="aspiração"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Aspiração
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="ventrilação" />
                                    <label
                                        htmlFor="ventrilação"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Fisioterapia
                                    </label>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
            <DialogFooter className="mt-2">
                <Button type="submit">Adicionar</Button>
            </DialogFooter>
        </DialogContent>
    )
}
