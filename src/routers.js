import React from "react"
import HomePage from "./components/home/HomePage"
import SearchProduct from "./components/products/SearchProduct"
import NotFoundAdmin from "./views/NotFoundAdmin"
import NotFound from "./views/NotFound"
import ShowProduct from "./components/products/ShowProduct"
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
]


export default routers;