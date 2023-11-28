import { Button, Card, CardBody, Form, FormGroup, Input, Label } from "reactstrap"
import Layout from "../../components/layout"
import { useEffect, useState } from "react"
import { API, getConfig } from "../../config/api"
import { useNavigate, useParams } from "react-router-dom"
import {SwalLoading, SwalFire} from '../../utils/swal-fire'

const ItemAdd = () => {
    const navigate = useNavigate()

    const [item, setItem] = useState({
        name: '',
        price: '',
        stock: '',
        description: '',
        image: '',
    })
    const [imgPreview, setImgPreview] = useState(null)
    const [isEdit, setIsEdit] = useState(false)
    const params = useParams()

    useEffect(() => {
        const getData = async () => {
            const Swal = SwalLoading()

            const result = await API.get('/item/' + id)
            Swal.close()

            setItem(result.data.data.item)
            setImgPreview(result.data.data.item.image)
        }
        const { id } = params
        if (id) {
            setIsEdit(true)
            getData()
        }
    }, [])

    const handleChange = (e) => {
        setItem({ ...item, [e.target.name]: e.target.value })
    }
    const handleChangeImage = (e) => {
        setItem({ ...item, image: e.target.files[0] })
        setImgPreview(URL.createObjectURL(e.target.files[0]))
    }
    const handleSubmit = async (e) => {
        const Swal = SwalLoading()
        try {
            e.preventDefault()

            const formData = new FormData()
            formData.append('name', item.name)
            formData.append('price', item.price)
            formData.append('stock', item.stock)
            formData.append('description', item.description)
            formData.append('image', item.image)

            const config = await getConfig()

            let result;
            if (isEdit) {
                result = await API.put('/item/' + params.id, formData, config)
            } else {
                result = await API.post('/item', formData, config)
            }
            Swal.close()
            navigate('/item')

        } catch (error) {
            Swal.close()
            SwalFire('error', error.response.data.message)
            console.log(error);
        }
    }

    return (
        <Layout>
            <Card
                className="mx-auto"
                style={{ width: '50rem' }}
            >
                <CardBody
                >
                    <p className="text-center pb-4 fs-3 fw-bold"
                    >{isEdit ? 'Edit' : 'Add'} item</p>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="exampleEmail">
                                Name
                            </Label>
                            <Input
                                id="exampleEmail"
                                name="name"
                                value={item.name}
                                onChange={handleChange}
                                placeholder="Name"
                                type="text"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleEmail">
                                Price
                            </Label>
                            <Input
                                id="exampleEmail"
                                name="price"
                                value={item.price}
                                onChange={handleChange}
                                placeholder="Price"
                                type="number"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleEmail">
                                Stock
                            </Label>
                            <Input
                                id="exampleEmail"
                                name="stock"
                                value={item.stock}
                                onChange={handleChange}
                                placeholder="Stock"
                                type="number"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleEmail">
                                Description
                            </Label>
                            <Input
                                id="exampleEmail"
                                name="description"
                                value={item.description}
                                onChange={handleChange}
                                placeholder="Description"
                                type="textarea"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleEmail">
                                Image
                            </Label> <br />
                            {imgPreview && <img
                                alt="Sample"
                                src={imgPreview}
                                style={{ width: '300px' }}
                                className="mx-auto"
                            />}

                            <Input
                                id="exampleEmail"
                                name="image"
                                onChange={handleChangeImage}
                                placeholder="Image"
                                type="file"
                                className="mt-2"
                            />
                        </FormGroup>
                        <Button color="primary">
                            Submit
                        </Button>
                    </Form>
                </CardBody>
            </Card>

        </Layout>
    )
}

export default ItemAdd