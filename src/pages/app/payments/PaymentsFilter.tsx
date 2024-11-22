import { Search, X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState } from 'react'

type PaymentFiltersProps = {
    selectedMonth: string;
    onFilter: (month: string) => void;
};
export function PaymentFilters({ selectedMonth, onFilter }: PaymentFiltersProps) {
    const [filterLoading, setIsFilterLoading] = useState(false);

    const currentMonth = new Date().toLocaleString('default', { month: 'long' }).toLowerCase();

    const { handleSubmit, control, reset } = useForm({
        defaultValues: {
            month: selectedMonth || currentMonth,
        },
    });

    async function handleFilter() {
        setIsFilterLoading(true);
        onFilter(selectedMonth); 
        setIsFilterLoading(false);
    }

    function handleClearFilters() {
        reset({ month: currentMonth });
    }

    return (
        <div className="flex justify-between">
            <form onSubmit={handleSubmit(handleFilter)} className="flex items-center gap-2">
                <span className="text-sm font-semibold">Ordenar por data:</span>
                <Controller
                    name="month"
                    control={control}
                    render={({ field: { name, onChange, value, disabled } }) => (
                        <Select
                            name={name}
                            onValueChange={onChange}
                            value={value}
                            disabled={disabled}
                        >
                            <SelectTrigger className="h-8 w-[180px]">
                                <SelectValue placeholder="Ordenar" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem className="cursor-pointer" value="january">Janeiro</SelectItem>
                                <SelectItem className="cursor-pointer" value="february">Fevereiro</SelectItem>
                                <SelectItem className="cursor-pointer" value="march">Março</SelectItem>
                                <SelectItem className="cursor-pointer" value="april">Abril</SelectItem>
                                <SelectItem className="cursor-pointer" value="may">Maio</SelectItem>
                                <SelectItem className="cursor-pointer" value="june">Junho</SelectItem>
                                <SelectItem className="cursor-pointer" value="july">Julho</SelectItem>
                                <SelectItem className="cursor-pointer" value="august">Agosto</SelectItem>
                                <SelectItem className="cursor-pointer" value="september">Setembro</SelectItem>
                                <SelectItem className="cursor-pointer" value="october">Outubro</SelectItem>
                                <SelectItem className="cursor-pointer" value="november">Novembro</SelectItem>
                                <SelectItem className="cursor-pointer" value="december">Dezembro</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                ></Controller>
                {filterLoading ? (
                    <Button disabled variant="default" size="xs" type="submit">
                        <Search className="mr-2 h-4 w-4" />
                        Filtrando...
                    </Button>
                ) : (
                    <Button variant="default" size="xs" type="submit">
                        <Search className="mr-2 h-4 w-4" />
                        Filtrar
                    </Button>
                )}
                <Button
                    onClick={handleClearFilters}
                    variant="outline"
                    size="xs"
                    type="button"
                >
                    <X className="mr-2 h-4 w-4" />
                    Limpar
                </Button>
            </form>
        </div>
    );
}


