import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Collaborator } from "@/contexts/collaboratorContext";

export interface CollaboratorDetailsProps {
    collaborator: Collaborator;
    open: boolean;
}

export const CollaboratorDetails = ({ collaborator }: CollaboratorDetailsProps) => {
    return (
        <DialogContent className="min-w-[1000px]">
            <DialogHeader>
                <DialogTitle>Detalhes do colaborador: {collaborator.nome}!</DialogTitle>
                <DialogDescription>Status: {collaborator.status}</DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
                <Table >
                    <TableBody className="grid grid-cols-3">
                        <TableRow>
                            <TableCell className="font-semibold">Nome:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Input id="nome" type="text" placeholder={collaborator.nome}/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">E-mail:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Input id="email" type="email" placeholder={collaborator.email}/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">CPF:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Input id="cpf" type="text" placeholder={collaborator.cpf}/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">Telefone:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Input id="telefone" type="text" placeholder={collaborator.telefone}/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">Cidade:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Input id="cidade" type="text" placeholder={collaborator.cidade}/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">Rua:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Input id="rua" type="text" placeholder={collaborator.rua}/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">Banco:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Input id="banco" type="text" placeholder={collaborator.banco}/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">Agencia:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Input id="agencia" type="text" placeholder={collaborator.agencia}/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">Conta:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Input id="conta" type="text" placeholder={collaborator.conta}/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">Cargo:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Select
                                    defaultValue={collaborator.role}
                                // name={name}
                                // onValueChange={onChange}
                                // value={value}
                                // disabled={disabled}
                                >
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
                                <Select
                                    defaultValue={collaborator.status}
                                // name={name}
                                // onValueChange={onChange}
                                // value={value}
                                // disabled={disabled}
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
                <Button type="submit">Editar</Button>
            </DialogFooter>
        </DialogContent>
    )
}
