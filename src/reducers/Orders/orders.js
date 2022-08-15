import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { toastError, toastSuccess } from "../../Toast/Toast"
// export const loadorders = createAsyncThunk(
//     "review/fetch",
//     async (id_product) => {
//         try {
//             const response = await axios.get(
//                 `http://localhost:8000/api/v1/review/${id_product}/list-review`
//             )
//             if (response.status === 200) {
//                 return await { ...response.data, status: response.status }
//             }
//         } catch (error) {
//             if (error.response.data) return error.response.data
//             else return { message: error.message }
//         }
//     }
// )


export const addOrder = createAsyncThunk(
    "order/add",
    async ({id_voucher, address}) => {
        try {
            const response = await axios.post(
                `http://localhost:8000/api/v1/orders`,
                {id_voucher, address}
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



const Orders = createSlice({
    name: "orders",
    initialState: {
        orders: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // .addCase(loadReview.fulfilled, (state, action) => {
            //     if (action.payload.status === 200) {
            //         state.listReview = action.payload.data
            //     } else {
            //         toastError(action.payload.message)
            //     }
            // })
            // .addCase(loadStarReview.fulfilled, (state, action) => {
            //     if (action.payload.status === 200) {
            //         state.numberStar = action.payload.data
            //     } else {
            //         toastError(action.payload.message)
            //     }
            // })
            .addCase(addOrder.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    // state.listReview.unshift(action.payload.data)
                    toastSuccess(action.payload.message)
                } else {
                    toastError(action.payload.message)
                }
            })
            
    },
})


const ordersReducer = Orders.reducer

export const ordersSelector = (state) => state.ordersReducer.listOrders

export default ordersReducer