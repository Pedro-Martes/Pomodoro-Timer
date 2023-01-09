import { FormContainer, MinutesInput, TaskInput } from './style'
import { useContext } from 'react'
import { CycleContext } from '../../../../contexts/CycleContexts'
import { useFormContext } from 'react-hook-form'

export function NewCycleForm() {
  const { activeCycle } = useContext(CycleContext)

  const { register } = useFormContext()

  return (
    <FormContainer>
      <div>
        <label>Vou trabalhar em</label>
        <TaskInput
          id="task"
          placeholder="Nome da tarefa"
          list="Tasks-latest"
          disabled={!!activeCycle}
          {...register('task')}
        />

        <datalist id="Tasks-latest">
          <option value="porjeto 1" />
          <option value="banana 1" />
        </datalist>

        <label>durante</label>
        <MinutesInput
          type="number"
          id="minutes"
          placeholder=" 00 "
          step="5"
          min="1"
          max="60"
          disabled={!!activeCycle}
          {...register('minutes', { valueAsNumber: true })}
        />
        <span>Minutos.</span>
      </div>
    </FormContainer>
  )
}
