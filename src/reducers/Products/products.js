import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
//import * as types from "../../contains/types"
import { toastError, toastSuccess } from "../../Toast/Toast"

export const fetchAllProduct = createAsyncThunk(
    "products/all",
    async () => {
        try {
            const response = await axios.get(
                "http://localhost:8000/api/v1/product/all"
            )
            if (response.status === 200) {
                return await {...response.data, status: response.status }
                console.log(response.data)
            }
        } catch (error) {
            if (error.response.data) return error.response.data
            else return { message: error.message }
        }
    }
)

const products = createSlice({
    name: "products",
    initialState: {
        products: [],
        product: {
            id_product: 0,
            name_product: "",
            description: "",
            price: 0,
            discount: 0,
            quantity: 0,
            id_category: 0,
            date_discount_end: "",
            id_brand: "",
            images: []

        },
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProduct.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.products = action.payload.data
                } else {
                    toastError(action.payload.message)
                }
            })
            
    },
})


const productReducer = products.reducer

export const productsSelector = (state) => state.productReducer.products

export default productReducer