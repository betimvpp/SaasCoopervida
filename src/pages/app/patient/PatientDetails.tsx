import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Patient } from "@/contexts/patientContext";

export interface PatientDetailsProps {
    patient: Patient;
    open: boolean;
}

export const PatientDetails = ({ patient }: PatientDetailsProps) => {
    return (
        <DialogContent className="min-w-[1000px]">
            <DialogHeader>
                <DialogTitle>Detalhes do colaborador: {patient.nome}!</DialogTitle>
                <DialogDescription>Status: {patient.status}</DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
                <Table >
                    <TableBody className="grid grid-cols-3">
                        <TableRow>
                            <TableCell className="font-semibold">Nome:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Input id="nome" type="text" placeholder={patient.nome}/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">E-mail:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Input id="email" type="email" placeholder={patient.email}/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">CPF:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Input id="cpf" type="text" placeholder={patient.cpf}/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">Telefone:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Input id="telefone" type="text" placeholder={patient.telefone}/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">Cidade:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Input id="cidade" type="text" placeholder={patient.cidade}/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">Rua:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Input id="rua" type="text" placeholder={patient.rua}/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">Data Pagamento:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Input id="pagamento_dia" type="date" placeholder={patient.pagamento_dia.toLocaleString()}/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">Plano de Saúde:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Input id="plano" type="text" placeholder={patient.plano_saude}/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">Status:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Select
                                    defaultValue={patient.status}
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
