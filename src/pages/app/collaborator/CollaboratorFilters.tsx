import { zodResolver } from '@hookform/resolvers/zod'
import { Search, X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { collaboratorFiltersSchema, CollaboratorFiltersSchema, useCollaborator } from '@/contexts/collaboratorContext'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { CollaboratorAdditioner } from './CollaboratorAdditioner'
import { useState } from 'react'



export function CollaboratorFilters() {
  const { fetchCollaborator } = useCollaborator();
  const [isAdditionerOpen, setIsAdditionerOpen] = useState(false);

  const { register, handleSubmit, control, reset } = useForm<CollaboratorFiltersSchema>({
    resolver: zodResolver(collaboratorFiltersSchema),
    defaultValues: {
      collaboratorId: '',
      collaboratorName: '',
      role: 'all',
    },
  });

  async function handleFilter(data: CollaboratorFiltersSchema) {
    await fetchCollaborator(data);
  }

  function handleClearFilters() {
    reset({
      collaboratorId: '',
      collaboratorName: '',
      role: 'all',
    });

    fetchCollaborator({ collaboratorId: '', collaboratorName: '', role: 'all' });
  }


  return (
    <div className='flex justify-between'>
      <form
        onSubmit={handleSubmit(handleFilter)}
        className="flex items-center gap-2"
      >
        <span className="text-sm font-semibold">Filtros:</span>
        <Input
          placeholder="ID do colaborador"
          className="h-8 w-auto"
          {...register('collaboratorId')}
        />
        <Input
          placeholder="Nome do colaborador"
          className="h-8 w-[17rem]"
          {...register('collaboratorName')}
        />
        <Controller
          name="role"
          control={control}
          render={({ field: { name, onChange, value, disabled } }) => {
            return (
              <Select
                defaultValue="all"
                name={name}
                onValueChange={onChange}
                value={value}
                disabled={disabled}
              >
                <SelectTrigger className="h-8 w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos cargos</SelectItem>
                  <SelectItem value="fisioterapeuta">Fisioterapeuta</SelectItem>
                  <SelectItem value="enfermeiro">Enfermeiro</SelectItem>
                  <SelectItem value="tecnico-enfermagem">Técnico de Enfermagem</SelectItem>
                </SelectContent>
              </Select>
            )
          }}
        ></Controller>
        <Button variant="default" size="xs" type="submit">
          <Search className="mr-2 h-4 w-4" />
          Filtrar resultados
        </Button>
        <Button
          onClick={handleClearFilters}
          variant="outline"
          size="xs"
          type="button"
        >
          <X className="mr-2 h-4 w-4" />
          Remover filtros
        </Button>
      </form>

      <Dialog open={isAdditionerOpen} onOpenChange={setIsAdditionerOpen}>
        <DialogTrigger asChild>
          <Button variant={'secondary'}>
            Adcionar Colaborador
          </Button>
        </DialogTrigger>
        <CollaboratorAdditioner />
      </Dialog>
    </div>
  )
}
