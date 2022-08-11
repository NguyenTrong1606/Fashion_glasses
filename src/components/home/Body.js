import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import SliderCoverImage from "../products/SliderCoverImage"
import FetchProduct from "../products/FetchProduct"


const Body = () => {
    return (
        <>
            
            <Container style={{ marginTop: '110px', minHeight: '85vh' }}>
                <Row >
                    <SliderCoverImage />
                </Row>
                <FetchProduct/>
                
            </Container>
        </>
    )
}

export default Body