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
                
            }
        } catch (error) {
            if (error.response.data) return error.response.data
            else return { message: error.message }
        }
    }
)

export const fetchRandomProduct = createAsyncThunk(
    "products/random",
    async () => {
        try {
            const response = await axios.get(
                "http://localhost:8000/api/v1/product/random"
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

export const loadProductByBrand = createAsyncThunk(
    "product/brand",
    async (id_brand) => {
        try {
            const response = await axios.get(
                `http://localhost:8000/api/v1/product/brand/${id_brand}`
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

export const filterProduct = createAsyncThunk(
    "product/category/brand",
    async ({id_category, id_brand}) => {
        try {
            const response = await axios.get(
                `http://localhost:8000/api/v1/product/category/${id_category}/brand/${id_brand}`
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

export const loadProductByCategory = createAsyncThunk(
    "product/catrgory",
    async (id_category) => {
        try {
            const response = await axios.get(
                `http://localhost:8000/api/v1/product/category/${id_category}`
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

export const deleteProduct = createAsyncThunk("delete/product", async (id_product) => {
    try {
        const response = await axios.delete(
            `http://localhost:8000/api/v1/product/delete/${id_product}`
        )
        if (response.status === 200) {
            return await { ...response.data, status: response.status, id_product: id_product }
        }
    } catch (error) {
        if (error.response.data) return error.response.data
        else return { message: error.message }
    }
})

export const addProduct = createAsyncThunk("add/product", async (FormProduct) => {
    try {
        const response = await axios.post(
            `http://localhost:8000/api/v1/product/`,
            FormProduct
        )
        if (response.status === 200) {
            return await { ...response.data, status: response.status}
        }
    } catch (error) {
        if (error.response.data) return error.response.data
        else return { message: error.message }
    }
})

export const updateProduct = createAsyncThunk("update/product", 
    async (data) => {
    try {
        const id_product = data.id_product
        const name_product = data.name_product
        const price = data.price
        const description = data.description
        const quantity = data.quantity
        const discount = data.discount
        const date_discount_end = data.date_discount_end

        const response = await axios.put(
            `http://localhost:8000/api/v1/product/${id_product}`,
            {name_product,
                price,
                description,
                quantity,
                discount,
                date_discount_end}
        )
        if (response.status === 200) {
            return await { ...response.data, status: response.status}
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
        productRandom:[],
        filterProduct:[],
        router: "",
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
            category:"",
            brand:"",
            images: []

        },
        searchProduct:[],
    },
    reducers: {
        setRouter(state, action){
            state.router = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProduct.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.products = action.payload.data
                } else {
                    toastError(action.payload.message)
                }
            })
            .addCase(loadProductByBrand.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.products = action.payload.data
                } else {
                    toastError(action.payload.message)
                }
            })
            .addCase(loadProductByCategory.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.products = action.payload.data
                } else {
                    toastError(action.payload.message)
                }
            })
            .addCase(fetchRandomProduct.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.productRandom = action.payload.data
                } else {
                    toastError(action.payload.message)
                }
            })
            .addCase(filterProduct.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.filterProduct = action.payload.data
                } else {
                    toastError(action.payload.message)
                }
            })
            .addCase(searchProduct.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.products = action.payload.data
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
            .addCase(deleteProduct.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.products = state.products.filter(
                        (product) =>
                            product.id_product !== action.payload.id_product
                    )

                    toastSuccess(action.payload.message)
                } else {
                    toastError(action.payload.message)
                }
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.products.unshift(action.payload.data.product)
                    toastSuccess(action.payload.message)
                } else {
                    toastError(action.payload.message)
                }
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    
                    state.products = state.products.map(
                        (product) => {
                            if (product.id_product === action.payload.data.id_product) {
                                return action.payload.data
                            }else{
                                return product
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


const productReducer = products.reducer

export const productsSelector = (state) => state.productReducer.products
export const productRandomSelector = (state) => state.productReducer.productRandom
export const filterProductSelector = (state) => state.productReducer.filterProduct
// export const searchProductSelector = (state) => state.productReducer.searchProduct
export const productDetailSelector = (state) => state.productReducer.product
export const routerDetailSelector = (state) => state.productReducer.router

export const {setRouter} = products.actions

export default productReducer