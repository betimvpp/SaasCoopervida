import { zodResolver } from '@hookform/resolvers/zod'
import { Search, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const patientFiltersSchema = z.object({
  patientId: z.string().optional(),
  patientName: z.string().optional(),
  role: z.string().optional(),
})

type PatientFiltersSchema = z.infer<typeof patientFiltersSchema>

export function PatientFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const patientId = searchParams.get('patientId')
  const patientName = searchParams.get('patientName')


  const { register, handleSubmit, reset } =
    useForm<PatientFiltersSchema>({
      resolver: zodResolver(patientFiltersSchema),
      defaultValues: {
        patientId: patientId ?? '',
        patientName: patientName ?? '',

      },
    })

  function handleFilter({ patientId, patientName }: PatientFiltersSchema) {
    setSearchParams((state) => {
      if (patientId) {
        state.set('patientId', patientId)
      } else {
        state.delete('patientId')
      }

      if (patientName) {
        state.set('patientName', patientName)
      } else {
        state.delete('patientName')
      }

      state.set('page', '1')

      return state
    })
  }

  function handleClearFilters() {
    setSearchParams((state) => {
      state.delete('patientId')
      state.delete('patientName')
      state.set('page', '1')

      return state
    })

    reset({
      patientId: '',
      patientName: '',
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
          placeholder="ID do Paciente"
          className="h-8 w-auto"
          {...register('patientId')}
        />
        <Input
          placeholder="Nome do Paciente"
          className="h-8 w-[320px]"
          {...register('patientName')}
        />

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
        Adcionar Paciente
      </Button>
    </div>
  )
}
