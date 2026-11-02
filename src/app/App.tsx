import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { TaskPage } from 'pages/tasks/ui/TaskPage'
import { RegisterPage } from 'pages/register/ui/RegisterPage'
import { RefsPage } from 'pages/refs/ui/RefsPage.tsx'

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/tasks" element={<TaskPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<RefsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
