import { Button, Card, CardBody, Table } from "reactstrap"
import Layout from "../../components/layout"
import CartItem from "../../components/cartItem"
import { useEffect, useState } from "react"
import { API, getConfig } from "../../config/api"
import { useNavigate } from "react-router-dom"
import {SwalLoading, SwalFire} from '../../utils/swal-fire'
import { formatNumber } from '../../utils/format'



const Cart = () => {
    const [items, setItems] = useState([])
    const navigate = useNavigate()

    const getTotal = () => {
        let total = 0;
        for(let i = 0; i< items.length; i++){
            total += items[i].item.price * items[i].qty
        }

        return total
    }

    const getData = async () => {
        const Swal = SwalLoading()
        try {
            const config = await getConfig()
            const result = await API.get('/cart', config)
            Swal.close()
            setItems(result.data.data)
        } catch (error) {
            Swal.close()
            SwalFire('error', error.response.data.message)
            console.log(error);
        }

    }

    const handleClearCart = async (type) => {
        const Swal = SwalLoading()
        try {
            const config = await getConfig()

            const result = await API.delete('/cart', config)
            getData()
            Swal.close()
        } catch (error) {
            Swal.close()
            SwalFire('error', error.response.data.message)
            console.log(error);
        }
    }

    const handleOrder = async (type) => {
        const Swal = SwalLoading()
        try {
            const config = await getConfig()

            const result = await API.post('/order', { total: getTotal() }, config)
            Swal.close()
            navigate('/order/' + result.data.data.order_id)
        } catch (error) {
            Swal.close()
            SwalFire('error', error.response.data.message)
            console.log(error);
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <Layout>
            <Card
                className="mx-auto"
                style={{ width: '50rem' }}
            >
                <CardBody>
                    <Table
                    >
                        <thead>
                            <tr>
                                <th>
                                    Item
                                </th>
                                <th>
                                    Price
                                </th>
                                <th>
                                    Quantity
                                </th>
                                <th>
                                    Total
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                items
                                &&
                                items.map(item =>
                                    <CartItem
                                        key={item.id}
                                        data={item}
                                        getData={getData}
                                    />)
                            }
                            <tr>
                                <td></td>
                                <td></td>
                                <td>
                                    <Button onClick={handleClearCart} color="danger">Clear Cart</Button>
                                </td>
                                <td>
                                    {formatNumber(getTotal())}
                                </td>
                            </tr>
                            <tr>
                                <td></td><td></td><td></td>
                                <td>
                                    <Button onClick={handleOrder} color="success">Order</Button>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        </Layout >
    )
}

export default Cart