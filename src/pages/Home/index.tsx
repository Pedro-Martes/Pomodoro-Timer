import { HandPalm, Play } from 'phosphor-react'
import { HomeContainer, StartCountButton, StopCountButton } from './styles'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useContext } from 'react'
import { NewCycleForm } from './components/newCycleForm'
import { CountDown } from './components/CoutDown'
import { CycleContext } from '../../contexts/CycleContexts'

const newCicleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe o nome tarefa'),
  minutes: zod
    .number()
    .min(1, 'o tempo precisa sei de no minimo 5 min')
    .max(60, 'o tempo rprecisa de no max 60 min'),
})
type newCicleFormData = zod.infer<typeof newCicleFormValidationSchema>

// ---------------------------------------------------------------------HOME-----------------------------------------------------------------------------------------------------------
export function Home() {
  const { createNewCycle, interruptCurrentCycle, activeCycle } =
    useContext(CycleContext)

  const newCycleForm = useForm<newCicleFormData>({
    resolver: zodResolver(newCicleFormValidationSchema),
    defaultValues: {
      task: '',
      minutes: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm
  const task = watch('task')
  const isSubmitDisable = !task

  function handleCreateNewCycle(data: newCicleFormData) {
    createNewCycle(data)
    reset()
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <CountDown />

        {activeCycle ? (
          <StopCountButton onClick={interruptCurrentCycle} type="button">
            <HandPalm />
            Interromper
          </StopCountButton>
        ) : (
          <StartCountButton disabled={isSubmitDisable} type="submit">
            <Play />
            Começar
          </StartCountButton>
        )}
      </form>
    </HomeContainer>
  )
}
