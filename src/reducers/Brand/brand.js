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

export const updateBrand = createAsyncThunk(
    "brand/update",
    async ({ id_brand, name_brand}) => {
        try {
            const response = await axios.put(
                `http://localhost:8000/api/v1/brand/edit/${id_brand}`,
                { name_brand }
            )
            if (response.status === 200) {
                return await { ...response.data, status: response.status }
            }
        } catch (error) {
            if (error.response.data) return error.response.data
            else return { message: error.message }
        }
    }
)

export const addBrand = createAsyncThunk(
    "brand/add",
    async (name_brand) => {
        try {
            const response = await axios.post(
                `http://localhost:8000/api/v1/brand/`,
                { name_brand }
            )
            if (response.status === 201) {
                return await { ...response.data, status: response.status }
            }
        } catch (error) {
            if (error.response.data) return error.response.data
            else return { message: error.message }
        }
    }
)

export const deleteBrand = createAsyncThunk(
    "brand/delete",
    async (id_brand) => {
        try {
            const response = await axios.delete(
                `http://localhost:8000/api/v1/brand/delete/${id_brand}`,
            )
            if (response.status === 200) {
                return await { ...response.data, status: response.status,id_brand: id_brand }
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
            .addCase(addBrand.fulfilled, (state, action) => {
                if (action.payload.status === 201) {
                    state.listBrand.unshift(action.payload.data)
                } else {
                    toastError(action.payload.message)
                }
            })
            .addCase(updateBrand.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.listBrand = state.listBrand.map(
                        (brand) => {
                            if (brand.id_brand === action.payload.data.id_brand) {
                                return action.payload.data
                            }else{
                                return brand
                            }
                            
                        }
                    )
                    toastSuccess(action.payload.message)
                } else {
                    toastError(action.payload.message)
                }
            })

            .addCase(deleteBrand.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    
                    state.listBrand = state.listBrand.filter(
                        (brand) =>
                            brand.id_brand !== action.payload.id_brand
                    )

                    toastSuccess(action.payload.message)
                } else {
                    toastError(action.payload.message)
                }
            })
            
    },
})


const listBrandReducer = listBrand.reducer

export const listBrandSelector = (state) => state.listBrandReducer.listBrand

export default listBrandReducer