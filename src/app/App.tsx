import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { TaskPage } from 'pages/tasks/ui/TaskPage'
import { RegisterPage } from 'pages/register/ui/RegisterPage'

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TaskPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
