import { Card, Row } from "reactstrap"
import Layout from "../../components/layout"
import ItemGrid from "../../components/itemGrid"
import SearchForm from "../../components/searchForm"
import PaginationComponent from "../../components/pagination"
import { useEffect, useState } from "react"
import { API } from '../../config/api'
import { useDispatch, useSelector } from "react-redux"
import { SwalLoading } from '../../utils/swal-fire'
import { updatePage, updateTotalData } from "../../config/redux/action"


const Home = () => {
    const dispatch = useDispatch()
    const [items, setItems] = useState([])
    // const [page, setPage] = useState(1)
    // const [totalData, setTotalData] = useState(0)
    // const [perPage, setPerPage] = useState(4)
    const { page, perPage} = useSelector(state => state.paginationReducer)


    const getData = async () => {
        const Swal = SwalLoading()

        const result = await API.get(`/item?page=${page}perPage=${perPage}`)
        Swal.close()
        setItems(result.data.data)
        // setTotalData(result.data.total_data)
        dispatch(updateTotalData(parseInt(result.data.total_data)))

    }

    useEffect(() => {
        dispatch(updatePage(1))
    }, [])
    useEffect(() => {
        try {
            getData()
        } catch (error) {
            console.log(error);
        }
    }, [page])
    return (
        <Layout>
            <Card
                className="mx-auto mb-5"
                style={{ maxWidth: '600px' }}
            >

                <SearchForm />
            </Card>
            <Row className="row-cols-2 row-cols-md-4 g-4">
                {items && items.map(item => <ItemGrid key={item.id} data={item} />)}

            </Row>

            <PaginationComponent />

        </Layout>
    )
}

export default Home