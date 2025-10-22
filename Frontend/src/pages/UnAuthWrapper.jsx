
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const AuthWrapper = (props) => {
    const {users}=useSelector((state)=>state.userReducer)
  return !users ? props.children:<Navigate to="/" replace />
}

export default AuthWrapper