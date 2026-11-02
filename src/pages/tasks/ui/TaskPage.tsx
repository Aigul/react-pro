import { Link } from 'react-router-dom'
import { TaskWidget } from 'widgets/tasks'

export function TaskPage() {
  return (
    <div>
      <h1>Мои задачи</h1>
      <TaskWidget />
      <div style={{ marginTop: '32px' }}>
        <Link to="/register" className="btn-primary">
          Зарегистрироваться
        </Link>
      </div>
    </div>
  )
}
