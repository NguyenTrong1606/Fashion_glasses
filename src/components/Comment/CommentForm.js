import React, { useState } from "react"
import { Row, Form } from "react-bootstrap"
const CommentForm = ({
    handleSubmit,
    submitLabel,
    hasCancelButton = false,
    handleCancel,
    initialText = "",
}) => {
    const [content, setContent] = useState(initialText)
    const isTextareaDisabled = content.length === 0
    const onSubmit = (event) => {
        event.preventDefault()
        handleSubmit(content)
        setContent("")
    }
    return (
        <Row>
            <Form onSubmit={onSubmit}>
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
                        float: "right",
                        marginLeft: '10px'
                    }}
                    disabled={isTextareaDisabled}
                    onClick={onSubmit}
                >
                    Bình luận
                </button>
                {hasCancelButton && (
                    <button
                        style={{
                            fontSize: '20px',
                            borderRadius: "5px",
                            backgroundColor: "#146ebe",
                            borderColor: "#146ebe",
                            border: 0,
                            float: "right"
                        }}
                        onClick={handleCancel}
                    >
                        Đóng
                    </button>
                )}
            </Form>
        </Row>
    )
}

export default CommentForm
