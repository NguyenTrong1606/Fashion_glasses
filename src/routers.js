import React from "react"
import HomePage from "./components/home/HomePage"
import SearchProduct from "./components/products/SearchProduct"
import NotFoundAdmin from "./views/NotFoundAdmin"
import NotFound from "./views/NotFound"
import ShowProduct from "./components/products/ShowProduct"
import ShowProductByBrand from "./components/Brand/ShowProductByBrand"
import ShowProductByCategory from "./components/Category/ShowProductByCategory"
import RegisterForm from "./components/Customer/RegisterForm"
import LoginForm from "./components/Customer/LoginForm"
const routers = [
    {
        path: "/",
        exact: true,
        main: () => <HomePage/>,
    },
    {
        path: "/forbidden",
        exact: false,
        main: () => <NotFoundAdmin />,
        // main: () => <FetchUser />,
    },
    {
        path: "*",
        exact: true,
        main: () => <NotFound />,
    },
    {
        path: "/search/:search",
        exact: false,
        main: () => <SearchProduct />,
    },
    {
        path: "/product/:id_product",
        exact: false,
        main: () => <ShowProduct />,
    },
    {
        path: "/product/category/:id_category",
        exact: false,
        main: () => <ShowProductByCategory />,
    },
    {
        path: "/product/brand/:id_brand",
        exact: false,
        main: () => <ShowProductByBrand />,
    },
    {
        path: "/register",
        exact: false,
        main: () => <RegisterForm />,
    },
    {
        path: "/login",
        exact: false,
        main: () => <LoginForm/>,
    },

]


export default routers;