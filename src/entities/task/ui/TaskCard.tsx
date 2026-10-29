import { memo } from 'react'
import type { Task } from '../model/types'

import styles from './TaskCard.module.css'

type Props = {
  task: Task
  onRemove?: () => void
}

export const TaskCard = memo(({ task, onRemove }: Props) => {
  return (
    <div className={`${styles.card} ${task.completed ? styles.completed : ''}`}>
      <div
        className={`${styles.statusIndicator} ${task.completed ? styles.statusIndicatorCompleted : styles.statusIndicatorIncomplete}`}
      />
      <span className={styles.title}>{task.title}</span>
      {onRemove && (
        <button className={styles.removeButton} onClick={onRemove}>
          ✕
        </button>
      )}
    </div>
  )
})

export default TaskCard
