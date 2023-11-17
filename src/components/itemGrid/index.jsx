import { useNavigate } from "react-router-dom"
import { Button, Card, CardBody, CardImg, CardSubtitle, CardTitle, Col } from "reactstrap"

const ItemGrid = ({ data }) => {
    const { id, name, price, image } = data
    const navigate = useNavigate()
    
    return (
        <Col>
            <Card>
                <CardImg
                    alt="Card image cap"
                    src={image}
                    top
                    width="100%"
                />
                <CardBody>
                    <CardTitle tag="h5">
                        {name}
                    </CardTitle>
                    <CardSubtitle
                        className="mb-2 text-muted"
                        tag="h6"
                    >
                        Rp {price}
                    </CardSubtitle>
                    <Button
                        className="mt-4"
                        onClick={() => navigate('/item/' + id)}
                    >
                        Detail
                    </Button>
                </CardBody>
            </Card>
        </Col>
    )
}

export default ItemGrid