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
import DetalheEvento from '../views/DetalheEvento'
import EventoListPartipante from '../views/EventListParticipante'
import PrivateRoute from './PrivateRoute' // Importe o componente PrivateRoute
import Perfil from '../views/Perfil'

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<PrivateRoute element={<Home />} />}>
        <Route index element={<Inicio />} />
        <Route path="inscricao" element={<Inscricao />} />
        <Route path="line-up/:id" element={<LineUp />} />
        <Route path="lista-evento" element={<EventoListPartipante />} />
        <Route path="participantes" element={<Participante />} />
        
        <Route path="evento" element={<Evento />} />
        <Route path="evento/:id" element={<DetalheEvento />} />

        <Route path="in-event" element={<EventoPalestrante />} />

        <Route path="palestrantes" element={<Palestrante />} />
        <Route path="perfil" element={<Perfil />} />
      </Route>
    </Routes>
  )
}

export default Routing
