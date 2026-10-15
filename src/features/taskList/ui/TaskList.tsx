import { TaskCard } from 'entities/task/ui/TaskCard'
import { useTasks } from '../model/useTasks'
import type { Filter } from '../model/useTasks'
import styles from './TaskList.module.css'

const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: 'Все' },
  { value: 'completed', label: 'Выполненные' },
  { value: 'incomplete', label: 'Невыполненные' },
]

export function TaskList() {
  const { filteredTasks, filter, setFilter, removeTask } = useTasks()

  const filtered = filteredTasks.filter((task) => {
    if (filter === 'completed') return task.completed
    if (filter === 'incomplete') return !task.completed
    return true
  })

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        {filters.map((f) => (
          <button
            key={f.value}
            className={`${styles.filterButton} ${filter === f.value ? styles.filterButtonActive : ''}`}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className={styles.list}>
        {filtered.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onRemove={() => removeTask(task.id)}
          />
        ))}
      </div>
    </div>
  )
}
