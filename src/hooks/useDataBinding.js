// encapsulate input elements
// binding value and onChange attributes
import { useState } from 'react'

export default function useInput(initialValue) {
  const [value, setValue] = useState(initialValue)
  const reset = () => {
    setValue(initialValue)
  }

  const binding = {
    value,
    onChange: (event) => {
      setValue(event.target.value)
    },
  }

  return [value, binding, reset, setValue]
}
