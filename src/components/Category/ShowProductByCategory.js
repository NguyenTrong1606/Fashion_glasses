import React, { useEffect, useState } from "react"
import Header from "../home/Header"
import Footer from "../home/Footer"
import SliderCoverImage from "../products/SliderCoverImage"
import ReactPaginate from "react-paginate"
import {
    Card,
    Button,
    Container,
    Row,
    Col,
    Image,
    ListGroup,
    Form
} from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import { useParams,useLocation } from "react-router-dom"
import { loadUser, userSelector } from "../../reducers/Account/LoginForm"
import { loadProductByCategory,productsSelector } from "../../reducers/Products/products"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFilter} from '@fortawesome/free-solid-svg-icons'
import { fetchListCategory, listCategorySelector } from "../../reducers/Category/category"
import { fetchListBrand, listBrandSelector } from "../../reducers/Brand/brand"


const ShowProductByCategory= () => {
    
    const dispatch = useDispatch()
    const { id_category } = useParams()
    const products = useSelector(productsSelector)
    const user = useSelector(userSelector)
    let categorys = useSelector(listCategorySelector);
    let brands = useSelector(listBrandSelector);
    const location = useLocation()
    const history = useHistory()
    useEffect(() => {
        dispatch(loadUser())
        dispatch(fetchListCategory());
        dispatch(fetchListBrand());
    }, [dispatch])
    const [pageNumber, setPageNumber] = useState(0)
    const todoPerPage = 12
    const pagesVisited = pageNumber * todoPerPage
    useEffect(() => {
        dispatch(loadProductByCategory(id_category))
    }, [dispatch, id_category])

    const pageCount = Math.ceil(products.length / todoPerPage)

    const displayTodo = products
        .slice(pagesVisited, pagesVisited + todoPerPage)
        .map((product, index) => {
            let discountPrice
            if(product.discount<=0){
                discountPrice =(
                    <>
                    <span style={{color: 'var(--primary-color)', fontSize: '20px', fontWeight: 600}}>{(product.price - +product.price*product.discount/100).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</span>
                    </>
                    
                )
            }
            else {discountPrice= (
                <>
                <span style={{textDecoration: 'line-through', fontSize: '14px'}}>{product.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</span>
                <br/>
                <span style={{color: 'red', fontSize: '20px', fontWeight: 600}}>{(product.price - product.price*product.discount/100).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</span>
                </>
                
            )}
            return (
                <Col lg={3} md={4} sm={6} key={index} style={{ margin: '15px 0' }}>
                    <Card className="bg-light card-product" >
                    <Link style={{textDecoration: 'none'}}
                        to={`/product/${product.id_product}`}
                        onClick={()=>{window.scroll(0, 0, "smooth")
                        localStorage.setItem('link', `/product/${product.id_product}`)
                    }}
                    >
                    {product.quantity < 1?<h2 style={{
                    position: 'absolute',
                    top:'30%', left:'0',
                    right:'0',
                    color:'red',
                    fontWeight:'800',
                    background:'rgba(13, 202, 240, 0.45)',
                    textAlign:'center'}}>HẾT HÀNG</h2>:<></>}
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



    const [formData, setFormData] = useState({
        id_category: location.state.id_category,
        name_category: location.state.name_category,
        id_brand: location.state.id_brand,
        name_brand: location.state.name_brand
    })

    const listCategory = categorys.map((category, index) => {
        return (
            <Form.Check
            style={{color:'black', fontSize:'16px'}}
            key={index}
            inline
            label={category.name_category}
            name="id_category"
            type="radio"
            value={category.id_category}
            onChange={(e)=>{
                setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                    name_category: category.name_category
                })
            }}
            checked = {formData.id_category == category.id_category}
            />
        );
      });
      const listBrand = brands.map((brand, index) => {
        return (
            <Form.Check
            style={{color:'black', fontSize:'16px'}}
            key={index}
            inline
            label={brand.name_brand}
            name="id_brand"
            type="radio"
            value={brand.id_brand}
            onChange={(e)=>{
                setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                    name_brand: brand.name_brand
                })
            }}
            checked = {formData.id_brand == brand.id_brand}
            />
        );
      });

      console.log(formData)

    const submitFilter = async (event) => {
        event.preventDefault()
        if(formData.id_category != 0 && formData.id_brand !=0){
            history.push({pathname:`/category/${formData.id_category}/brand/${formData.id_brand}/filter`,
            state:{
                id_category: formData.id_category,
                id_brand: formData.id_brand,
                name_brand: formData.name_brand,
                name_category: formData.name_category,
            }
            })
        }
        else{
            if(formData.id_category == 0 && formData.id_brand == 0){
                history.push("/")
            }else{
                if(formData.id_category == 0){
                    history.push({pathname:`/brand/${formData.id_brand}/product`,
                    state:{
                        id_category: formData.id_category,
                        id_brand: formData.id_brand,
                        name_brand: formData.name_brand,
                        name_category: formData.name_category,
                    }
                    })
                }
                else{
                    history.push({pathname:`/category/${formData.id_category}/product`,
                    state:{
                        id_category: formData.id_category,
                        id_brand: formData.id_brand,
                        name_brand: formData.name_brand,
                        name_category: formData.name_category,
                    }
                    })
                }
            }
            
        }
        
      }




    return (
        <>
        <Header full_name ={user.full_name}
              email = {user.email}
              phone_number = {user.phone_number}                         
              identification = {user.identification}                        
              date_of_birth  =  {user.date_of_birth}                    
              address = {user.address}
              avatar   ={user.avatar}
              gender ={user.gender}
              role ={user.role}/>
            <Container style={{ marginTop: '110px', minHeight: '85vh' }}>
                <Row >
                    <SliderCoverImage />
                </Row>
                <Row className="mt-4 mb-3" style={{background:'rgb(240, 248, 255)'}}>
                    <h2 style={{color:'orange'}}>Lọc sản phẩm</h2>
                    <Form className="d-flex flex-row" onSubmit={submitFilter}>
                        
                        <Form.Group className="mb-3 d-flex flex-column" style={{textAlign: 'left', flex:'4'}}>
                            <Form.Label style={{color:'blue',fontSize:'20px', fontWeight:'600'}}>Danh mục:</Form.Label>
                            <Form.Check
                                style={{color:'black', fontSize:'16px'}}
                                inline
                                label="Tất cả"
                                name="id_category"
                                type="radio"
                                value = '0'
                                onChange={(e)=>{
                                    setFormData({
                                        ...formData,
                                        [e.target.name]: e.target.value,
                                    })
                                }}
                                checked = {formData.id_category == 0}
                                />
                                {listCategory}
                        </Form.Group>
                        <Form.Group className="mb-3 d-flex flex-column" style={{textAlign: 'left',flex:'4'}}>
                            <Form.Label style={{color:'blue',fontSize:'20px', fontWeight:'600'}}>Nhãn hiệu:</Form.Label>
                            <Form.Check
                                style={{color:'black', fontSize:'16px'}}
                                inline
                                label="Tất cả"
                                name="id_brand"
                                type="radio"
                                value = '0'
                                onChange={(e)=>{
                                    setFormData({
                                        ...formData,
                                        [e.target.name]: e.target.value,
                                    })
                                }}
                                checked = {formData.id_brand == 0}
                                />
                                {listBrand}
                        </Form.Group>
                        <Button className="mt-3" variant='danger' type='submit' style={{textAlign: 'center', width:'10%', height:'40px' ,flex:'1', margin:'auto'}}><FontAwesomeIcon icon={faFilter}/></Button>
                        <div style={{flex:'5'}}></div>

                    </Form>
                </Row>
                <Row style={{ backgroundColor: '#F0F8FF' }}>
                <h2 style={{color:'orange'}}>Loại sản phẩm: {location.state.name_category} </h2>
                <Row style={{ margin: '20px 0' }}>
                {displayTodo}
                {products.length === 0 && <div style={{color: '#1699c1', fontSize:'32px', fontWeight:'600', minHeight:'100px', lineHeight:'100px', textAlign:'center'}}>Không có sản phẩm thích hợp</div>}
                </Row>
                
            
                {pageCount>1?(
                    <div className="list-page">
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
                        />
                    </div>
                ) : (
                    <></>
                )}
            

            </Row>
                
            </Container>
        <Footer/>
        </>
    )

}

export default ShowProductByCategory