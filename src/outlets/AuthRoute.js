import { Navigate, Outlet } from "react-router-dom"

const AuthRoute = () => {
    const isLogin = localStorage.getItem('login')

    if (isLogin) {
        return <Outlet />
    } else {
        return <Navigate to='/login' />
    }
}

export default AuthRoute