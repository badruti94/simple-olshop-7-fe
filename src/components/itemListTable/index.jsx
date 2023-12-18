import 'react-confirm-alert/src/react-confirm-alert.css';
import { useNavigate } from "react-router-dom"
import { Button } from "reactstrap"
import { API, getConfig } from "../../config/api"
import { confirmAlert } from 'react-confirm-alert';
import { SwalFire, SwalLoading } from '../../utils/swal-fire';
import { formatNumber } from '../../utils/format'
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../../config/redux/slice/itemSlice';

const ItemListTable = ({ data }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { search } = useSelector(state => state.item)
    const { page, perPage } = useSelector(state => state.pagination)



    const { id, name, price, stock } = data
    const handleEdit = async () => {
        try {
            navigate('/item/edit/' + id)
        } catch (error) {
            console.log(error);
        }
    }
    const handleDelete = async () => {

        const deleteItem = async () => {
            const Swal = SwalLoading()
            try {
                const config = await getConfig()
                const result = await API.delete('/item/' + id, config)
                Swal.close()
                SwalFire('success', result.data.message)
                setTimeout(() => {
                    dispatch(getData({ page, perPage, search }))
                }, 500);
            } catch (error) {
                Swal.close()
                SwalFire('error', error.response.data.message)
            }

        }

        const options = {
            title: 'Delete Item',
            message: 'Are you sure want to delete this item?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: deleteItem
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ],
            closeOnEscape: true,
            closeOnClickOutside: true,
            keyCodeForClose: [8, 32],
            overlayClassName: "overlay-custom-class-name"
        };

        confirmAlert(options);

    }
    const handleDetail = async () => {
        try {
            navigate('/item/' + id)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <tr>
            <td>
                {name}
            </td>
            <td>
                {formatNumber(price)}
            </td>
            <td>
                {stock}
            </td>
            <td className="text-center" >
                <Button onClick={handleEdit} className="me-2" color="warning" >Edit</Button>
                <Button onClick={handleDelete} className="me-2" color="danger">Delete</Button>
                <Button onClick={handleDetail} className="me-2" color="primary">Detail</Button>
            </td>
        </tr>
    )
}

export default ItemListTable