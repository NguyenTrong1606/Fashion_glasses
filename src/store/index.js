import { configureStore } from "@reduxjs/toolkit"
import productReducer from "../reducers/Products/products"
import listCategoryReducer from "../reducers/Category/category"
import listBrandReducer from "../reducers/Brand/brand"
import commentReducer from "../reducers/Comment/comment"


const store = configureStore({
    reducer: {
        productReducer,
        listCategoryReducer,
        listBrandReducer,
        commentReducer,
        
    },
})

export default store
