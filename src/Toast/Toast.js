import { toast } from "react-toastify"

export const toastSuccess = (message) => {
    if (message !== null && typeof message !== "undefined" && message !== "") {
        toast.success(`🦄 ${message}`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }
}
export const toastError = (message) => {
    if (message !== null && typeof message !== "undefined" && message !== "") {
        toast.error(`🦄 ${message}`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }
}

