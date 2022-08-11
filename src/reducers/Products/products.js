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

export const searchProduct = createAsyncThunk(
    "product/search",
    async (keyword) => {
        try {
            const response = await axios.get(
                `http://localhost:8000/api/v1/product?k=${keyword}`
            )
            if (response.status === 200) {
                return await {
                    ...response.data,
                    status: response.status,
                }
            }
        } catch (error) {
            if (error.response.data) return error.response.data
            else return { message: error.message }
        }
    }
)

export const fetchProductId = createAsyncThunk("products/id", async (id_product) => {
    try {
        const response = await axios.get(
            `http://localhost:8000/api/v1/product/${id_product}`
        )
        if (response.status === 200) {
            return await { ...response.data, status: response.status }
        }
    } catch (error) {
        if (error.response.data) return error.response.data
        else return { message: error.message }
    }
})

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
        searchProduct:[],
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
            .addCase(searchProduct.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.searchProduct = action.payload.data
                } else {
                }
            })
            .addCase(fetchProductId.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.product = action.payload.data
                } else {
                    toastError(action.payload.message)
                }
            })
            
    },
})


const productReducer = products.reducer

export const productsSelector = (state) => state.productReducer.products
export const searchProductSelector = (state) => state.productReducer.searchProduct
export const productDetailSelector = (state) => state.productReducer.product



export default productReducer