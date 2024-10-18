import { zodResolver } from '@hookform/resolvers/zod'
import { Search, X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const collaboratorFiltersSchema = z.object({
  collaboratorId: z.string().optional(),
  collaboratorName: z.string().optional(),
  role: z.string().optional(),
})

type CollaboratorFiltersSchema = z.infer<typeof collaboratorFiltersSchema>

export function CollaboratorFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const collaboratorId = searchParams.get('collaboratorId')
  const collaboratorName = searchParams.get('collaboratorName')
  const role = searchParams.get('role')

  const { register, handleSubmit, control, reset } =
    useForm<CollaboratorFiltersSchema>({
      resolver: zodResolver(collaboratorFiltersSchema),
      defaultValues: {
        collaboratorId: collaboratorId ?? '',
        collaboratorName: collaboratorName ?? '',
        role: role ?? 'all',
      },
    })

  function handleFilter({ collaboratorId, collaboratorName, role }: CollaboratorFiltersSchema) {
    setSearchParams((state) => {
      if (collaboratorId) {
        state.set('collaboratorId', collaboratorId)
      } else {
        state.delete('collaboratorId')
      }

      if (collaboratorName) {
        state.set('collaboratorName', collaboratorName)
      } else {
        state.delete('collaboratorName')
      }

      if (role && role !== 'all') {
        state.set('role', role)
      } else {
        state.delete('role')
      }

      state.set('page', '1')

      return state
    })
  }

  function handleClearFilters() {
    setSearchParams((state) => {
      state.delete('collaboratorId')
      state.delete('collaboratorName')
      state.delete('role')
      state.set('page', '1')

      return state
    })

    reset({
      collaboratorId: '',
      collaboratorName: '',
      role: 'all',
    })
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
          className="h-8 w-[320px]"
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

      <Button variant={'secondary'}>
        Adcionar Colaborador
      </Button>
    </div>
  )
}
