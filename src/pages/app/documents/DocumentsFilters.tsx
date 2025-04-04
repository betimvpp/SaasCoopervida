import { zodResolver } from '@hookform/resolvers/zod'
import { Search, X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { documentsFiltersSchema, DocumentsFiltersSchema, useDocuments } from '@/contexts/docsContext'
import { useState } from 'react'

export function DocumentsFilters() {
  const { fetchDocuments } = useDocuments();
  const [filterLoading, setIsFilterLoading] = useState(false);

  const { handleSubmit, control, reset } = useForm<DocumentsFiltersSchema>({
    resolver: zodResolver(documentsFiltersSchema),
    defaultValues: {
      order: 'asc',
    },
  });

  async function handleFilter(data: DocumentsFiltersSchema) {
    setIsFilterLoading(true);
    await fetchDocuments({ order: data.order });
    setIsFilterLoading(false);
  }

  function handleClearFilters() {
    reset({ order: 'asc' });
    fetchDocuments({ order: 'asc' });
  }

  return (
    <div className="flex justify-between">
      <form onSubmit={handleSubmit(handleFilter)} className="flex items-center gap-2">
        <span className="text-sm font-semibold">Ordenar por data:</span>
        <Controller
          name="order"
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
                <SelectItem className="cursor-pointer" value="asc">
                  Crescente
                </SelectItem>
                <SelectItem className="cursor-pointer" value="desc">
                  Decrescente
                </SelectItem>
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
  )
}
