import { useState, useEffect, useMemo, useCallback } from 'react'
import type { Task } from 'entities/task/model/types'
import { useGetTasksQuery } from 'entities/task/api/tasksApi'

export type Filter = 'all' | 'completed' | 'incomplete'

export function useTasks() {
  const { data: serverTasks } = useGetTasksQuery()

  const [tasks, setTasks] = useState<Task[]>([])
  const [filter, setFilter] = useState<Filter>('all')

  useEffect(() => {
    if (serverTasks) {
      setTasks(serverTasks)
    }
  }, [serverTasks])

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'completed':
        return tasks.filter((task) => task.completed)
      case 'incomplete':
        return tasks.filter((task) => !task.completed)
      default:
        return tasks
    }
  }, [tasks, filter])

  const removeTask = useCallback((id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return { filteredTasks, filter, setFilter, removeTask }
}
