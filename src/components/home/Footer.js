import React from "react"
import { Container, Row, Col, ListGroup } from "react-bootstrap"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {} from '@fortawesome/free-solid-svg-icons'


const Footer = () => {
    return (
        <>
            <Container fluid className="bg-primary">
                <Row style={{textAlign: 'center'}}>
                    <Col md={4}>
                        <h5>TÀI NGUYÊN</h5>
                        <ListGroup className="a">
                            <ListGroup.Item
                                action
                                variant="primary"
                                
                            >
                                Sản phẩm
                            </ListGroup.Item>
                            
                            <ListGroup.Item
                                action
                                variant="primary"
                                
                            >
                                Giảm giá
                            </ListGroup.Item>

                            
                        </ListGroup>
                    </Col>

                    <Col md={4}>
                        <h5>DỊCH VỤ</h5>
                    </Col>

                    <Col md={4}>
                        <h5>LIÊN KẾT</h5>
                        <ListGroup>
                            <ListGroup.Item
                                action
                                variant="primary"
                                href="https://www.facebook.com/NguyenTrong1606/"
                            >
                                <i className="icon-of-footer fab fa-facebook-square">&nbsp;Facebook</i>
                            </ListGroup.Item>
                            <ListGroup.Item
                                action
                                variant="primary"
                                href="https://www.instagram.com/nguyen_trong_/"
                            >
                                <i className="icon-of-footer fab fa-instagram">&nbsp;instagram</i>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
                        <hr style={{backgroundColor: 'white'}}/>
                <Row style={{textAlign: 'center'}}>
                    <Col>
                        <ListGroup horizontal>
                            <ListGroup.Item
                                action
                                variant="primary"
                                href="#link1"
                            >
                                Về chúng tôi
                            </ListGroup.Item>
                            <ListGroup.Item
                                action
                                variant="primary"
                                href="#link2"
                            >
                                Phản hồi
                            </ListGroup.Item>
                            <ListGroup.Item
                                action
                                variant="primary"
                                href="#link2"
                            >
                                Giúp đỡ
                            </ListGroup.Item>
                            <ListGroup.Item
                                action
                                variant="primary"
                                href="#link2"
                            >
                                Điều khoản
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
                <hr style={{height: '0px', marginBottom: "0px"}}/>
            </Container>
        </>
    )
}

export default Footer
