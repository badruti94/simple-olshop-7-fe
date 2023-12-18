import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { SwalLoading } from "../../../utils/swal-fire"
import { API } from "../../api"
import { updateTotalData } from "./paginationSlice"


export const getData = createAsyncThunk(
    'item/getData',
    async ({ page, perPage, search }, { dispatch }) => {
        const Swal = SwalLoading()
        const result = await API.get(`/item?page=${page}&perPage=${perPage}&search=${search}`)
        Swal.close()
        dispatch(updateTotalData(parseInt(result.data.total_data)))
        return result.data.data
    }
)

const initialState = {
    items: [],
    search: '',
}

export const itemSlice = createSlice({
    name: 'item',
    initialState,
    reducers: {
        setSearch: (state, action) => {
            state.search = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getData.fulfilled, (state, action) => {
            state.items = action.payload
        })
    }
})

export const { setSearch } = itemSlice.actions

export default itemSlice.reducer