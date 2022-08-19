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

    

    const [pageNumber, setPageNumber] = useState(0)
    const todoPerPage = 4
    const pagesVisited = pageNumber * todoPerPage
    useEffect(() => {
        dispatch(fetchRamdomProduct())
    }, [dispatch])
    const pageCount = Math.ceil(products.length / todoPerPage)


    const displayTodo = products
        .slice(pagesVisited, pagesVisited + todoPerPage)
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
                    <Card.Img variant="top" src={product.images[0]} />
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

        const changePage = ({ selected }) => {
            setPageNumber(selected)
        }

    return (
        <>
                <Row style={{ backgroundColor: '#F0F8FF',margin:'15px' }}>
                <h3 style={{marginTop:'20px'}}>Sản phẩm khác</h3>
                <Row style={{ margin: '20px 0' }}>
                {displayTodo}
                </Row>
                {pageCount > 1?
                    <ReactPaginate
                        previousLabel={<i className="fa fa-chevron-left "></i>}
                        nextLabel={<i className="fa fa-chevron-right"></i>}
                        pageCount ={pageCount}
                        onPageChange={changePage}
                        containerClassName={"pagination justify-content-center"}
                        pageClassName={"page-item me-2"}
                        pageLinkClassName={"page-link"}
                        previousClassName={"page-item me-2"}
                        previousLinkClassName={"page-link"}
                        nextClassName={"page-item"}
                        nextLinkClassName={"page-link"}
                        breakClassName={"page-item me-2"}
                        breakLinkClassName={"page-link"}
                        disabledClassName={"paginationDisabled"}
                        activeClassName={"active"}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={2}
                    />:<></>
                }
                </Row>               
        </>
    )

}

export default RamdomProduct