import paginationReducer from "./paginationSlice";
import cartReducer from "./cartSlice";
import itemReducer from "./itemSlice";
import homeReducer from "./homeSlice";

const reducer = {
    pagination: paginationReducer,
    cart: cartReducer,
    item: itemReducer,
    home: homeReducer,
}

export default reducer