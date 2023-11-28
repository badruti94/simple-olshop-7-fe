import { Button, Card, CardBody, Table } from "reactstrap"
import Layout from "../../components/layout"
import { useEffect, useState } from "react"
import { API } from "../../config/api"
import ItemListTable from "../../components/itemListTable"
import { useDispatch, useSelector } from "react-redux"
import { updatePage, updateTotalData } from "../../config/redux/action"
import { useNavigate } from "react-router-dom"
import { SwalLoading } from '../../utils/swal-fire'
import PaginationComponent from "../../components/pagination"
import SearchForm from "../../components/searchForm"

const Item = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [items, setItems] = useState([])
    const [search, setSearch] = useState('')

    const { page, perPage } = useSelector(state => state.paginationReducer)


    const getData = async () => {
        const Swal = SwalLoading()
        const result = await API.get(`/item?page=${page}&perPage=${perPage}&search=${search}`)
        Swal.close()
        setItems(result.data.data)
        dispatch(updateTotalData(parseInt(result.data.total_data)))
    }

    useEffect(() => {
        return () => {
            dispatch(updatePage(1))
        }
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
                className="mx-auto"
                style={{ width: '50rem' }}
            >
                <SearchForm
                    search={search}
                    setSearch={setSearch}
                    getData={getData}
                />
                <CardBody
                >

                    <Button color="primary" onClick={() => navigate('/item/add')}>Add Item</Button>
                    <Table
                    >
                        <thead>
                            <tr>
                                <th>
                                    Name
                                </th>
                                <th>
                                    Price
                                </th>
                                <th>
                                    Stock
                                </th>
                                <th className="text-center">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                items
                                &&
                                items.map(item => <ItemListTable
                                    key={item.id}
                                    data={item}
                                    getData={getData}
                                />)
                            }
                        </tbody>
                    </Table>
                    <PaginationComponent />
                </CardBody>
            </Card>
        </Layout>
    )
}

export default Item