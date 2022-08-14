import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { toastError, toastSuccess } from "../../Toast/Toast"
export const loadReview = createAsyncThunk(
    "review/fetch",
    async (id_product) => {
        try {
            const response = await axios.get(
                `http://localhost:8000/api/v1/review/${id_product}/list-review`
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
export const loadStarReview = createAsyncThunk(
    "starReview/fetch",
    async (id_product) => {
        try {
            const response = await axios.get(
                `http://localhost:8000/api/v1/review/${id_product}/number-star`
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

export const addReview = createAsyncThunk(
    "review/add",
    async ({id_product,star_number,content}) => {
        try {
            const response = await axios.post(
                `http://localhost:8000/api/v1/review/${id_product}`,
                 {star_number,content}
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



const listReview = createSlice({
    name: "listReview",
    initialState: {
        listReview: [],
        review: {
            id_review: 0,
            id_product: 0,
            id_account: 0,
            content: "",
            star_number: 0,
            day: "",
            time: "",
            account: {
                id_account: 0,
                account_name: "",
                role: 0,
                status: 0
            }
            
        },
        numberStar: 0,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadReview.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.listReview = action.payload.data
                } else {
                    toastError(action.payload.message)
                }
            })
            .addCase(loadStarReview.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.numberStar = action.payload.data
                } else {
                    toastError(action.payload.message)
                }
            })
            .addCase(addReview.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.listReview.unshift(action.payload.data)
                    toastSuccess(action.payload.message)
                } else {
                    toastError(action.payload.message)
                }
            })
            
    },
})


const reviewReducer = listReview.reducer

export const reviewSelector = (state) => state.reviewReducer.listReview
export const starReviewSelector = (state) => state.reviewReducer.numberStar

export default reviewReducer