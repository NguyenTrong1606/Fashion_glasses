import React from "react"
import HomePage from "./components/home/HomePage"
import NotFoundAdmin from "./views/NotFoundAdmin"
import NotFound from "./views/NotFound"

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
    }
]


export default routers;