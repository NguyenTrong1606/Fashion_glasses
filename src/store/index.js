import { configureStore } from "@reduxjs/toolkit"
import productReducer from "../reducers/Products/products"
import listCategoryReducer from "../reducers/Category/category"
import listBrandReducer from "../reducers/Brand/brand"
import commentReducer from "../reducers/Comment/comment"
import reviewReducer from "../reducers/Review/review"
import loginReducer from "../reducers/Account/LoginForm"
import cartItemReducer from "../reducers/Cart/cart"
import voucherReducer from "../reducers/Voucher/voucher"
import ordersReducer from "../reducers/Orders/orders"


const store = configureStore({
    reducer: {
        productReducer,
        listCategoryReducer,
        listBrandReducer,
        commentReducer,
        reviewReducer,
        loginReducer,
        cartItemReducer,
        voucherReducer,
        ordersReducer,
        
    },
})

export default store
