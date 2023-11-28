import { useDispatch } from 'react-redux'
import { Button, CardBody, Col, Form, Input, Row } from 'reactstrap'
import { updatePage } from '../../config/redux/action'

const SearchForm = (props) => {
    const { search, setSearch, getData } = props
    const dispatch = useDispatch()


    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(updatePage(1))
        getData()
        
    }

    return (
        <CardBody>
            <Form onSubmit={handleSubmit}>
                <Row className="row-cols-lg-auto g-3 align-items-center">
                    <Col>
                        <Input
                            id="search"
                            name="search"
                            placeholder="Search....."
                            type="text"
                            style={{ width: '400px' }}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </Col>
                    <Col>
                        <Button type='submit'>
                            Search
                        </Button>
                    </Col>
                </Row>
            </Form>
        </CardBody>
    )
}

export default SearchForm