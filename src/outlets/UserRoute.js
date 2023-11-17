import { Navigate, Outlet } from "react-router-dom"

const UserRoute = () => {
    const role = localStorage.getItem('role')

    if (role === 'user') {
        return <Outlet />
    } else {
        return <Navigate to='/login' />
    }
}

export default UserRoute