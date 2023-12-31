import { useEffect, useState } from "react"
import Layout from "../../components/layout"
import OrderItem from "../../components/orderItem"
import { useDispatch, useSelector } from 'react-redux'
import { API, getConfig } from "../../config/api"
import { SwalLoading } from '../../utils/swal-fire'
import PaginationComponent from "../../components/pagination"
import { updatePage, updateTotalData } from "../../config/redux/slice/paginationSlice"

const Order = () => {
    const [orders, setOrders] = useState([])
    const { page, perPage } = useSelector(state => state.pagination)
    const dispatch = useDispatch()


    const getData = async () => {
        const config = await getConfig()
        const Swal = SwalLoading()
        const result = await API.get(`/order?page=${page}&perPage=${perPage}`, config)
        Swal.close()
        setOrders(result.data.data)
        dispatch(updateTotalData(parseInt(result.data.total_data)))
    }

    useEffect(() => {
        return () => {
            dispatch(updatePage(1))
        }
    }, [])

    useEffect(() => {
        try {
            getData()
        } catch (error) {
            console.log(error);
        }
    }, [page])

    return (
        <Layout>
            {
                orders
                &&
                orders.map(order =>
                    <OrderItem
                        key={order.id}
                        data={order}
                    />)
            }
            <PaginationComponent />

        </Layout>
    )
}

export default Order