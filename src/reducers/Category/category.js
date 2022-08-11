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
            
    },
})


const listCategoryReducer = listCategory.reducer

export const listCategorySelector = (state) => state.listCategoryReducer.listCategory

export default listCategoryReducer