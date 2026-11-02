import { ClickTimer, PreviousInput, FocusTracker } from 'features/refExamples'
import './RefsPage.css'

export function RefsPage() {
  return (
    <div className="refs-page">
      <h2>Примеры использования useRef</h2>
      <ClickTimer />
      <PreviousInput />
      <FocusTracker />
    </div>
  )
}
