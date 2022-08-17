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
import ShowCart from "./components/Cart/cart"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"
import ProtectedRouteAdmin from "./components/ProtectedRoute/ProtectedRouteAdmin"
import ShowMyOrders from "./components/Orders/Orders"
import UpdateInforCustomer from "./components/Customer/UpdateInforCustomer"
import UpdateInforEmployee from "./components/Employee/UpdateInforEmployee"
import ChangePassword from "./components/Account/ChangePassword"
import ProtectedRouteEmployee from "./components/ProtectedRoute/ProtectedRouteEmployee"
import ProtectedRouteCustomer from "./components/ProtectedRoute/ProtectedRouteCustomer"
import HomeEmployee from "./components/Employee/HomeEmployee"
import OrdersComplete from "./components/Employee/OrderComplete"
import SearchOrderbySDT from "./components/Employee/SearchOrderBySDT"
import LoadOrderComplete from "./components/Employee/LoadOrderComplete"
import RegisterEmployeeForm from "./components/Employee/RegisterEmployeeForm"
import ManageAccount from "./components/Employee/ManageAccount"
import ManageCategory from "./components/Employee/ManageCategory"
import ManageBrand from "./components/Employee/ManageBrand"
const routers = [
    {
        path: "/",
        exact: true,
        main: () => <HomePage/>,
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
    {
        path: "/update/customer",
        exact: false,
        main: () => <ProtectedRouteCustomer component={UpdateInforCustomer} />,
    },
    {
        path: "/update/employee",
        exact: false,
        main: () => <ProtectedRouteEmployee component={UpdateInforEmployee} />,
    },
    {
        path: "/employee/category",
        exact: false,
        main: () => <ProtectedRouteEmployee component={ManageCategory} />,
    },
    {
        path: "/employee/brand",
        exact: false,
        main: () => <ProtectedRouteEmployee component={ManageBrand} />,
    },
    {
        path: "/employee/home",
        exact: false,
        main: () => <ProtectedRouteEmployee component={HomeEmployee} />,
    },
    {
        path: "/employee/orders/search/:phone_number",
        exact: false,
        main: () => <ProtectedRouteEmployee component={SearchOrderbySDT} />,
    },
    {
        path: "/employee/order/complete/:year/:month",
        exact: false,
        main: () => <ProtectedRouteEmployee component={LoadOrderComplete} />,
    },
    {
        path: "/change/password",
        exact: false,
        main: () => <ProtectedRoute component={ChangePassword} />,
    },
    {
        path: "/manage/account/register",
        exact: false,
        main: () => <ProtectedRouteAdmin component={ManageAccount} />,
    },
    {
        path: "/cart",
        exact: false,
        main: () => <ProtectedRoute component={ShowCart}/>,
        // main: () => <ShowCart/>,
    },
    {
        path: "/account/my-order",
        exact: false,
        main: () => <ProtectedRoute component={ShowMyOrders}/>,
        // main: () => <ShowMyOrders/>,
    },
    {
        path: "/forbidden",
        exact: false,
        main: () => <NotFoundAdmin />,
        // main: () => <FetchUser />,
    },
    {
        path: "/*",
        exact: true,
        main: () => <NotFound />,
    },

]




export default routers;