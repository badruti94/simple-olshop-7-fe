import axios from "axios"

export const API = axios.create({
    // baseURL: 'http://localhost:4000/v1/'
    baseURL: 'https://simple-olshop-7.vercel.app/v1/'
})

export const getConfig = async () => {
    const token = localStorage.getItem('token')

    const config = {
        headers: {
            'Authorization' : `Bearer ${token}`
        }
    }

    return config
}