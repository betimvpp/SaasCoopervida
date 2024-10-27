import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Employee } from "@/contexts/rhContext";

export interface HumanResourceDetailsProps {
    humanResource: Employee;
    open: boolean;
}

export const HumanResourceDetails = ({ humanResource }: HumanResourceDetailsProps) => {
    return (
        <DialogContent className="min-w-[1000px]">
            <DialogHeader>
                <DialogTitle>Detalhes do RH: {humanResource.nome}!</DialogTitle>
                <DialogDescription>Status: {humanResource.status}</DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
                <Table >
                    <TableBody className="grid grid-cols-3">
                        <TableRow>
                            <TableCell className="font-semibold">Nome:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Input id="nome" type="text" placeholder={humanResource.nome} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">E-mail:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Input id="email" type="email" placeholder={humanResource.email} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">CPF:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Input id="cpf" type="text" placeholder={humanResource.cpf} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">Telefone:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Input id="telefone" type="text" placeholder={humanResource.telefone} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">Cidade:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Input id="cidade" type="text" placeholder={humanResource.cidade} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">Rua:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Input id="rua" type="text" placeholder={humanResource.rua} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">Banco:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Input id="banco" type="text" placeholder={humanResource.banco} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">Agencia:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Input id="agencia" type="text" placeholder={humanResource.agencia} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">Conta:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Input id="conta" type="text" placeholder={humanResource.conta} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">Cargo:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <p>{humanResource.role.toLocaleUpperCase()}</p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">Status:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Select
                                    defaultValue={humanResource.status}
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
                    </TableBody>
                </Table>
            </div>
            <DialogFooter className="mt-2">
                <Button type="submit">Editar</Button>
            </DialogFooter>
        </DialogContent>
    )
}
