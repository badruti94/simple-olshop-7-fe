import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap"
import Layout from "../../components/layout"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { API, getConfig } from '../../config/api'
import { SwalLoading, SwalFire } from '../../utils/swal-fire'

const ItemDetail = () => {

    const [item, setItem] = useState({})
    const [noAdmin, setNoAdmin] = useState('')
    const [stock, setStock] = useState(0)
    const [isAdmin, setIsAdmin] = useState(false)
    const params = useParams()
    const navigate = useNavigate()
    const { id } = params

    useEffect(() => {
        const getData = async () => {
            const Swal = SwalLoading()
            const result = await API.get('/item/' + id)
            Swal.close()
            setItem(result.data.data.item)
            setNoAdmin(result.data.data.no_admin)
        }
        getData()

        const role = localStorage.getItem('role')
        if (role === 'admin') setIsAdmin(true)
    }, [])

    const getDataStock = async () => {
        const result = await API.get(`/item/${id}/stock`)
        setStock(result.data.data)
    }
    useEffect(() => {
        getDataStock()
    }, [])


    const handleAddToCart = async (id) => {
        const Swal = SwalLoading()
        try {
            const isLogin = localStorage.getItem('login')
            if (!isLogin) {
                Swal.close()
                navigate('/login')
            } else {
                const config = await getConfig()
                const user_id = localStorage.getItem('user_id')
                Swal.close()
                const result = await API.post('/cart', { user_id, item_id: id }, config)
                SwalFire('success', result.data.message)
                getDataStock()
            }

        } catch (error) {
            Swal.close()
            SwalFire('error', error.response.data.message)

            console.log(error);
        }
    }

    return (
        <Layout>
            <Card
                body
                className="mx-auto"
                style={{
                    width: '1000px',
                }}
            >
                <img
                    alt="Sample"
                    src={item.image}
                    style={{ width: '500px' }}
                    className="mx-auto"
                />
                <CardBody className="py-5">


                    <CardTitle tag="h5">
                        {item.name}
                    </CardTitle>
                    <CardSubtitle
                        className="mb-2 text-muted"
                        tag="h6"
                    >
                        Rp {item.price}
                    </CardSubtitle>
                    <div className="button-wrapper">
                        {!isAdmin &&
                            <Button
                                onClick={() => handleAddToCart(item.id)}
                                color="danger"
                                className="mt-3 mx-2">
                                Add to Cart
                            </Button>
                        }
                        <Button
                            onClick={() => window.open(`https://wa.me/${noAdmin}`, '_blank', 'noreferrer')}
                            color="success"
                            className="mt-3 mx-2">
                            Hubungi Penjual
                        </Button>
                    </div>
                    <CardText className="mt-5">
                        Stock : {stock} <br /> <br />
                        {item.description}
                    </CardText>
                </CardBody>
            </Card>
        </Layout>
    )
}

export default ItemDetail