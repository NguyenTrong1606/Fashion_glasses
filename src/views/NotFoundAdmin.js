import React from "react"
import { useHistory } from "react-router-dom"
import Button from "react-bootstrap/Button"

const NotFoundAdmin = () => {
    // let history = useHistory()
    // const handleClick = () => {
    //     history.goBack()
    // }
    const myStyle = {
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "10rem",
    }

    const wrapperStyle = {
        position: "fixed",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        background: "#ffe351",
    }
    return (
        <div style={wrapperStyle}>
            <img
                src="https://i0.wp.com/blogpascher.com/wp-content/uploads/2016/04/comment-corriger-erreur-403-forbidden-wordpress.png"
                alt="not-found"
                className="not-found shadow"
                style={myStyle}
            />
            <div className="text-center">
                <Button variant="warning mt-3" >
                    GO BACK
                </Button>
            </div>
        </div>
    )
}

export default NotFoundAdmin
