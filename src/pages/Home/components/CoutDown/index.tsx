import { differenceInSeconds } from 'date-fns'
import { useContext, useEffect } from 'react'
import { CycleContext } from '../../../../contexts/CycleContexts'
import { CountdownContainer, Separador } from './style'

export function CountDown() {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    secondPassed,
    setSecondPassedNew,
  } = useContext(CycleContext)

  const totalSeconds = activeCycle ? activeCycle.minutes * 60 : 0

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondDiference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate),
        )

        if (secondDiference >= totalSeconds) {
          markCurrentCycleAsFinished()

          setSecondPassedNew(totalSeconds)
          clearInterval(interval)
        } else {
          setSecondPassedNew(secondDiference)
        }
      }, 1000)
    }
    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    totalSeconds,
    activeCycleId,
    markCurrentCycleAsFinished,
    setSecondPassedNew,
    secondPassed,
  ])

  const currentSeconds = activeCycle ? totalSeconds - secondPassed : 0

  const minutes = Math.floor(currentSeconds / 60)
  const seconds = currentSeconds % 60

  const minutesLeftZero = String(minutes).padStart(2, '0')
  const secondsLeftZero = String(seconds).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutesLeftZero}:${secondsLeftZero}`
    }
  }, [minutesLeftZero, secondsLeftZero, activeCycle])

  return (
    <CountdownContainer>
      <span>{minutesLeftZero[0]}</span>
      <span>{minutesLeftZero[1]}</span>
      <Separador>:</Separador>
      <span>{secondsLeftZero[0]}</span>
      <span>{secondsLeftZero[1]}</span>
    </CountdownContainer>
  )
}
