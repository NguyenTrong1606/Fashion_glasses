import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import * as types from "../../contains/types"
import setAuthToken from "../../utils/setAuthToken"
import { toastError, toastSuccess } from "../../Toast/Toast"
import axios from "axios"

export const loadUser = createAsyncThunk("login/user", async () => {
    if (localStorage[types.LOCAL_STORAGE_TOKEN_NAME]) {
        setAuthToken(localStorage[types.LOCAL_STORAGE_TOKEN_NAME])
    }
    const response = await axios.get(
        "http://localhost:8000/api/v1/account/information"
    )
    try {
        if (response.status === 200) {
            return { ...response.data, isAuthenticated: true }
        }
    } catch (error) {
        localStorage.removeItem(types.LOCAL_STORAGE_TOKEN_NAME)
        setAuthToken(null)       
        return { ...response.data, isAuthenticated: false }
    }
})

export const updateAddressUser = createAsyncThunk(
    "account/update/address",
    async (address) => {
        try {
            const response = await axios.put(
                `http://localhost:8000/api/v1/account/change-address`,
                { address }
            )
            if (response.status === 200) {
                return await { ...response.data, status: response.status }
            }
        } catch (error) {
            if (error.response.data) return error.response.data
            else return { message: error.message }
        }
    }
)

const loginForm = createSlice({
    name: "login",
    initialState: {
        authLoading: true,
        isAuthenticated: false,
        
        account:{
            id_account: 0,
            account_name: "",
            role: 0,            
            status: 0
        },
    },
    reducers: {
        setUser(state, action) {
            state.account = action.payload.account
            state.isAuthenticated = action.payload.isAuthenticated
        },
        setLogout(state) {
            localStorage.removeItem(types.LOCAL_STORAGE_TOKEN_NAME)
            setAuthToken(null)
            state.account = {
                id_account: 0,
                account_name: "",
                role: 0,            
                status: 0,
            }
            state.isAuthenticated = false
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loadUser.fulfilled, (state, action) => {
                state.account = action.payload.data
                state.isAuthenticated = action.payload.isAuthenticated
        })
        builder.addCase(updateAddressUser.fulfilled, (state, action) => {
            if(action.payload.status === 200){
                state.account = action.payload.data
                state.isAuthenticated = action.payload.isAuthenticated
                toastSuccess(action.payload.message)
            }
            else{
                toastError(action.payload.message)
            }
            
    })
    },
})

const loginReducer = loginForm.reducer

export const userSelector = (state) => state.loginReducer.account

export const { setLogout, setUser } = loginForm.actions
export const isAuthenticatedSelector = (state) =>
    state.loginReducer.isAuthenticated

export default loginReducer