import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useHabilities } from "@/contexts/habilitiesContext";
import { Patient, usePatients } from "@/contexts/patientContext";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const PatientAdditioner = () => {
    const { habilities, loading } = useHabilities();
    const { register, handleSubmit, setValue } = useForm<Patient>({});
    const { addPatient } = usePatients();

    const handleAdd = async (dataResp: Patient) => {
        try {
            await addPatient(dataResp);
            toast.success("Colaborador adicionado com sucesso!");
        } catch (error) {
            console.error("Erro ao adicionar colaborador:", error);
            toast.error("Erro ao adicionar colaborador.");
        }
        ;
    };

    return (
        <DialogContent className="min-w-[1000px]">
            <DialogHeader>
                <DialogTitle>Adicionar Paciente</DialogTitle>
            </DialogHeader>
            <form className="space-y-6" onSubmit={handleSubmit(handleAdd)}>
                <Table >
                    <TableBody className="grid grid-cols-3">
                        <TableRow>
                            <TableCell className="font-semibold">Nome:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Input id="nome" type="text" placeholder="Ex: Pedro Silva" {...register("nome")} required />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">E-mail:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Input id="email" type="email" placeholder="Ex: exemplo@email.com" {...register("email")} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">CPF:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Input id="cpf" type="text" placeholder="Ex: 00011122233" {...register("cpf")} required />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">Telefone:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Input id="telefone" type="text" placeholder="Ex: 74988776655" {...register("telefone")} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">Cidade:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Input id="cidade" type="text" placeholder="Ex: Alagoinhas" {...register("cidade")} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">Rua:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Input id="rua" type="text" placeholder="Ex: Rua Silva Lopes" {...register("rua")} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">Pagamento/Dia:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Input
                                    id="pagamento_dia"
                                    type="number"
                                    placeholder="Ex: 250"
                                    onChange={(e) => setValue("pagamento_dia", parseInt(e.target.value) || 0)}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">Pagamento/Profissional:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Input
                                    id="pagamento_a_profissional"
                                    type="number"
                                    placeholder="Ex: 200"
                                    onChange={(e) => setValue("pagamento_a_profissional", parseInt(e.target.value) || 0)}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">Plano de Saúde:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Input id="plano" type="text" placeholder="Ex: Planserve" {...register("plano_saude")} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">Status:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Select
                                    {...register("status")}
                                    onValueChange={(value) => setValue("status", value)}
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
                                            <Checkbox
                                                id={`especialidade-${hability.especialidade_id}`}
                                            />

                                            <label
                                                htmlFor={`especialidade-${hability.especialidade_id}`}
                                                about="" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
                <DialogFooter className="mt-2">
                    <Button type="submit">Adicionar</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    )
}
