import { Button } from "@/components/ui/button";
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import { useHabilities } from "@/contexts/habilitiesContext";
import { Patient, usePatients } from "@/contexts/patientContext";
import supabase from "@/lib/supabase";
import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { toast } from "sonner";


export const PatientDetails = ({ patient, isAdmin, isLoading }: { patient: Patient; isAdmin: string; isLoading: boolean; }) => {
    const { habilities, loading, fetchPatientHabilities } = useHabilities();
    const { register, handleSubmit, setValue } = useForm<Patient>({
        defaultValues: patient,
    });
    const { updatePatient } = usePatients()
    const [selectedHabilities, setSelectedHabilities] = useState<number[]>([]);
    const [cities, setCities] = useState<string[]>([]);

    const fetchCities = async () => {
        try {
            const { data, error } = await supabase
                .from("cidade_de_atuacao")
                .select("cidade");

            if (error) throw error;
            setCities(data.map((city) => city.cidade)); // Atualize o estado com os nomes das cidades.
        } catch (error) {
            console.error("Erro ao buscar cidades:", error);
            toast.error("Não foi possível carregar as cidades.");
        }
    };

    const handleUpdate = async (dataResp: Patient) => {
        if (!dataResp.cpf) {
            toast.error("Cpf é obrigatório");
            return;
        }

        if (!patient.paciente_id) {
            console.error("ID do paciente está indefinido");
            toast.error("Erro: ID do paciente indefinido.");
            return;
        }

        dataResp.pagamento_dia = parseFloat(dataResp.pagamento_dia?.toFixed(2) || "0");
        dataResp.pagamento_a_profissional = parseFloat(dataResp.pagamento_a_profissional?.toFixed(2) || "0");

        try {
            await updatePatient(dataResp, patient.paciente_id, selectedHabilities); // Adicionando as habilidades selecionadas
            console.log("Dados enviados:", dataResp);
            toast.success("Paciente atualizado com sucesso!");
        } catch (error) {
            console.error("Erro ao atualizar paciente:", error);
            toast.error("Erro ao atualizar paciente.");
        }
    };

    const handleCheckboxChange = (especialidadeId: number) => {
        setSelectedHabilities((prevSelected) =>
            prevSelected.includes(especialidadeId)
                ? prevSelected.filter((id) => id !== especialidadeId)
                : [...prevSelected, especialidadeId]
        );
    };

    useEffect(() => {
        if (patient.paciente_id) {
            const loadPatientHabilities = async () => {
                const patientHabilities = await fetchPatientHabilities(patient.paciente_id);
                setSelectedHabilities(patientHabilities);
            };

            loadPatientHabilities();
        }
        fetchCities();
    }, [patient.paciente_id, fetchPatientHabilities]);


    return (
        < >
            <DialogHeader>
                <DialogTitle>Detalhes do Paciente: {patient.nome}</DialogTitle>
                <DialogDescription>Status: {patient.status}</DialogDescription>
            </DialogHeader>
            <form className="space-y-6" onSubmit={handleSubmit(handleUpdate)}>
                <Table >
                    <TableBody className="grid grid-cols-3">
                        <TableRow>
                            <TableCell className="font-semibold">Nome:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Input id="nome" type="text" {...register("nome")} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">Contratante:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Input id="plano" type="text" {...register("plano_saude")} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">Nivel:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Input id="nivel" type="text" {...register("cpf")} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">E-mail:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Input id="email" type="email" {...register("email")} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">Telefone:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Input id="telefone" type="text" {...register("telefone")} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">Cidade:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Select
                                    onValueChange={(value) => setValue("cidade", value)}
                                    defaultValue={patient.cidade}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione uma cidade" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {cities.map((city) => (
                                            <SelectItem key={city} value={city}>
                                                {city}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">Bairro:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Input id="bairro" type="text" {...register("bairro")} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold">Rua:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Input id="rua" type="text" {...register("rua")} />
                            </TableCell>
                        </TableRow>
                        {!isLoading && isAdmin === 'admin' ? (
                            <TableRow>
                                <TableCell className="font-semibold">Pagamento/Dia:</TableCell>
                                <TableCell className="flex justify-start -mt-2">
                                    <Input
                                        id="pagamento_dia"
                                        defaultValue={patient.pagamento_dia}
                                        placeholder="Ex: 22.5"
                                        onChange={(e) => setValue("pagamento_dia", parseFloat(e.target.value) || 0)}
                                    />
                                </TableCell>
                            </TableRow>
                        ) : (
                            <></>
                        )}
                        <TableRow>
                            <TableCell className="font-semibold">Pagamento/Profissional:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Input
                                    id="pagamento_a_profissional"
                                    defaultValue={patient.pagamento_a_profissional}
                                    placeholder="Ex: 18.7"
                                    onChange={(e) => setValue("pagamento_a_profissional", parseFloat(e.target.value) || 0)}
                                />
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className="font-semibold">Status:</TableCell>
                            <TableCell className="flex justify-start -mt-2">
                                <Select
                                    {...register("status")}
                                    defaultValue={patient?.status}
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
                                            <input
                                                type="checkbox"
                                                checked={selectedHabilities.includes(hability.especialidade_id)}
                                                onChange={() => handleCheckboxChange(hability.especialidade_id)}
                                                className="cursor-pointer"
                                            />
                                            <label>{hability.nome}</label>
                                        </div>
                                    ))
                                )}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                <DialogFooter>
                    <Button type="submit">Editar</Button>
                </DialogFooter>
            </form>
        </>
    )
}
