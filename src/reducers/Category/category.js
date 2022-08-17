import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import setAuthToken from "../../utils/setAuthToken"
import * as types from "../.././contains/types"
import { toastError, toastSuccess } from "../../Toast/Toast"

export const fetchListCategory = createAsyncThunk(
    "category/list",
    async () => {
        try {
            const response = await axios.get(
                "http://localhost:8000/api/v1/category/list"
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

export const updateCategory = createAsyncThunk(
    "category/update",
    async ({ id_category, name_category}) => {
        try {
            const response = await axios.put(
                `http://localhost:8000/api/v1/category/edit/${id_category}`,
                { name_category }
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

export const addCategory = createAsyncThunk(
    "category/add",
    async (name_category) => {
        try {
            const response = await axios.post(
                `http://localhost:8000/api/v1/category/`,
                { name_category }
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

export const deleteCategory = createAsyncThunk(
    "category/delete",
    async (id_category) => {
        try {
            const response = await axios.delete(
                `http://localhost:8000/api/v1/category/delete/${id_category}`,
            )
            if (response.status === 200) {
                return await { ...response.data, status: response.status,id_category: id_category }
            }
        } catch (error) {
            if (error.response.data) return error.response.data
            else return { message: error.message }
        }
    }
)

const listCategory = createSlice({
    name: "listCategory",
    initialState: {
        listCategory: [],
        catrgory: {
            id_category: 0,
            name_category: "",
            
        },
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchListCategory.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.listCategory = action.payload.data
                } else {
                    toastError(action.payload.message)
                }
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                if (action.payload.status === 201) {
                    state.listCategory.unshift(action.payload.data)
                } else {
                    toastError(action.payload.message)
                }
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.listCategory = state.listCategory.map(
                        (category) => {
                            if (category.id_category === action.payload.data.id_category) {
                                return action.payload.data
                            }else{
                                return category
                            }
                            
                        }
                    )
                    toastSuccess(action.payload.message)
                } else {
                    toastError(action.payload.message)
                }
            })

            .addCase(deleteCategory.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    
                    state.listCategory = state.listCategory.filter(
                        (category) =>
                            category.id_category !== action.payload.id_category
                    )

                    toastSuccess(action.payload.message)
                } else {
                    toastError(action.payload.message)
                }
            })
            
    },
})


const listCategoryReducer = listCategory.reducer

export const listCategorySelector = (state) => state.listCategoryReducer.listCategory

export default listCategoryReducer