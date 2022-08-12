import axios from "axios"
import * as types from "../contains/types"

export const registerUser = async (registerForm) => {
    try {
        const response = await axios.post(
            "http://localhost:8000/api/v1/customer/",
            registerForm
        )
        if (response.status === 201)
            return await { ...response.data, status: response.status }
    } catch (error) {
        if (error.response.data) return error.response.data
        else return { message: error.message }
    }
}

export const loginUser = async (loginForm) => {
    try {
        const response = await axios.post(
            "http://localhost:8000/api/v1/account/login",
            loginForm
        )
        if (response.status === 200) {
            localStorage.setItem(
                types.LOCAL_STORAGE_TOKEN_NAME,
                response.data.accessToken
            )
            // setAuthToken(response.data.accessToken)
            return await { ...response.data, status: response.status }
        }
    } catch (error) {
        if (error.response.data) return error.response.data
        else return { message: error.message }
    }
}


