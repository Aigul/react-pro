import { useState, useMemo, useCallback } from 'react'
import type { Task } from 'entities/task/model/types'

type Filter = 'all' | 'completed' | 'incomplete'

const initialTasks: Task[] = [
  { id: '1', title: 'Посмотреть вебинар по 1 уроку', completed: true },
  { id: '2', title: 'Создать проект', completed: false },
  { id: '3', title: 'Изучить TypeScript', completed: false },
  {
    id: '4',
    title: 'Компонент  TaskCard обернуть в React.memo',
    completed: true,
  },
  {
    id: '5',
    title: 'Фильтрация по статусу выполняется через useMemo',
    completed: false,
  },
  { id: '6', title: 'Обернуть removeTask в useCallback', completed: false },
]

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [filter, setFilter] = useState<Filter>('all')

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

  const removeTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return { filteredTasks, filter, setFilter, removeTask }
}

export type { Filter }
