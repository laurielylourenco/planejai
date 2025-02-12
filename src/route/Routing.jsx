import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../views/Login'
import SignUp from '../views/SignUp'
import Home from '../views/Home'
import LineUp from '../views/LineUp'
import Inicio from '../views/Inicio'
import Participante from '../views/Participante'
import Inscricao from '../views/Inscricao'
import Evento from '../views/Evento'
import Palestrante from '../views/Palestrante'
import EventoPalestrante from '../views/EventoPalestrante'

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<Home />}>
        <Route index element={<Inicio />} />
        <Route path="inscricao" element={<Inscricao />} />
        <Route path="line-up" element={<LineUp />} />
        <Route path="participantes" element={<Participante />} />
        <Route path="evento" element={<Evento />} />
        <Route path="in-event" element={<EventoPalestrante />} />
        <Route path="palestrantes" element={<Palestrante />} />
      </Route>
    </Routes>
  )
}

export default Routing
