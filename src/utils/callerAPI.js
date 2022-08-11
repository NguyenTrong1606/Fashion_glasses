import axios from "axios"
import * as types from "../contains/types"




export const fetchListBrand = createAsyncThunk(
    "brand/list",
    async () => {
        try {
            const response = await axios.get(
                "http://localhost:8000/api/v1/brand/list"
            )
            if (response.status === 200) {
                return await {...response.data, status: response.status }
                console.log(response.data)
            }
        } catch (error) {
            if (error.response.data) return error.response.data
            else return { message: error.message }
        }
    }
)
