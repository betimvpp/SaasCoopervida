import { useCallback, useEffect, useState } from "react";
import { Pagination } from "@/components/pagination";
import {
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    Table,
    TableCell,
} from "@/components/ui/table";
import { Patient } from "@/contexts/patientContext";
import { Scale } from "@/contexts/scaleContext";
import supabase from "@/lib/supabase";
import { PatientTableSkeleton } from "./PatientTableSkeleton";

export const PatientSchales = ({ patient, isAdmin, isLoading, }: { patient: Patient; isAdmin: string; isLoading: boolean; }) => {
    const [scales, setPatientScalesData] = useState<Scale[]>([]);
    const [loading, setLoading] = useState(false);
    const [totalCount, setTotalScalesCount] = useState(0);
    const [pageIndex, setPageIndex] = useState(0);

    const fetchPatientScales = useCallback(async (paciente_id: string, pageIndex: number = 0) => {
        try {
            setLoading(true);
            const perPage = 10;
            const offset = pageIndex * perPage;

            const { count: totalScalesCount, error: totalError } = await supabase
                .from("escala")
                .select("*", { count: "exact", head: true })
                .eq("paciente_id", paciente_id);

            if (totalError) {
                console.error("Erro ao buscar contagem de escalas:", totalError);
                return;
            }

            const { data: allScales, error: scalesError } = await supabase
                .from("escala")
                .select(`escala_id, paciente_id, funcionario_id, data, tipo_servico, valor_recebido, valor_pago, pagamentoAR_AV`)
                .eq("paciente_id", paciente_id)
                .order("data", { ascending: false })
                .range(offset, offset + perPage - 1);

            if (scalesError) {
                console.error("Erro ao buscar escalas:", scalesError);
                setPatientScalesData([]);
                return;
            }

            const collaboratorPromises = allScales.map(async (scale): Promise<Scale | null> => {
                const { data: collaboratorData, error: collaboratorError } = await supabase
                    .from("funcionario")
                    .select("nome, cpf, telefone")
                    .eq("funcionario_id", scale.funcionario_id)
                    .single();

                if (collaboratorError) {
                    console.error("Erro ao buscar colaborador:", collaboratorError);
                    return null;
                }

                const formattedDate = scale.data
                    ? new Date(scale.data).toLocaleDateString("pt-BR")
                    : undefined;

                return {
                    ...scale,
                    nomeFuncionario: collaboratorData?.nome,
                    data: formattedDate!,
                };
            });

            const scalesWithCollaborators = await Promise.all(collaboratorPromises);
            const validScales = scalesWithCollaborators.filter((scale): scale is Scale => scale !== null);

            setPatientScalesData(validScales);
            setTotalScalesCount(totalScalesCount || 0);
        } catch (error) {
            console.error("Erro ao buscar escalas do paciente:", error);
            setPatientScalesData([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (patient?.paciente_id) {
            fetchPatientScales(patient.paciente_id, pageIndex);
        }
    }, [patient, pageIndex]);

    const handlePageChange = (newPageIndex: number) => {
        setPageIndex(newPageIndex);
    };

    const getServiceTime = (tipoServico: string, defaultHorario: string) => {
        switch (tipoServico) {
            case 'SD':
                return '7:00 às 19:00';
            case 'SN':
                return '19:00 às 7:00';
            case 'PT':
                return '7:00 às 7:00';
            case 'M':
                return '7:00 às 13:00';
            case 'T':
                return '13:00 às 19:00';
            default:
                return defaultHorario;
        }
    };

    return (
        <>
            <DialogHeader>
                <DialogTitle>Escalas do Paciente: {patient.nome}</DialogTitle>
                <DialogDescription>Status: {patient.status}</DialogDescription>
            </DialogHeader>
            <div className="w-full h-[580px] shadow-lg border rounded-md my-4 ">
                <Table>
                    <TableHeader className="text-center">
                        <TableRow className="text-center">
                            <TableHead className="text-center">Colaborador</TableHead>
                            <TableHead className="text-center">Data</TableHead>
                            {!isLoading && isAdmin === "admin" && <TableHead className="text-center">Valor Recebido</TableHead>}
                            <TableHead className="text-center">Valor Pago</TableHead>
                            <TableHead className="text-center">Pagamento</TableHead>
                            <TableHead className="text-center">Tipo/Serviço</TableHead>
                            <TableHead className="text-center">Horário</TableHead>
                        </TableRow>
                    </TableHeader>
                    {!loading &&
                        <TableBody className="text-center">
                            {scales && scales.map((scale: Scale) => (
                                <TableRow key={scale.escala_id}>
                                    <TableCell>{scale.nomeFuncionario}</TableCell>
                                    <TableCell>{scale.data}</TableCell>
                                    {!isLoading && isAdmin === "admin" && <TableCell>{scale.valor_recebido}</TableCell>}
                                    <TableCell>{scale.valor_pago}</TableCell>
                                    <TableCell>{scale.pagamentoAR_AV ? scale.pagamentoAR_AV : "N/A"}</TableCell>
                                    <TableCell>{scale.tipo_servico}</TableCell>
                                    <TableCell>
                                        {getServiceTime(scale?.tipo_servico, scale?.horario_gerenciamento!)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    }
                    {loading === true && scales.length <= 0 && <PatientTableSkeleton />}
                </Table>
                {loading && <div className="w-full h-full m-auto text-center text-lg font-semibold text-muted-foreground flex items-center justify-center">Carregando Escalas</div>}
                {!loading && scales.length <= 0 && <div className="w-full h-full m-auto text-center text-lg font-semibold text-muted-foreground flex items-center justify-center">Nenhuma escala encontrado!</div>}

            </div>
            <Pagination
                pageIndex={pageIndex}
                totalCount={totalCount}
                perPage={10}
                onPageChange={handlePageChange}
            />
        </>
    );
};
