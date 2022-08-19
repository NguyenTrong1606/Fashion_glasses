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

export const loadVoucherCollect = createAsyncThunk(
    "voucher-collect/fetch",
    async () => {
        try {
            const response = await axios.get(
                `http://localhost:8000/api/v1/voucher/list-voucher`
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

export const loadAllVoucherAccount = createAsyncThunk(
    "voucher-account/all",
    async () => {
        try {
            const response = await axios.get(
                `http://localhost:8000/api/v1/voucher/my-voucher/all`
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

export const loadAllVoucher= createAsyncThunk(
    "voucher/all",
    async () => {
        try {
            const response = await axios.get(
                `http://localhost:8000/api/v1/voucher/all`
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



export const deleteVoucher = createAsyncThunk("delete/voucher", async (id_voucher) => {
    try {
        const response = await axios.delete(
            `http://localhost:8000/api/v1/voucher/delete/${id_voucher}`
        )
        if (response.status === 200) {
            return await { ...response.data, status: response.status, id_voucher: id_voucher }
        }
    } catch (error) {
        if (error.response.data) return error.response.data
        else return { message: error.message }
    }
})

export const addVoucher = createAsyncThunk("add/voucher", async (FormVoucher) => {
    try {
        const response = await axios.post(
            `http://localhost:8000/api/v1/voucher/`,
            FormVoucher
        )
        if (response.status === 200) {
            return await { ...response.data, status: response.status}
        }
    } catch (error) {
        if (error.response.data) return error.response.data
        else return { message: error.message }
    }
})

export const addVoucherAccount = createAsyncThunk("add/voucher-account", async (id_voucher) => {
    try {
        const response = await axios.post(
            `http://localhost:8000/api/v1/account_voucher/${id_voucher}`,
        )
        if (response.status === 200) {
            return await { ...response.data, status: response.status, id_voucher:id_voucher}
        }
    } catch (error) {
        if (error.response.data) return error.response.data
        else return { message: error.message }
    }
})

export const updateVoucher = createAsyncThunk("update/product", 
    async (data) => {
    try {
        const id_voucher = data.id_voucher
        const quantity = data.quantity
        const description = data.description
        
        

        const response = await axios.put(
            `http://localhost:8000/api/v1/voucher/${id_voucher}`,
            {quantity, description}
        )
        if (response.status === 200) {
            return await { ...response.data, status: response.status}
        }
    } catch (error) {
        if (error.response.data) return error.response.data
        else return { message: error.message }
    }
})



const Voucher = createSlice({
    name: "voucher",
    initialState: {
        vouchers: [],
        vouchersCollect:[]
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
            .addCase(loadVoucherCollect.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.vouchersCollect = action.payload.data
                } else {
                    toastError(action.payload.message)
                }
            })
            .addCase(loadAllVoucherAccount.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.vouchers = action.payload.data
                } else {
                    toastError(action.payload.message)
                }
            })
            .addCase(loadAllVoucher.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.vouchers = action.payload.data
                } else {
                    toastError(action.payload.message)
                }
            })
            .addCase(deleteVoucher.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.vouchers = state.vouchers.filter(
                        (voucher) =>
                            voucher.id_voucher !== action.payload.id_voucher
                    )

                    toastSuccess(action.payload.message)
                } else {
                    toastError(action.payload.message)
                }
            })
            .addCase(addVoucher.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.vouchers.unshift(action.payload.data)
                    toastSuccess(action.payload.message)
                } else {
                    toastError(action.payload.message)
                }
            })
            .addCase(addVoucherAccount.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.vouchersCollect = state.vouchersCollect.filter(
                        (voucher) =>
                            voucher.id_voucher !== action.payload.id_voucher
                    )
                    toastSuccess(action.payload.message)
                } else {
                    toastError(action.payload.message)
                }
            })
            .addCase(updateVoucher.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    
                    state.vouchers = state.vouchers.map(
                        (voucher) => {
                            if (voucher.id_voucher === action.payload.data.id_voucher) {
                                return action.payload.data
                            }else{
                                return voucher
                            }
                            
                        }
                    )
                    toastSuccess(action.payload.message)
                } else {

                    toastError(action.payload.message)
                }

            })

            
            
    },
})


const voucherReducer = Voucher.reducer

export const voucherSelector = (state) => state.voucherReducer.vouchers
export const voucherCollectSelector = (state) => state.voucherReducer.vouchersCollect

export default voucherReducer