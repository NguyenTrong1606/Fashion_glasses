import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { loadUser } from "../../reducers/Account/LoginForm"
import { Route, Routes, Redirect } from "react-router-dom"
import * as types from "../.././contains/types"

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadUser())
    })

    return (
        <>
                <Route
                    {...rest}
                    render={(props) => {
                        if (localStorage[types.LOCAL_STORAGE_TOKEN_NAME]) {
                            return <Component {...rest} {...props} />
                        } else {
                            return <Redirect to="/login" />
                        }
                    }}
                />
            
        </>
    )
}
export default ProtectedRoute
