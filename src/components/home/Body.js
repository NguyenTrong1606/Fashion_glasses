import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import SliderCoverImage from "../products/SliderCoverImage"
import FetchProduct from "../products/FetchProduct"
import ShowVoucherCollect from "../VoucherAccount/VoucherAccount"
import * as types from "../.././contains/types"


const Body = () => {
    return (
        <>
            
            <Container style={{ marginTop: '110px', minHeight: '85vh' }}>
                <Row >
                    <SliderCoverImage />
                </Row>
                {localStorage[types.LOCAL_STORAGE_TOKEN_NAME]?<Row>
                    <ShowVoucherCollect/>
                </Row>:<></>}
                
                <FetchProduct/>
                
            </Container>
        </>
    )
}

export default Body