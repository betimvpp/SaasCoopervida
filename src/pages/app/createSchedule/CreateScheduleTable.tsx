import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { patientFiltersSchema, PatientFiltersSchema, usePatients } from '@/contexts/patientContext'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { CollaboratorFiltersSchema, collaboratorFiltersSchema, useCollaborator } from '@/contexts/collaboratorContext'
import { Scale } from '@/contexts/scaleContext'
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { ptBR } from 'date-fns/locale'
import { Button } from '@/components/ui/button'
import { eachDayOfInterval, format } from 'date-fns'

export const CreateScheduleTable = () => {
    const { patients, fetchPatients } = usePatients();
    const { collaborators, fetchCollaborator } = useCollaborator();
    const [completedSchedules, setCompletedSchedules] = useState<Scale[]>([]);
    const [searchValue, setSearchValue] = useState('');
    const [collaboratorSearchValue, setCollaboratorSearchValue] = useState('');
    const [selectedServiceType, setSelectedServiceType] = useState<string>('');
    const [selectedData, setSelectedData] = useState<DateRange>();

    const { register, handleSubmit, setValue, watch, reset } = useForm<Scale>({});

    const { register: registerPatient, setValue: setPatientValue } = useForm<PatientFiltersSchema>({
        resolver: zodResolver(patientFiltersSchema),
        defaultValues: {
            patientName: '',
        },
    });

    const { register: registerCollaborator, setValue: setCollaboratorValue } = useForm<CollaboratorFiltersSchema>({
        resolver: zodResolver(collaboratorFiltersSchema),
        defaultValues: {
            collaboratorName: '',
        },
    });

    const handlePatientSelection = (patientId: string) => {
        const selectedPatientData = patients.find(patient => patient.paciente_id === patientId);
        if (selectedPatientData) {
            setValue('valor_recebido', selectedPatientData.pagamento_dia);
            setValue('valor_pago', selectedPatientData.pagamento_a_profissional);
        }
    };

    const generateRotatedSchedules = () => {
        if (!selectedData || !selectedData.from || !selectedData.to || collaborators.length === 0) return;

        const dateRange = eachDayOfInterval({ start: selectedData.from, end: selectedData.to });
        const newSchedules: Scale[] = [];

        dateRange.forEach((date, index) => {
            const collaborator = collaborators[index % collaborators.length];
            newSchedules.push({
                data: format(date, 'yyyy-MM-dd'),
                paciente_id: watch('paciente_id'),
                funcionario_id: collaborator.funcionario_id,
                valor_recebido: watch('valor_recebido'),
                valor_pago: watch('valor_pago'),
                tipo_servico: watch('tipo_servico'),
                pagamentoAR_AV: watch('pagamentoAR_AV'),
                horario_gerenciamento: selectedServiceType === 'GR' ? watch('horario_gerenciamento') : null,
            });
        });
        
        setCompletedSchedules((prev) => {
            console.log("New Schedules to Add:", newSchedules);
            return [...prev, ...newSchedules];
        });
    };

    const handleComplete = () => {
        generateRotatedSchedules();
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchPatients({ patientName: searchValue });
            fetchCollaborator({ collaboratorName: collaboratorSearchValue });
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchValue, fetchPatients, collaboratorSearchValue, fetchCollaborator]);

    return (
        <form>
            <Table>
                <TableBody className="grid grid-cols-6">
                    {/* Data */}
                    <TableRow className='row-span-10 col-span-2 flex flex-col items-center justify-center text-start'>
                        <TableCell className="font-semibold w-full text-start ">Data do Serviço:</TableCell>
                        <TableCell className="flex justify-start -mt-2">
                            <DayPicker
                                locale={ptBR}
                                mode="range"
                                selected={selectedData}
                                onSelect={setSelectedData}
                            />
                        </TableCell>
                    </TableRow>

                    {/* Nome Do Paciente */}
                    <TableRow className='col-span-2'>
                        <TableCell className="font-semibold">Nome do Paciente:</TableCell>
                        <TableCell className="flex justify-start -mt-2">
                            <Select 
                            {...register('paciente_id')}
                            onValueChange={handlePatientSelection}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione um paciente" />
                                </SelectTrigger>
                                <SelectContent>
                                    <Input
                                        className='pb-1'
                                        {...registerPatient("patientName")}
                                        placeholder="Digite o nome do paciente"
                                        onChange={(e) => {
                                            e.preventDefault();
                                            const value = e.target.value;
                                            setSearchValue(value);
                                            setPatientValue("patientName", value);
                                        }}
                                    />

                                    {patients.map((patient) => (
                                        <SelectItem key={patient.paciente_id} value={patient.paciente_id}>
                                            {patient.nome}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </TableCell>
                    </TableRow>

                    {/* Pagamento Total */}
                    <TableRow>
                        <TableCell className="font-semibold">Pagamento Total:</TableCell>
                        <TableCell className="flex justify-start -mt-2">
                            <Input type='number' {...register('valor_recebido')} id='valor_recebido' />
                        </TableCell>
                    </TableRow>

                    {/* Pagamento AR/AV */}
                    <TableRow>
                        <TableCell className="font-semibold">Tipo de Pagamento:</TableCell>
                        <TableCell className="flex justify-start -mt-2">
                            <Select
                                {...register("pagamentoAR_AV")}
                                onValueChange={(value) => setValue("pagamentoAR_AV", value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione um tipo de Servico" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem className="cursor-pointer" value="AV">À Vista</SelectItem>
                                    <SelectItem className="cursor-pointer" value="AR">À Receber</SelectItem>
                                </SelectContent>
                            </Select>
                        </TableCell>
                    </TableRow>

                    {/* Nome do Colaborador */}
                    <TableRow className='col-span'>
                        <TableCell className="font-semibold">Nome do Colaborador:</TableCell>
                        <TableCell className="flex justify-start -mt-2">
                            <Select
                                onValueChange={(value) => {
                                    setValue("funcionario_id", value); // Atribui o ID do colaborador
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione um colaborador" />
                                </SelectTrigger>
                                <SelectContent>
                                    <Input
                                        className='pb-1'
                                        {...registerCollaborator("collaboratorName")}
                                        placeholder="Digite o nome do colaborador"
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setCollaboratorSearchValue(value);
                                            setCollaboratorValue("collaboratorName", value);
                                        }}
                                    />
                                    {collaborators.map((collaborator) => (
                                        <SelectItem key={collaborator.funcionario_id} value={collaborator.funcionario_id}>
                                            {collaborator.nome}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </TableCell>
                    </TableRow>

                    {/* Pagamento a Colaborador */}
                    <TableRow>
                        <TableCell className="font-semibold">Pagamento Colaborador:</TableCell>
                        <TableCell className="flex justify-start -mt-2">
                            <Input type='number' {...register('valor_pago')} id='valor_pago' />
                        </TableCell>
                    </TableRow>

                    {/* Tipo de Serviço */}
                    <TableRow>
                        <TableCell className="font-semibold">Tipo de Serviço:</TableCell>
                        <TableCell className="flex justify-start -mt-2">
                            <Select
                                {...register("tipo_servico")}
                                onValueChange={(value) => {
                                    setValue("tipo_servico", value);
                                    setSelectedServiceType(value); // Atualiza o estado do tipo de serviço
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione um tipo de Servico" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="SD">SD</SelectItem>
                                    <SelectItem value="SN">SN</SelectItem>
                                    <SelectItem value="PT">PT</SelectItem>
                                    <SelectItem value="GR">GR</SelectItem>
                                </SelectContent>
                            </Select>
                        </TableCell>
                    </TableRow>

                    {/* Horario GR */}
                    <TableRow>
                        {selectedServiceType === 'GR' && (
                            <>
                                <TableCell className="font-semibold">Horário:</TableCell>
                                <TableCell className="flex justify-start -mt-2">
                                    <Input type="time" {...register('horario_gerenciamento')} placeholder="Informe o horário" />
                                </TableCell>
                            </>
                        )}
                    </TableRow>
                    <Button
                        type="button"
                        onClick={handleComplete}
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Concluir
                    </Button>
                </TableBody>
            </Table>
        </form>
    );
};
