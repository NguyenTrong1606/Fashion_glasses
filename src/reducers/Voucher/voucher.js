import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { toastError, toastSuccess } from "../../Toast/Toast"
export const loadVoucherAccount = createAsyncThunk(
    "voucher-account/fetch",
    async () => {
        try {
            const response = await axios.get(
                `http://localhost:8000/api/v1/voucher/my-voucher`
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

const Voucher = createSlice({
    name: "voucher",
    initialState: {
        vouchers: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadVoucherAccount.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.vouchers = action.payload.data
                } else {
                    toastError(action.payload.message)
                }
            })
            
            
    },
})


const voucherReducer = Voucher.reducer

export const voucherSelector = (state) => state.voucherReducer.vouchers

export default voucherReducer