import React, { useEffect, useState } from "react"
import { Row, Col, Card, Image, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
    addCommentParent,
    commentSelector,
    deleteComment,
    loadComments,
    addCommentChildren,
    updateComment,
} from "../../reducers/Comment/comment"
import { useParams } from "react-router"
import { loadUser, userSelector } from "../../reducers/Account/LoginForm"
import CommentForm from "./CommentForm"
import { useLocation } from "react-router-dom"
import { toastError } from "../.././Toast/Toast"

const ShowComment = () => {
    const dispatch = useDispatch()
    let comments = useSelector(commentSelector)
    // const commentStatus = comments.filter((comment) => comment.status === 0)
    const { id_product } = useParams()
    const [content, setContent] = useState("")
    const [activeComment, setActiveComment] = useState(null)
    const user = useSelector(userSelector)

    // if (user.id_account === 0 || user.id_role === 3) {
    //     comments = comments.filter((comment) => comment.status === 0)
    // }

    const isReplying = activeComment && activeComment.type === "replying"
    const isEditing = activeComment && activeComment.type === "editing"

    useEffect(() => {
        dispatch(loadUser())
        dispatch(loadComments(id_product))
    }, [dispatch, id_product])

    // const ScrollToTop = () => {
    //     const { pathname } = useLocation()

    //     useEffect(() => {
    //         window.scrollTo(0, document.body.scrollHeight - 1800, "smooth")
    //     }, [pathname])

    //     return null
    // }
    const onSubmitComment = (event) => {
        event.preventDefault()
        if (user.id_account === 0) {
            toastError("Vui lòng đăng nhập để chat")
            return
        } else {
            const comment = {
                id_product,
                content,
            }
            dispatch(addCommentParent(comment))
            setContent("")
        }
    }
    const delComment = (id_cmt) => {
        const comment = {
            id_product,
            id_cmt,
        }
        dispatch(deleteComment(comment))
    }

    // const hideCommentParent = (id_cmt, status) => {
    //     if (status === 0) {
    //         const comment = {
    //             id_product,
    //             id_cmt,
    //             new_status: 1
    //         }
    //         dispatch(hidePresentlyComment(comment))
    //     } else {
    //         const comment = {
    //             id_product,
    //             id_cmt,
    //             new_status: 0
    //         }
    //         dispatch(hidePresentlyComment(comment))
    //     }

    // }

    const addCmtChildren = (id_cmt_parent, content) => {
        if (user.id_account === 0) {
            toastError("Vui lòng đăng nhập để chat")
            return
        }
        const comment = {
            id_product,
            id_cmt_parent,
            content,
        }
        dispatch(addCommentChildren(comment))
    }
    const updateComment1 = (id_cmt, content) => {
        const comment = {
            id_product,
            id_cmt,
            content,
        }
        dispatch(updateComment(comment))
    }

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
                        <form onSubmit={onSubmitComment}>
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
                                onClick={onSubmitComment}
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
                                        <div
                                            className="d-flex"
                                            style={{
                                                flexDirection: "column",
                                            }}
                                        >
                                            {isEditing &&
                                                activeComment.id_cmt ===
                                                comment.id_cmt ? (
                                                <CommentForm
                                                    submitLabel="Update"
                                                    hasCancelButton
                                                    initialText={
                                                        comment.content
                                                    }
                                                    handleSubmit={(content) =>{
                                                        updateComment1(
                                                            comment.id_cmt,
                                                            content
                                                        )
                                                        setActiveComment(null)}
                                                    }
                                                    handleCancel={() =>
                                                        setActiveComment(null)
                                                    }
                                                />
                                            ) : (
                                                <span
                                                    style={{ fontSize: "18px" }}
                                                >
                                                    {formatContent(comment.content)}
                                                </span>
                                            )}

                                            <span className="d-flex comment-item-button">
                                                 {user.id_account !== 0 ? <> 
                                                <Button
                                                    variant="none"
                                                    onClick={() =>
                                                        setActiveComment({
                                                            id_cmt:
                                                            comment.id_cmt,
                                                            type: "replying",
                                                        })
                                                    }
                                                >
                                                    <i className="far fa-comment-dots fa-x"></i>
                                                </Button>
                                                </> : <></>}

                                                

                                                {user.id_account ===
                                                    comment.account.id_account ? (
                                                    <>
                                                        <Button
                                                            variant="none"
                                                            onClick={() =>
                                                                setActiveComment(
                                                                    {
                                                                        id_cmt: comment.id_cmt,
                                                                        type: "editing",
                                                                    }
                                                                )
                                                            }
                                                        >
                                                            <i className="far fa-edit fa-x"></i>
                                                        </Button>
                                                        <Button variant="none">
                                                            <i
                                                                className="far fa-trash-alt fa-x"
                                                                onClick={() =>
                                                                    delComment(
                                                                        comment.id_cmt
                                                                    )
                                                                }
                                                            ></i>
                                                        </Button>
                                                     </>
                                                ) : user.role !== 0 ? (
                                                    <Button variant="none">
                                                        <i
                                                            className="far fa-trash-alt 1x"
                                                            onClick={() =>
                                                                delComment(
                                                                    comment.id_cmt
                                                                )
                                                            }
                                                        ></i>
                                                    </Button>
                                                ) : (
                                                    <></>
                                                )}

                                            </span>
                                            {isReplying &&
                                                activeComment.id_cmt ===
                                                comment.id_cmt && (
                                                    <CommentForm
                                                        submitLabel="Reply"
                                                        handleSubmit={(
                                                            content
                                                        ) =>
                                                            addCmtChildren(
                                                                comment.id_cmt,
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
                                                )}
                                        </div>
                                    </Card.Body>
                                </Card>
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
                                                        {isEditing &&
                                                            activeComment.id_cmt === commentReply.id_cmt ? (
                                                            <CommentForm
                                                                submitLabel="Update"
                                                                hasCancelButton
                                                                initialText={commentReply.content}
                                                                handleSubmit={(content) =>{
                                                                    updateComment1(
                                                                        commentReply.id_cmt,
                                                                        content
                                                                    )
                                                                    setActiveComment(null)
                                                                }
                                                                }
                                                                handleCancel={() =>
                                                                    setActiveComment(null)
                                                                }
                                                            />
                                                        ) : (
                                                            <span style={{ fontSize: "19px" }}>
                                                                {formatContent(commentReply.content)}
                                                            </span>
                                                        )}
                                                        <div className="d-flex comment-item-button">
                                                

                                                            {user.id_account === commentReply.account.id_account ? (
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
                                                                            delComment(
                                                                                commentReply.id_cmt
                                                                            )
                                                                        }
                                                                    >
                                                                        <i className="far fa-trash-alt fa-x"></i>
                                                                    </Button>
                                                                </>
                                                            ) : user.role !== 0 ? (
                                                                <>
                                                                    <Button variant="none">
                                                                        <i
                                                                            className="far fa-trash-alt fa-x"
                                                                            onClick={() =>
                                                                                delComment(
                                                                                    commentReply.id_cmt
                                                                                )
                                                                            }
                                                                        ></i>
                                                                    </Button>
                                                                </>
                                                            ) : (
                                                                <></>
                                                            )}
                                                        </div>
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