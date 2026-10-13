import { useState } from 'react'
import type { Task } from 'entities/task/model/types'

type Filter = 'all' | 'completed' | 'incomplete'

const initialTasks: Task[] = [
  { id: '1', title: 'Посмотреть вебинар по 1 уроку', completed: true },
  { id: '2', title: 'Создать проект', completed: false },
  { id: '3', title: 'Изучить TypeScript', completed: false },
]

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [filter, setFilter] = useState<Filter>('all')

  const removeTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  return { tasks, filter, setFilter, removeTask }
}

export type { Filter }
