import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { toastError, toastSuccess } from "../../Toast/Toast"
export const loadComments = createAsyncThunk(
    "comment/fetch",
    async (id_product) => {
        try {
            const response = await axios.get(
                `http://localhost:8000/api/v1/comment/${id_product}/comment`
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

// export const loadCommentParent = createAsyncThunk(
//     "comment/fetchParent",
//     async (id_product) => {
//         try {
//             const response = await axios.get(
//                 `http://localhost:8000/api/v1/comment/comment/:id_cmt`
//             )
//             if (response.status === 200) {
//                 return await { ...response.data, status: response.status }
//             }
//         } catch (error) {
//             if (error.response.data) return error.response.data
//             else return { message: error.message }
//         }
//     }
// )
export const addCommentParent = createAsyncThunk(
    "comment/addParent",
    async ({ id_product, content }) => {
        try {
            const response = await axios.post(
                `http://localhost:8000/api/v1/comment/${id_product}/comment`,
                { content }
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

export const addCommentChildren = createAsyncThunk(
    "comment/addChildren",
    async ({ id_product, id_cmt_parent, content }) => {
        try {
            const response = await axios.post(
                `http://localhost:8000/api/v1/comment/${id_product}/comment/${id_cmt_parent}/reply`,
                { content }
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

export const deleteComment = createAsyncThunk(
    "comment/delete",
    async ({ id_product, id_cmt }) => {
        try {
            const response = await axios.delete(
                `http://localhost:8000/api/v1/comment/${id_product}/comment/${id_cmt}/delete`
            )
            if (response.status === 200) {
                return await {
                    ...response.data,
                    status: response.status,
                    id_product: id_product,
                    id_cmt: id_cmt,
                }
            }
        } catch (error) {
            if (error.response.data) return error.response.data
            else return { message: error.message }
        }
    }
)

export const updateComment = createAsyncThunk(
    "comment/update",
    async ({ id_product, id_cmt, content }) => {
        try {
            const response = await axios.put(
                `http://localhost:8000/api/v1/comment/${id_product}/comment/${id_cmt}/update`,
                { content }
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

// export const hidePresentlyComment = createAsyncThunk(
//     "comment/hidePresently",
//     async ({ id_cmt, id_product, new_status }) => {
//         try {
//             const response = await axios.put(
//                 `https://itnews-api.herokuapp.com/api/v1/post/${id_post}/comment/${id_cmt}/status/${new_status}`
//             )
//             if (response.status === 200) {
//                 return await {
//                     ...response.data,
//                     status: response.status,
//                     id_post: id_post,
//                     id_cmt: id_cmt,
//                     new_status: new_status,
//                 }
//             }
//         } catch (error) {
//             if (error.response.data) return error.response.data
//             else return { message: error.message }
//         }
//     }
// )

const comment = createSlice({
    name: "comment",
    initialState: {
        comments: [],
        // commentChildren: [],
        showComment: false,
        // showCommentChildren: false,
    },
    reducers: {
        // setShowComment(state) {
        //     state.showCommentParent = !state.showCommentParent
        // },
        // setShowCommentChildren(state) {
        //     state.showCommentChildren = !state.showCommentChildren
        // },
        setShow(state) {
            state.showComment = false
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadComments.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.comments = action.payload.data
                } else {
                }
            })
    //         .addCase(loadCommentChildren.fulfilled, (state, action) => {
    //             if (action.payload.status === 200) {
    //                 state.commentChildren = action.payload.data
    //             } else {
    //             }
    //         })
            .addCase(addCommentParent.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.comments.unshift(action.payload.data)
                } else {
                }
            })
            .addCase(addCommentChildren.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.comments = state.comments.map(
                        (comment) => {
                            if (comment.id_cmt === action.payload.data.id_cmt_parent)
                            {
                                comment.commentChildren.push(action.payload.data)
                            }
                            return comment
                        }
                    )

                } else {
                }
            })
            .addCase(updateComment.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    for(let i=0; i<state.comments.length; i++){
                        for(let j =0; j<state.comments[i].commentChildren.length;j++){
                            if(state.comments[i].commentChildren[j].id_cmt ===action.payload.data.id_cmt) 
                            state.comments[i].commentChildren[j] = action.payload.data

                        }                       
                    }
                    state.comments = state.comments.map(
                        (comment) => {
                            if (comment.id_cmt === action.payload.data.id_cmt) {
                                return action.payload.data
                            }else{
                                return comment
                            }
                            
                        }
                    )
                } else {
                }
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    
                    for(let i=0; i<state.comments.length; i++){
                        state.comments[i].commentChildren = state.comments[i].commentChildren.filter(
                            (cmtChildren)=>cmtChildren.id_cmt !== action.payload.id_cmt
                        )                        
                    }
                    state.comments = state.comments.filter(
                        (comment) =>
                            comment.id_cmt !== action.payload.id_cmt
                    )

                    toastSuccess(action.payload.message)
                } else {
                    toastError(action.payload.message)
                }
            })
    //         .addCase(hidePresentlyComment.fulfilled, (state, action) => {
    //             if (action.payload.status === 200) {
    //                 state.commentChildren = state.commentChildren.map(
    //                     (comment) => {
    //                         if (comment.id_cmt === action.payload.data.id_cmt) {
    //                             comment.status = action.payload.new_status
    //                             return comment
    //                         }
    //                         return comment
    //                     }
    //                 )
    //                 state.comment = state.comment.map((comment) => {
    //                     if (comment.id_cmt === action.payload.data.id_cmt) {
    //                         comment.status = action.payload.new_status
    //                         return comment
    //                     }
    //                     return comment
    //                 })
    //             } else {
    //             }
    //         })
     },
})

const commentReducer = comment.reducer

export const { setShow } =
    comment.actions

// export const showCommentSelector = (state) =>
//     state.commentReducer.showCommentParent
// export const showCommentSelectorChildren = (state) =>
//     state.commentReducer.showCommentChildren
export const commentSelector = (state) => state.commentReducer.comments
// export const commentChildrenSelector = (state) =>
//     state.commentReducer.commentChildren

export default commentReducer
