import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { SwalFire, SwalLoading } from "../../../utils/swal-fire"
import { API, getConfig } from "../../api"

export const getData = createAsyncThunk(
    'cart/getData',
    async () => {
        const Swal = SwalLoading()
        try {
            const config = await getConfig()
            const result = await API.get('/cart', config)
            Swal.close()
            return result.data.data
        } catch (error) {
            Swal.close()
            SwalFire('error', error.response.data.message)
            console.log(error);
        }
    }
)

const initialState = {
    items: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getData.fulfilled, (state, action) => {
            state.items = action.payload
        })
    }
})

export default cartSlice.reducer