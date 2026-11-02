import { TaskList } from 'features/taskList/ui/TaskList'
import { useTasks } from 'features/taskList/model/useTasks'

export function TaskWidget() {
  const { filteredTasks, removeTask } = useTasks()

  return <TaskList tasks={filteredTasks} removeTask={removeTask} />
}
