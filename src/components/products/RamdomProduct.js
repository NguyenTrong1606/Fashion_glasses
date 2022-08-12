import React, { useEffect, useState } from "react"

import ReactPaginate from "react-paginate"
import {
    Card,
    Button,
    Container,
    Row,
    Col,
    Image,
    ListGroup,
} from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { fetchRamdomProduct,productsSelector } from "../../reducers/Products/products"
const RamdomProduct= () => {
    
    const dispatch = useDispatch()
    const products = useSelector(productsSelector)

    useEffect(() => {
        dispatch(fetchRamdomProduct())
    }, [dispatch])


    const displayTodo = products
        .map((product, index) => {
            let discountPrice
            if(product.discount<=0){
                discountPrice =(
                    <>
                    <span style={{color: 'var(--primary-color)', fontSize: '20px', fontWeight: 600}}>{product.price - +product.price*product.discount/100}đ</span>
                    </>
                    
                )
            }
            else {discountPrice= (
                <>
                <span style={{textDecoration: 'line-through', fontSize: '14px'}}>{product.price}đ</span>
                <br/>
                <span style={{color: 'red', fontSize: '20px', fontWeight: 600}}>{product.price - product.price*product.discount/100}đ</span>
                </>
                
            )}
            return (
                <Col lg={3} md={4} sm={6} key={index} style={{ margin: '15px 0' }}>
                    <Card className="bg-light card-product" >
                    <Link style={{textDecoration: 'none'}}
                        to={`/product/${product.id_product}`}
                        onClick={()=>{window.scroll(0, 0, "smooth") }}
                    >
                    <Card.Img variant="top" src={product.images[1]} />
                        <Card.Body style={{textAlign: 'center'}}>
                            <Card.Title>
                                {product.name_product}
                            </Card.Title>
                            <Card.Text>
                                {discountPrice}
                            </Card.Text>
                        </Card.Body>
                    </Link>
                    </Card>
                </Col>

            )
        
        })



    return (
        <>
                <Row style={{ backgroundColor: '#F0F8FF',margin:'15px' }}>
                <h3 style={{marginTop:'20px'}}>Sản phẩm khác</h3>
                <Row style={{ margin: '20px 0' }}>
                {displayTodo}
                </Row>
                </Row>               
        </>
    )

}

export default RamdomProduct