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

export const updateinforCustomer = async (updateForm) => {
    try {
        const response = await axios.put(
            `http://localhost:8000/api/v1/customer/change-infor`,
            updateForm
        )
        if (response.status === 200) {
            return await { ...response.data, status: response.status }
        }
    } catch (error) {
        if (error.response.data) return error.response.data
        else return { message: error.message }
    }
}

export const updateinforEmployee = async (updateForm) => {
    try {
        const response = await axios.put(
            `http://localhost:8000/api/v1/Employee/change-infor`,
            updateForm
        )
        if (response.status === 200) {
            return await { ...response.data, status: response.status }
        }
    } catch (error) {
        if (error.response.data) return error.response.data
        else return { message: error.message }
    }
}

export const forgotPassword = async (account_name) => {
    try {
        const response = await axios.post(
            "http://localhost:8000/api/v1/account/forget/password",
            { account_name }
        )
        if (response.status === 200) {
            return await { ...response.data, status: response.status }
        }
    } catch (error) {
        if (error.response.data) return error.response.data
        else return { message: error.message }
    }
}
export const enterCodePass = async ({account_name, code}) => {
    try {
        const response = await axios.post(
            `http://localhost:8000/api/v1/account/forget/verify`,
            { account_name, code }
        )
        if (response.status === 200) {
            
            return await { ...response.data, status: response.status }
        }
    } catch (error) {
        if (error.response.data) return error.response.data
        else return { message: error.message }
    }
}

export const enterPasswordChange = async ({account_name, code, new_password}) => {
    try {
        const response = await axios.post(
            `http://localhost:8000/api/v1/account/forget/change`,
            { account_name, code, new_password }
        )
        if (response.status === 200) {
            
            return await { ...response.data, status: response.status }
        }
    } catch (error) {
        if (error.response.data) return error.response.data
        else return { message: error.message }
    }
}

export const changePassword = async (data) => {
    try {
        const new_password = data.new_password
        const old_password = data.old_password
        const response = await axios.put(
            `http://localhost:8000/api/v1/account/change/password`,
            { new_password, old_password }
        )
        if (response.status === 200) {
            return await { ...response.data, status: response.status }
        }
    } catch (error) {
        if (error.response.data) return error.response.data
        else return { message: error.message }
    }
}

export const loadAccountId = async (id_account) => {
    try {
        const response = await axios.get(
            `http://localhost:8000/api/v1/account/${id_account}`,
        )
        if (response.status === 200) {
            return await { ...response.data, status: response.status }
        }
    } catch (error) {
        if (error.response.data) return error.response.data
        else return { message: error.message }
    }
}


