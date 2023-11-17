import { Button, Card, CardBody, Form, FormGroup, Input, Label } from "reactstrap"
import Layout from "../../components/layout"
import { useState } from "react"
import { API } from "../../config/api"
import { SwalFire, SwalLoading } from "../../utils/swal-fire"

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        name: '',
        phone_number: '',
        address: '',
        password: '',
    })
    const [isSuccess, setIsSuccess] = useState({ visible: false, message: '' })
    const [isError, setIsError] = useState({ visible: false, message: '' })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        const Swal = SwalLoading()
        try {
            e.preventDefault()
            const result = await API.post('/auth/register', formData)
            Swal.close()
            
            SwalFire('success', result.data.message)

        } catch (error) {
            Swal.close()
            SwalFire('error', error.response.data.message)
        }
    }
    
    return (
        <Layout>
            <Card
                body
                className="mx-auto"
                style={{ width: '35rem' }}
            >
                <CardBody>
                    <p className="text-center pb-4 fs-3 fw-bold"
                    >Register</p>
                    <Form onSubmit={handleSubmit} >
                        <FormGroup>
                            <Label for="exampleEmail">
                                Username
                            </Label>
                            <Input
                                id="exampleEmail"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Username"
                                type="text"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleEmail">
                                Email
                            </Label>
                            <Input
                                id="exampleEmail"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                type="email"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleEmail">
                                Name
                            </Label>
                            <Input
                                id="exampleEmail"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Name"
                                type="text"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleEmail">
                                Phone Number
                            </Label>
                            <Input
                                id="exampleEmail"
                                name="phone_number"
                                value={formData.phone_number}
                                onChange={handleChange}
                                placeholder="Phone Number"
                                type="text"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleEmail">
                                Address
                            </Label>
                            <Input
                                id="exampleEmail"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Address"
                                type="textarea"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePassword">
                                Password
                            </Label>
                            <Input
                                id="examplePassword"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                                type="password"
                            />
                        </FormGroup>
                        <Button color="primary">
                            Register
                        </Button>
                    </Form>
                </CardBody>
            </Card>
        </Layout>
    )
}

export default Register