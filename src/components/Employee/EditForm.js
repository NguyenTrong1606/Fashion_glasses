import React, { useState } from "react"
import { Row, Form, FormControl } from "react-bootstrap"
const EditForm = ({
    handleSubmit,
    submitLabel,
    hasCancelButton = false,
    handleCancel,
    initialText = "",
}) => {
    const [content, setContent] = useState(initialText)
    const isFormControlDisabled = content.length === 0
    const onSubmit = (event) => {
        event.preventDefault()
        handleSubmit(content)
        setContent("")
    }
    return (
        <Row >
            <Form onSubmit={onSubmit} className="d-flex flex-row">
                <FormControl
                    style={{flex:'4',margin:' 0 5px'}}
                    type="text"
                    placeholder="Nhập Tên Muốn Đổi"
                    name="content"
                    onKeyPress={(e) => {
                        e.key === "Enter" && e.preventDefault()
                    }}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button
                    style={{
                        flex:'1',
                        fontSize: '20px',
                        borderRadius: "5px",
                        backgroundColor: "#157347",
                        borderColor: "#146ebe",
                        border: 0,
                        margin:'0 5px'
                    }}
                    disabled={isFormControlDisabled}
                    onClick={onSubmit}
                >
                    <i className="fas fa-check"></i>
                </button>
                {hasCancelButton && (
                    <button
                        style={{
                            flex:'1',
                            fontSize: '20px',
                            borderRadius: "5px",
                            backgroundColor: "#dc3545",
                            borderColor: "#dc3545",
                            border: 0,
                            margin:'0 5px'
                        }}
                        onClick={handleCancel}
                    >
                        <i className="far fa-trash-alt fa-x" ></i>
                    </button>
                )}
            </Form>
        </Row>
    )
}

export default EditForm
