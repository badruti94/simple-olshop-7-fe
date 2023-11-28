import { Button, Card, CardBody, CardText, CardTitle, Form, FormGroup, Input, Label, Table } from "reactstrap"
import Layout from "../../components/layout"
import OrderDetailItem from "../../components/orderDetailItem"
import React, { useEffect, useState } from "react"
import { API, getConfig } from '../../config/api'
import { useParams } from "react-router-dom"
import { SwalLoading, SwalFire } from '../../utils/swal-fire'

const OrderDetail = () => {
    const [imgPreview, setImgPreview] = useState(null)
    const [order, setOrder] = useState({
        status: '',
        total: 0,
        payment_proof: '',
        createdAt: '',
        user: {},
        order_item: [],
    })

    const params = useParams()
    const { id } = params

    const role = localStorage.getItem('role')

    const getData = async () => {
        const Swal = SwalLoading()
        try {
            const config = await getConfig()
            const result = await API.get('/order/' + id, config)
            Swal.close()
            setOrder(result.data.data)
            setImgPreview(result.data.data.payment_proof)
        } catch (error) {
            Swal.close()
            SwalFire('error', error.response.data.message)
            console.log(error);
        }
    }
    useEffect(() => {
        getData()
    }, [])

    const handleChangeImage = async (e) => {
        try {
            setImgPreview(URL.createObjectURL(e.target.files[0]))
            setOrder({ ...order, payment_proof: e.target.files[0] })
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async (e) => {
        const Swal = SwalLoading()
        try {
            e.preventDefault()
            const config = await getConfig()

            let result;
            if (role === 'user') {
                if (order.status === 'Belum Dibayar') {
                    const formData = new FormData()
                    formData.append('payment_proof', order.payment_proof)
                    result = await API.put(`/order/${params.id}/pay`, formData, config)
                } else if (order.status === 'Dikirim') {
                    result = await API.patch(`/order/${params.id}/receive`, {}, config)
                }
            } else if (role === 'admin') {
                if (order.status === 'Dibayar') {
                    result = await API.patch(`/order/${params.id}/send`, {}, config)
                }
            }
            Swal.close()
            getData()
        } catch (error) {
            Swal.close()
            SwalFire('error', error.response.data.message)
            console.log(error);
        }
    }
    const getButtonTitle = () => {
        if (role === 'admin') {
            return 'Kirim Pesanan'
        } else {
            if (order.status === 'Belum Dibayar') {
                return 'Kirim'
            } else {
                return 'Terima Pesanan'
            }
        }
    }

    const getButtonDisable = () => {
        if (role === 'admin' && order.status === 'Dibayar') {
            return false
        }
        if (role === 'user') {
            if (order.status === 'Belum Dibayar' || order.status === 'Dikirim') {
                return false
            }
        }

        return true
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

                <CardBody className="py-5">
                    <CardTitle className="text-center mb-5 text-warning" tag="h5">
                        {order.status}
                    </CardTitle>
                    <div className="img-wrapper text-center">
                        {
                            imgPreview &&
                            <img
                                alt="Sample"
                                src={imgPreview}
                                style={{ width: '500px' }}
                                className="mx-auto"
                            />
                        }
                    </div>


                    {
                        role === 'admin'
                        &&
                        <div style={{width: '400px', marginBottom: '10px'}}>
                            Username : {order.user.username} <br />
                            Alamat : {order.user.address}
                        </div>
                    }
                    Tanggal : {order.createdAt} <br />
                    Total : Rp {order.total} <br /> <br />

                    <Form onSubmit={handleSubmit}>
                        {
                            (role === 'user' && order.status === 'Belum Dibayar')
                            &&
                            <FormGroup>
                                <p className="text-center mt-5 fs-6 fw-bold">Silahkan lakukan pembayaran</p>
                                <Label for="exampleEmail">
                                    Bukti Transfer
                                </Label>
                                <Input
                                    id="exampleEmail"
                                    name="transfer_proof"
                                    placeholder="Bukti Transfer"
                                    type="file"
                                    onChange={handleChangeImage}
                                />
                            </FormGroup>
                        }

                        <Button
                            type="submit" color="primary"
                            disabled={getButtonDisable()}
                        >
                            {getButtonTitle()}
                        </Button>
                    </Form>
                    <Table className="mt-5">
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
                            {order.order_item.map(item => <OrderDetailItem key={item.id} data={item} />)}
                            <tr>
                                <td></td><td></td><td></td>
                                <td>
                                    Rp {order.total}
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        </Layout>
    )
}

export default OrderDetail