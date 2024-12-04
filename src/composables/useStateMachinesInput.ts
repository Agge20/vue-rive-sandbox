import { Rive, StateMachineInput } from '@rive-app/canvas'

/**
 * Custom hook for fetching a stateMachine input from a rive file.
 *
 * @param rive - Rive instance
 * @param stateMachineName - Name of the state machine
 * @param inputName - Name of the input
 * @returns StateMachineInput | null
 */
export default function useStateMachineInput(
  rive: Rive,
  stateMachineName: string,
  inputName: string,
) {
  let input: StateMachineInput | null = null

  if (!rive || !stateMachineName || !inputName) {
    input = null
  }

  if (rive && stateMachineName && inputName) {
    const inputs = rive.stateMachineInputs(stateMachineName)
    if (inputs) {
      const selectedInput = inputs.find((i) => i.name === inputName)

      input = selectedInput || null
    }
  } else {
    input = null
  }
  return input
}
