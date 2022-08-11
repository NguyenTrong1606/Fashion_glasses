import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import setAuthToken from "../../utils/setAuthToken"
import * as types from "../.././contains/types"
import { toastError, toastSuccess } from "../../Toast/Toast"

export const fetchListBrand = createAsyncThunk(
    "brand/list",
    async () => {
        try {
            const response = await axios.get(
                "http://localhost:8000/api/v1/brand/list"
            )
            if (response.status === 200) {
                return await {...response.data, status: response.status }
            }
        } catch (error) {
            if (error.response.data) return error.response.data
            else return { message: error.message }
        }
    }
)

const listBrand = createSlice({
    name: "listBrand",
    initialState: {
        listBrand: [],
        catrgory: {
            id_brand: 0,
            name_brand: "",
            
        },
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchListBrand.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.listBrand = action.payload.data
                } else {
                    toastError(action.payload.message)
                }
            })
            
    },
})


const listBrandReducer = listBrand.reducer

export const listBrandSelector = (state) => state.listBrandReducer.listBrand

export default listBrandReducer