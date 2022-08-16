import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadUser, userSelector } from "../../reducers/Account/LoginForm"
import { Route, Redirect } from "react-router-dom"
import * as types from "../.././contains/types"

const ProtectedRouteCustomer = ({ component: Component, ...rest }) => {
    const dispatch = useDispatch()
    const user = useSelector(userSelector)

    useEffect(() => {
        dispatch(loadUser())
    })

    return (
        <>
            <Route
                {...rest}
                render={(props) => {
                    if (
                        localStorage[types.LOCAL_STORAGE_TOKEN_NAME] &&
                        user.role === 0
                    ) {
                        console.log(user.role)
                        console.log(typeof user.role)

                        return <Component {...rest} {...props} />
                    } else {
                        return <Redirect to="/forbidden" />
                    }
                }}
            />
        </>
    )
}

export default ProtectedRouteCustomer
