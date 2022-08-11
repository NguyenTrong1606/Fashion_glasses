import { configureStore } from "@reduxjs/toolkit"
import productReducer from "../reducers/Products/products"
import listCategoryReducer from "../reducers/Category/category"
import listBrandReducer from "../reducers/Brand/brand"


const store = configureStore({
    reducer: {
        productReducer,
        listCategoryReducer,
        listBrandReducer,
        
    },
})

export default store
