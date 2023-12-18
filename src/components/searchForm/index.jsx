import { useDispatch, useSelector } from 'react-redux'
import { Button, CardBody, Col, Form, Input, Row } from 'reactstrap'
import { updatePage } from '../../config/redux/slice/paginationSlice'
import { getData as getDataItem, setSearch as setSearchItem } from '../../config/redux/slice/itemSlice'
import { getData as getDataHome, setSearch as setSearchHome} from '../../config/redux/slice/homeSlice'

const SearchForm = ({ pageName }) => {
    const { search } = useSelector(state => state[pageName])
    const { page, perPage } = useSelector(state => state.pagination)
    const dispatch = useDispatch()

    let getData;
    let setSearch;

    switch (pageName) {
        case 'home':
            getData = getDataHome
            setSearch = setSearchHome
            break;
        case 'item':
            getData = getDataItem
            setSearch = setSearchItem
            break;
        default:
            break;
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(updatePage(1))
        dispatch(getData({ page, perPage, search }))
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
                            onChange={(e) => dispatch(setSearch(e.target.value))}
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