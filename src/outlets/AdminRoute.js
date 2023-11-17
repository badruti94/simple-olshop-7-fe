import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AdminRoute = () => {
    const role = localStorage.getItem('role')

    if (role === 'admin') {
        return <Outlet />
    } else {
        return <Navigate to='/login' />
    }
}

export default AdminRoute