import { useRef } from 'react'
import './FocusTracker.css'

export function FocusTracker() {
  const input1Ref = useRef<HTMLInputElement>(null)
  const input2Ref = useRef<HTMLInputElement>(null)

  const focusCountRef = useRef(0)

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    if (event.relatedTarget) {
      focusCountRef.current += 1
      console.log(`Переходов фокуса: ${focusCountRef.current}`)
    }
  }

  return (
    <div className="focus-tracker">
      <h3>FocusTracker</h3>
      <div>
        <input
          ref={input1Ref}
          onFocus={handleFocus}
          placeholder="Первое поле"
        />
        <input
          ref={input2Ref}
          onFocus={handleFocus}
          placeholder="Второе поле"
        />
        <button onClick={() => input1Ref.current?.focus()}>
          Сфокусироваться на первом
        </button>
      </div>
      <p>
        <i>Откройте консоль (F12), чтобы увидеть результат</i>
      </p>
    </div>
  )
}
