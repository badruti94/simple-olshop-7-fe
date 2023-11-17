import { useEffect, useState } from "react"
import Layout from "../../components/layout"
import OrderItem from "../../components/orderItem"
import { API, getConfig } from "../../config/api"
import { SwalLoading } from '../../utils/swal-fire'

const Order = () => {
    const [orders, setOrders] = useState([])
    const getData = async () => {
        const config = await getConfig()
        const Swal = SwalLoading()
        const result = await API.get('/order', config)
        Swal.close()
        setOrders(result.data.data)
    }

    useEffect(() => {
        try {
            getData()
        } catch (error) {
            console.log(error);
        }
    }, [])

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

        </Layout>
    )
}

export default Order