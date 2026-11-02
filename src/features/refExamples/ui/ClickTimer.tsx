import { useRef } from 'react'
import './ClickTimer.css'

interface ClickData {
  startTime: number | null
  clickCount: number
}

export function ClickTimer() {
  const clickDataRef = useRef<ClickData>({
    startTime: null,
    clickCount: 0,
  })

  const handleClick = () => {
    const now = Date.now()

    if (clickDataRef.current.startTime === null) {
      clickDataRef.current.startTime = now
    }

    clickDataRef.current.clickCount += 1

    const diff = now - clickDataRef.current.startTime

    console.log(`Разница во времени: ${diff} мс`)
    console.log(`Общее количество кликов: ${clickDataRef.current.clickCount}`)
  }

  return (
    <div className="click-timer">
      <h3>ClickTimer</h3>
      <button onClick={handleClick}>Кликни меня</button>
      <p>
        <i>Откройте консоль (F12), чтобы увидеть результат</i>
      </p>
    </div>
  )
}
