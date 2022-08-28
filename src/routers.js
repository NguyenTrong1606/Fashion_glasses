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
import ManageProduct from "./components/Employee/ManageProduct"
import ManageVoucher from "./components/Employee/ManageVoucher"
import ForgotPassword from "./components/Account/ForgotPassword"
import EnterCode from "./components/Account/EnterCode"
import EnterNewPassword from "./components/Account/EnterNewPassword"
import FilterProduct from "./components/Filter/Filter"
import SearchOrderbyMaOrder from "./components/Employee/SearchOrderByMaOrder"
import SearchOrderbyStatus from "./components/Employee/OrderByStatus"
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
        path: "/category/:id_category/product",
        exact: false,
        main: () => <ShowProductByCategory />,
    },
    {
        path: "/brand/:id_brand/product",
        exact: false,
        main: () => <ShowProductByBrand />,
    },
    {
        path: "/category/:id_category/brand/:id_brand/filter",
        exact: false,
        main: () => <FilterProduct />,
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
        path: "/forgot/password",
        exact: false,
        main: () => <ForgotPassword />,
        // main: () => <ProtectedRoute component={ForgotPassword} />,
    },
    {
        path: "/forgot/code",
        exact: false,
        main: () => <EnterCode />,
    },
    {
        path: "/forgot/change",
        exact: false,
        main: () => <EnterNewPassword />,
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
        path: "/employee/voucher",
        exact: false,
        main: () => <ProtectedRouteEmployee component={ManageVoucher} />,

    },
    {
        path: "/employee/product",
        exact: false,
        main: () => <ProtectedRouteEmployee component={ManageProduct} />,
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
        path: "/employee/orders/search/SDT/:phone_number",
        exact: false,
        main: () => <ProtectedRouteEmployee component={SearchOrderbySDT} />,
    },
    {
        path: "/employee/orders/search/MaHD/:id_order",
        exact: false,
        main: () => <ProtectedRouteEmployee component={SearchOrderbyMaOrder} />,
    },
    {
        path: "/employee/order/complete",
        exact: false,
        main: () => <ProtectedRouteEmployee component={LoadOrderComplete} />,
    },
    {
        path: "/employee/order/status/:status",
        exact: false,
        main: () => <ProtectedRouteEmployee component={SearchOrderbyStatus} />,
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