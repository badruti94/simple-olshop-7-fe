import { useNavigate } from "react-router-dom"
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap"
import { formatDate, formatNumber } from "../../utils/format"

const OrderItem = ({ data }) => {
    const { id, createdAt, total, status } = data
    const navigate = useNavigate()

    const role = localStorage.getItem('role')

    const getTitle = () => role === 'admin' ? data.user.username : status

    const getSubtitle = () => {
        if (role === 'admin') {
            return `Status: ${status}. Total : ${total}`
        } else {
            return formatNumber(total)
        }
    }

    return (
        <Card
            className="mx-auto mb-3"
            style={{ maxWidth: '800px' }}>
            <CardBody>
                <CardTitle tag="h5" className="text-warning">
                    {getTitle()}
                </CardTitle>
                <CardSubtitle
                    className="mb-2 text-muted"
                    tag="h6"
                >
                    {getSubtitle()}
                </CardSubtitle>
                <CardText>
                    {formatDate(createdAt)}
                </CardText>
                <Button onClick={() => navigate('/order/' + id)} color="primary">Detail</Button>
            </CardBody>
        </Card>
    )
}

export default OrderItem