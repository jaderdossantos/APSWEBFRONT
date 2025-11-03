import { Routes, Route } from 'react-router-dom'
import Consulta from './pages/Consulta'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'

function App() {
  return (
    <Routes>
      <Route path="/APSWEBFRONT" element={<Login />}/>
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/consulta" element={<Consulta />} />
    </Routes>
  )
}

export default App