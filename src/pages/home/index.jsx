import { Card, Row } from "reactstrap"
import Layout from "../../components/layout"
import ItemGrid from "../../components/itemGrid"
import SearchForm from "../../components/searchForm"
import PaginationComponent from "../../components/pagination"
import { useEffect, useState } from "react"
import { API } from '../../config/api'
import { useDispatch, useSelector } from "react-redux"
import { SwalLoading } from '../../utils/swal-fire'
import { updatePage, updateTotalData } from "../../config/redux/slice/paginationSlice"
import { getData } from "../../config/redux/slice/homeSlice"


const Home = () => {
    const dispatch = useDispatch()
    const { items, search } = useSelector(state => state.home)
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
                className="mx-auto mb-5"
                style={{ maxWidth: '600px' }}
            >

                <SearchForm
                    pageName='home'
                />
            </Card>
            <Row className="row-cols-2 row-cols-md-4 g-4">
                {items && items.map(item => <ItemGrid key={item.id} data={item} />)}

            </Row>

            <PaginationComponent />

        </Layout>
    )
}

export default Home