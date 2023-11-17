import { Button } from "reactstrap"
import { API, getConfig } from "../../config/api"
import { SwalLoading } from '../../utils/swal-fire'


const CartItem = ({ data, getData }) => {
    const { id, qty, item } = data

    const handleAddMinus = async (type) => {
        const Swal = SwalLoading()
        try {
            const config = await getConfig()
            await API.patch(`/cart/${id}/${type}`,{}, config)
            Swal.close()
            getData()
        } catch (error) {
            Swal.close()
            console.log(error);
        }
    }

    return (
        <tr>
            <td>
                {item.name}
            </td>
            <td>
                Rp {item.price}
            </td>
            <td className="d-flex gap-3">
                <Button onClick={() => handleAddMinus('minus')}>-</Button>
                {qty}
                <Button onClick={() => handleAddMinus('plus')}>+</Button>
            </td>
            <td>
                Rp {item.price * qty}
            </td>
        </tr>
    )
}

export default CartItem