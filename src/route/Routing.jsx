import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../views/Login'
import SignUp from '../views/SignUp'
import Home from '../views/Home'

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  )
}

export default Routing
