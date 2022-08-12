import React, { useEffect, useState } from "react"
import { Row, Col, Card, Image, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
    // addCommentParent,
    commentSelector,
    // deleteComment,
    loadComments,
    // addCommentChildren,
    // updateComment,
    // hidePresentlyComment,
} from "../../reducers/Comment/comment"
import { useParams } from "react-router"
// import { loadUser, userSelector } from "../../reducers/User/loginForm"
// import ShowCommentChildren from "./ShowCommentChildren"
// import CommentForm from "./CommentForm"
// import { useLocation } from "react-router-dom"
import { toastError } from "../.././Toast/Toast"

const ShowComment = () => {
    const dispatch = useDispatch()
    let comments = useSelector(commentSelector)
    // const commentStatus = comments.filter((comment) => comment.status === 0)
    const { id_product } = useParams()
    const [content, setContent] = useState("")
    // const [activeComment, setActiveComment] = useState(null)
    // const user = useSelector(userSelector)

    // if (user.id_account === 0 || user.id_role === 3) {
    //     comments = comments.filter((comment) => comment.status === 0)
    // }

    // const isReplying = activeComment && activeComment.type === "replying"
    // const isEditing = activeComment && activeComment.type === "editing"

    useEffect(() => {
        // dispatch(loadUser())
        dispatch(loadComments(id_product))
    }, [dispatch, id_product])

    // const ScrollToTop = () => {
    //     const { pathname } = useLocation()

    //     useEffect(() => {
    //         window.scrollTo(0, document.body.scrollHeight - 1800, "smooth")
    //     }, [pathname])

    //     return null
    // }
    // const onSubmitComment = (event) => {
    //     event.preventDefault()
    //     if (user.id_account === 0) {
    //         toastError("Vui lòng đăng nhập để chat")
    //         return
    //     } else if (user.account_status !== 0) {
    //         toastError("Tài khoản đã bị khóa, không thể chat!")
    //         return
    //     } else {
    //         const comment = {
    //             id_post,
    //             content,
    //         }
    //         dispatch(addCommentParent(comment))
    //         setContent("")
    //     }
    // }
    // const deleteCommentParent = (id_cmt) => {
    //     const comment = {
    //         id_post,
    //         id_cmt,
    //     }
    //     dispatch(deleteComment(comment))
    // }

    // const hideCommentParent = (id_cmt, status) => {
    //     if (status === 0) {
    //         const comment = {
    //             id_post,
    //             id_cmt,
    //             new_status: 1
    //         }
    //         dispatch(hidePresentlyComment(comment))
    //     } else {
    //         const comment = {
    //             id_post,
    //             id_cmt,
    //             new_status: 0
    //         }
    //         dispatch(hidePresentlyComment(comment))
    //     }

    // }

    // const addCmtChildren = (id_cmt_parent, content) => {
    //     if (user.account_status !== 0) {
    //         toastError("Tài khoản đã bị khóa, không thể chat!")
    //         return
    //     }
    //     const comment = {
    //         id_post,
    //         id_cmt_parent,
    //         content,
    //     }
    //     dispatch(addCommentChildren(comment))
    // }
    // const updateCommentParent = (id_cmt, content) => {
    //     if (user.account_status !== 0) {
    //         toastError("Tài khoản đã bị khóa, không thể chỉnh sửa chat!")
    //         return
    //     }
    //     const comment = {
    //         id_post,
    //         id_cmt,
    //         content,
    //     }
    //     dispatch(updateComment(comment))
    // }

    const formatContent = (content) => {
        let arr = content.split("\n")
        let res = []
        for (let line of arr) {
            res.push(line)
            res.push(<br />)
        }
        return res
    }

    return (
        <>
            {/* <ScrollToTop /> */}
            <Row>
                <Col>
                    <h4>Bình luận</h4>
                    <div className="box-comments">
                        {/* <form onSubmit={onSubmitComment}> */}
                        <form>
                            <textarea
                                type="text"
                                className="write-comment col-xl-12 col-lg-12 col-md-12 col-sm-12"
                                placeholder="Viết bình luận..."
                                name="content"
                                onKeyPress={(e) => {
                                    e.key === "Enter" && e.preventDefault()
                                }}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                style={{ height: "120px", minHeight: "100px", maxHeight: "300px", padding: "10px", margin: "10px 0px", border: "2px solid #ccc", borderRadius: "5px", borderSizing: "border-box" }}
                            />
                            <button
                                style={{
                                    
                                    fontSize: '20px',
                                    borderRadius: "5px",
                                    backgroundColor: "#146ebe",
                                    borderColor: "#146ebe",
                                    border: 0,
                                    float: "right"
                                }}
                                // onClick={onSubmitComment}
                            >
                                Bình luận
                            </button>
                            
                        </form>
                        <br />
                        <br />
                        {comments.map((comment, index) => (
                            <div className="read-comment" key={index}>
                                <Card
                                    style={{
                                        flexDirection: "row",
                                        border: "0",
                                        padding: "3px",
                                        
                                    }}
                                >
                                
                                    <Card.Body style={{ padding: "0px" }}>
                                        <Row className="d-flex">
                                            <Card.Title
                                                
                                                style={{
                                                    textDecoration: "none",
                                                    color: "black",
                                                    display: "inline",
                                                }}
                                            >
                                                {comment.account.account_name}{" "}
                                                
                                                <span className="date-comment">
                                                    <i>
                                                        {comment.day} -{" "}
                                                        {comment.time}
                                                    </i>
                                                </span>
                                            </Card.Title>
                                        </Row>
                                        <Card.Text
                                            className="d-flex"
                                            style={{
                                                flexDirection: "column",
                                            }}
                                        >
                                            {/* {isEditing &&
                                                activeComment.id_cmt ===
                                                comment.id_cmt ? (
                                                <CommentForm
                                                    submitLabel="Update"
                                                    hasCancelButton
                                                    initialText={
                                                        comment.content
                                                    }
                                                    handleSubmit={(content) =>
                                                        updateCommentParent(
                                                            comment.id_cmt,
                                                            content
                                                        )
                                                    }
                                                    handleCancel={() =>
                                                        setActiveComment(null)
                                                    }
                                                />
                                            ) : ( */}
                                                <span
                                                    style={{ fontSize: "18px" }}
                                                >
                                                    {formatContent(comment.content)}
                                                </span>
                                            {/* )} */}

                                            <span className="d-flex comment-item-button">
                                                {/* {user.id_account !== 0 ? <>  */}
                                                <Button
                                                    variant="none"
                                                    // onClick={() =>
                                                    //     setActiveComment({
                                                    //         id_cmt_parent:
                                                    //             comment.id_cmt_parent,
                                                    //         type: "replying",
                                                    //     })
                                                    // }
                                                >
                                                    <i className="far fa-comment-dots fa-x"></i>
                                                </Button>
                                                {/* </> : <></>} */}

                                                

                                                {/* {user.id_account ===
                                                    comment.id_account ? (
                                                    <> */}
                                                        <Button
                                                            variant="none"
                                                            // onClick={() =>
                                                            //     setActiveComment(
                                                            //         {
                                                            //             id_cmt: comment.id_cmt,
                                                            //             type: "editing",
                                                            //         }
                                                            //     )
                                                            // }
                                                        >
                                                            <i className="far fa-edit fa-x"></i>
                                                        </Button>
                                                        <Button variant="none">
                                                            <i
                                                                className="far fa-trash-alt fa-x"
                                                                // onClick={() =>
                                                                //     deleteCommentParent(
                                                                //         comment.id_cmt
                                                                //     )
                                                                // }
                                                            ></i>
                                                        </Button>
                                                    {/* </>
                                                ) : user.id_role === 1 ? (
                                                    <Button variant="none">
                                                        <i
                                                            className="far fa-trash-alt 1x"
                                                            onClick={() =>
                                                                deleteCommentParent(
                                                                    comment.id_cmt
                                                                )
                                                            }
                                                        ></i>
                                                    </Button>
                                                ) : (
                                                    <></>
                                                )}
 */}

                                            </span>
                                            {/* {isReplying &&
                                                activeComment.id_cmt_parent ===
                                                comment.id_cmt_parent && (
                                                    <CommentForm
                                                        submitLabel="Reply"
                                                        handleSubmit={(
                                                            content
                                                        ) =>
                                                            addCmtChildren(
                                                                comment.id_cmt_parent,
                                                                content
                                                            )
                                                        }
                                                        hasCancelButton
                                                        handleCancel={() =>
                                                            setActiveComment(
                                                                null
                                                            )
                                                        }
                                                    />
                                                )} */}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>

                                {/* <ShowCommentChildren
                                    id_cmt_parent={comment.id_cmt_parent}
                                    id_cmt={comment.id_cmt}
                                    isEditing={isEditing}
                                    activeComment={activeComment}
                                    setActiveComment={setActiveComment}
                                    id_account={user.id_account}
                                    id_role={user.id_role}
                                    account_status={user.account_status}
                                /> */}
                                {comment.commentChildren.map((commentReply)=>(
                                    
                                        <div className="read-comment rep" key={commentReply.id_cmt}>
                                            <Card
                                                style={{
                                                    flexDirection: "row",
                                                    width: "100%",
                                                    border: "0",
                                                    padding: "0",
                                                }}
                                            >
    
                                                <Card.Body style={{ padding: "0" }}>
                                                    <Row className="d-flex">
                                                        <Card.Title
                                                            
                                                            style={{
                                                                textDecoration: "none",
                                                                color: "black",
                                                                display: "inline",
                                                            }}
                                                        >
                                                            {commentReply.account.account_name}

                                                            <span className="date-comment">
                                                                <i>
                                                                    {commentReply.day} - {commentReply.time}
                                                                </i>
                                                            </span>
                                                        </Card.Title>
                                                    </Row>
                                                    <Card.Text
                                                        className="d-flex"
                                                        style={{ flexDirection: "column" }}
                                                    >
                                                        {/* {isEditing &&
                                                            activecommentReply.id_cmt === commentReply.id_cmt ? (
                                                            <CommentForm
                                                                submitLabel="Update"
                                                                hasCancelButton
                                                                initialText={commentReply.content}
                                                                handleSubmit={(content) =>
                                                                    updateCommentChildren(
                                                                        commentReply.id_cmt,
                                                                        content
                                                                    )
                                                                }
                                                                handleCancel={() =>
                                                                    setActiveComment(false)
                                                                }
                                                            />
                                                        ) : ( */}
                                                            <span style={{ fontSize: "19px" }}>
                                                                {formatContent(commentReply.content)}
                                                            </span>
                                                        {/* )} */}
                                                        {/* <span className="d-flex comment-item-button">
                                                            {id_account !== 0 && id_role < 3 && id_role < commentReply.id_role ?
                                                                <>
                                                                    <Button variant="none">
                                                                        <i
                                                                            className={commentReply.status === 0 ? "fas fa-eye-slash fa-x" : "fas fa-eye fa-x"}
                                                                            onClick={() =>
                                                                                hideCommentChildren(
                                                                                    commentReply.id_cmt, commentReply.status
                                                                                )
                                                                            }
                                                                        ></i>
                                                                    </Button>
                                                                </>
                                                                : <></>}

                                                            {id_account === commentReply.id_account ? (
                                                                <>
                                                                    <Button
                                                                        variant="none"
                                                                        onClick={() =>
                                                                            setActiveComment({
                                                                                id_cmt: commentReply.id_cmt,
                                                                                type: "editing",
                                                                            })
                                                                        }
                                                                    >
                                                                        <i className="far fa-edit fa-x"></i>
                                                                    </Button>
                                                                    <Button
                                                                        variant="none"
                                                                        onClick={() =>
                                                                            deleteCommentChildren(
                                                                                commentReply.id_cmt
                                                                            )
                                                                        }
                                                                    >
                                                                        <i className="far fa-trash-alt fa-x"></i>
                                                                    </Button>
                                                                </>
                                                            ) : id_role === 1 ? (
                                                                <>
                                                                    <Button variant="none">
                                                                        <i
                                                                            className="far fa-trash-alt fa-x"
                                                                            onClick={() =>
                                                                                deleteCommentChildren(
                                                                                    commentReply.id_cmt
                                                                                )
                                                                            }
                                                                        ></i>
                                                                    </Button>
                                                                </>
                                                            ) : (
                                                                <></>
                                                            )}
                                                        </span> */}
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    
                                ))}

                                <hr />
                            </div>
                        ))}
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default ShowComment