import { useState, useEffect, useRef } from 'react'
import './PreviousInput.css'

export function PreviousInput() {
  const [value, setValue] = useState('')
  const prevValueRef = useRef('')

  useEffect(() => {
    prevValueRef.current = value
  }, [value])

  return (
    <div className="previous-input">
      <h3>Previous Input</h3>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Введите число..."
      />
      <p>
        Предыдущее значение: <b>{prevValueRef.current}</b>
      </p>
    </div>
  )
}
