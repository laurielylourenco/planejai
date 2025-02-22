import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ element }) => {
  const storedData = localStorage.getItem('userData')

  if (!storedData) {
    return <Navigate to="/login" />
  }

  return element
}
export default PrivateRoute