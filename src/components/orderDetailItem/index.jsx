const OrderDetailItem = ({data}) => {
    const {qty, item} = data
    return (
        <tr>
            <td>
                {item.name}
            </td>
            <td>
                Rp {item.price}
            </td>
            <td className="d-flex gap-3">
                {qty}
            </td>
            <td>
                Rp {item.price * qty}
            </td>
        </tr>
    )
}

export default OrderDetailItem