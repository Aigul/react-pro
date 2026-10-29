import { TaskCard } from 'entities/task/ui/TaskCard'
import type { Task } from 'entities/task/model/types'

import styles from './TaskList.module.css'

interface TaskListProps {
  tasks: Task[]
  removeTask: (id: number) => void
}

export const TaskList = ({ tasks, removeTask }: TaskListProps) => {
  if (tasks.length === 0) {
    return <p>Нет задач</p>
  }

  return (
    <div className={styles.container}>
      {tasks.map((task: Task) => (
        <TaskCard key={task.id} task={task} onRemove={removeTask} />
      ))}
    </div>
  )
}
