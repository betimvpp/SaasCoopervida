import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { serviceExchangeFiltersSchema, ServiceExchangeFiltersSchema, useScale } from '@/contexts/scaleContext'

export function PermutationFilters() {
    const { fetchServiceExchanges } = useScale();

    const [dateOrder, setDateOrder] = useState<'asc' | 'desc' | null>(null);
    const [originServiceOrder, setOriginServiceOrder] = useState<'asc' | 'desc' | null>(null);
    const [destServiceOrder, setDestServiceOrder] = useState<'asc' | 'desc' | null>(null);


    const { control, handleSubmit, reset } = useForm<ServiceExchangeFiltersSchema>({
        resolver: zodResolver(serviceExchangeFiltersSchema),
        defaultValues: {
            dataDestino: '',
            dataOrigem: '',
            servicoOrigem: '',
            servicoDestino: '',
        },
    });

    const toggleOrder = (currentOrder: 'asc' | 'desc' | null, setOrder: (order: 'asc' | 'desc' | null) => void) => {
        if (currentOrder === 'asc') {
            setOrder('desc');
        } else {
            setOrder('asc');
        }
    };

    async function handleFilter(data: ServiceExchangeFiltersSchema) {
        await fetchServiceExchanges({
            ...data,
            dateOrder,
            originServiceOrder,
            destServiceOrder,
        });
    }

    function handleClearFilters() {
        reset({
            dataDestino: '',
            dataOrigem: '',
            servicoOrigem: '',
            servicoDestino: '',
        });

        fetchServiceExchanges({
            dataDestino: '',
            dataOrigem: '',
            servicoOrigem: '',
            servicoDestino: '',
        });
    }
    return (
        <div className='flex justify-between'>
            <form onSubmit={handleSubmit(handleFilter)} className="flex items-center gap-2">
                <span className="text-sm font-semibold">Filtros:</span>

                {/* Filtro de Data de Origem */}
                <Controller
                    name="dataOrigem"
                    control={control}
                    render={({ field: { onChange, value, name } }) => (
                        <Select name={name} onValueChange={onChange} value={value}>
                            <SelectTrigger className="h-8 w-[180px]" onClick={() => toggleOrder(dateOrder, setDateOrder)}>
                                <SelectValue placeholder="Data de Origem" />
                                {dateOrder === 'asc' ? <ChevronUp /> : <ChevronDown />}
                            </SelectTrigger>
                            <SelectContent>
                                {/* Adicione as opções de data aqui */}
                                <SelectItem value="data1">Data 1</SelectItem>
                                <SelectItem value="data2">Data 2</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                />

                {/* Filtro de Data de Destino */}
                <Controller
                    name="dataDestino"
                    control={control}
                    render={({ field: { onChange, value, name } }) => (
                        <Select name={name} onValueChange={onChange} value={value}>
                            <SelectTrigger className="h-8 w-[180px]" onClick={() => toggleOrder(dateOrder, setDateOrder)}>
                                <SelectValue placeholder="Data de Destino" />
                                {dateOrder === 'asc' ? <ChevronUp /> : <ChevronDown />}
                            </SelectTrigger>
                            <SelectContent>
                                {/* Adicione as opções de data aqui */}
                                <SelectItem value="data1">Data 1</SelectItem>
                                <SelectItem value="data2">Data 2</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                />

                {/* Filtro de Serviço de Origem */}
                <Controller
                    name="servicoOrigem"
                    control={control}
                    render={({ field: { onChange, value, name } }) => (
                        <Select name={name} onValueChange={onChange} value={value}>
                            <SelectTrigger className="h-8 w-[180px]" onClick={() => toggleOrder(originServiceOrder, setOriginServiceOrder)}>
                                <SelectValue placeholder="Serviço de Origem" />
                                {originServiceOrder === 'asc' ? <ChevronUp /> : <ChevronDown />}
                            </SelectTrigger>
                            <SelectContent>
                                {/* Adicione as opções de serviço aqui */}
                                <SelectItem value="servico1">Serviço 1</SelectItem>
                                <SelectItem value="servico2">Serviço 2</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                />

                {/* Filtro de Serviço de Destino */}
                <Controller
                    name="servicoDestino"
                    control={control}
                    render={({ field: { onChange, value, name } }) => (
                        <Select name={name} onValueChange={onChange} value={value}>
                            <SelectTrigger className="h-8 w-[180px]" onClick={() => toggleOrder(destServiceOrder, setDestServiceOrder)}>
                                <SelectValue placeholder="Serviço de Destino" />
                                {destServiceOrder === 'asc' ? <ChevronUp /> : <ChevronDown />}
                            </SelectTrigger>
                            <SelectContent>
                                {/* Adicione as opções de serviço aqui */}
                                <SelectItem value="servico1">Serviço 1</SelectItem>
                                <SelectItem value="servico2">Serviço 2</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                />

                <Button variant="default" size="xs" type="submit">
                    Filtrar
                </Button>
                <Button onClick={handleClearFilters} variant="outline" size="xs" type="button">
                    Remover filtros
                </Button>
            </form>
        </div>
    )
}
