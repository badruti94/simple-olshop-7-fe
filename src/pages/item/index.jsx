import { Button, Card, CardBody, Table } from "reactstrap"
import Layout from "../../components/layout"
import { useEffect, useState } from "react"
import { API } from "../../config/api"
import ItemListTable from "../../components/itemListTable"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { SwalLoading } from '../../utils/swal-fire'
import PaginationComponent from "../../components/pagination"
import SearchForm from "../../components/searchForm"
import { updatePage, updateTotalData } from "../../config/redux/slice/paginationSlice"
import { getData, setSearch } from "../../config/redux/slice/itemSlice"

const Item = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { items, search } = useSelector(state => state.item)

    const { page, perPage } = useSelector(state => state.pagination)


    useEffect(() => {
        return () => {
            dispatch(updatePage(1))
        }
    }, [])

    useEffect(() => {
        try {
            dispatch(getData({ page, perPage, search }))
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
                    pageName='item'
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