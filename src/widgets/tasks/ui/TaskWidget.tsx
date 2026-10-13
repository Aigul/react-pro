import { TaskList } from 'features/taskList/ui/TaskList'
import styles from './TaskWidget.module.css'

export function TaskWidget() {
  return (
    <section className={styles.widget}>
      <TaskList />
    </section>
  )
}
