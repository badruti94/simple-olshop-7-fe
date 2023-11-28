import { useNavigate } from "react-router-dom"
import { Button, Card, CardBody, CardImg, CardSubtitle, CardTitle, Col } from "reactstrap"
import { formatNumber } from '../../utils/format'

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
                    <CardTitle tag="h5" className="fs-6" style={{height: '60px'}}>
                        {name}
                    </CardTitle>
                    <CardSubtitle
                        className="text-muted"
                        tag="h6"
                    >
                        {formatNumber(price)}
                    </CardSubtitle>
                    <Button
                        className="mt-3"
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