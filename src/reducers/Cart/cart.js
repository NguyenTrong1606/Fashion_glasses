import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { toastError, toastSuccess } from "../../Toast/Toast"

export const loadItems = createAsyncThunk(
    "item/fetch",
    async () => {
        try {
            const response = await axios.get(
                `http://localhost:8000/api/v1/cart`
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

export const loadItem = createAsyncThunk(
    "getItem",
    async (id_product) => {
        try {
            const response = await axios.get(
                `http://localhost:8000/api/v1/cart/${id_product}`
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

export const addItemCart = createAsyncThunk(
    "item/add",
    async ({ id_product, quantity }) => {
        try {
            const response = await axios.post(
                `http://localhost:8000/api/v1/cart/${id_product}/${quantity}`,
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
export const deleteItem = createAsyncThunk(
    "item/delete",
    async ({ id_product }) => {
        try {
            const response = await axios.delete(
                `http://localhost:8000/api/v1/cart/${id_product}/delete`
            )
            if (response.status === 200) {
                return await {
                    ...response.data,
                    status: response.status,
                    id_product: id_product,
                }
            }
        } catch (error) {
            if (error.response.data) return error.response.data
            else return { message: error.message }
        }
    }
)

export const updateItem = createAsyncThunk(
    "item/update",
    async ({ id_product, quantity }) => {
        try {
            const response = await axios.put(
                `http://localhost:8000/api/v1/cart/${id_product}/${quantity}`,
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

const cartItem = createSlice({
    name: "cartItem",
    initialState: {
        items: [],
        item:{
        id_item: 0,
        id_product: 0,
        id_cart: 0,
        quantity: 0,
        product: {
            id_product: 0,
            name_product: "",
            description: "",
            price: 0,
            discount: 0,
            quantity: 0,
            id_category: 0,
            date_discount_end: "",
            id_brand: 0,
            imh:""
        }
        }
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadItems.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.items = action.payload.data
                } else {
                }
            })
            .addCase(loadItem.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.item = action.payload.data
                } else {
                }
            })
    
            .addCase(addItemCart.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    toastSuccess(action.payload.message)    
                } else {
                    toastError(action.payload.message)
                }
            })
            .addCase(updateItem.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.items = state.items.map(
                        (item) => {
                            if (item.id_product === action.payload.data.id_product) {
                                return action.payload.data
                            }else{
                                return item
                            }
                            
                        }
                    )
                    toastSuccess(action.payload.message) 
                } else {
                    toastError(action.payload.message)
                }
            })
            .addCase(deleteItem.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.items = state.items.filter(
                        (item) =>
                            item.id_item !== action.payload.id_item &&
                            item.id_product !== action.payload.id_product &&
                            item.id_cart !== action.payload.id_cart 
                    )
                    toastSuccess(action.payload.message)
                } else {
                    toastError(action.payload.message)
                }
            })
    
     },
})

const cartItemReducer = cartItem.reducer
export const listItemsSelector = (state) => state.cartItemReducer.items
export const cartItemSelector = (state) => state.cartItemReducer.item

export default cartItemReducer