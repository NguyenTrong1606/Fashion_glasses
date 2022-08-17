import React, { useEffect, useRef, useState } from "react"
import "../.././App.css"
import { loadUser, userSelector } from "../../reducers/Account/LoginForm"
import { useDispatch, useSelector } from "react-redux"
import { Col, Container, Row,Button, Form, Card,Table,FormControl } from "react-bootstrap"
import { fetchListBrand, listBrandSelector,updateBrand,deleteBrand, addBrand } from "../../reducers/Brand/brand"
import { Link, useHistory } from "react-router-dom"
import Footer from "../home/Footer"
import Menu from "./Menu"
import HeaderPageEmployee from "./HeaderPageEmployee"
import ReactPaginate from "react-paginate"
import EditForm from "./EditForm"


const ManageBrand =() =>{
    const dispatch = useDispatch()
    const listBrand = useSelector(listBrandSelector)
    const history = useHistory()
    let user = useSelector(userSelector)
    useEffect(() => {
        dispatch(loadUser())
        dispatch(fetchListBrand())
    }, [dispatch])


    const [pageNumber, setPageNumber] = useState(0)
    const todoPerPage = 12
    const pagesVisited = pageNumber * todoPerPage
    const pageCount = Math.ceil(listBrand.length / todoPerPage)
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }

    const [activeEdit, setActiveEdit] = useState({
        active: false,
        index:0
    })

    const [name_brand, setNameBrand]=useState("")

    const editBrand = (id_brand, name_brand) => {
        const brand = {
            id_brand,
            name_brand,
        }
        dispatch(updateBrand(brand))
    }

    const delBrand = (idBrand) => {
        const id_brand = idBrand
        dispatch(deleteBrand(id_brand))
    }



    const getBrand = listBrand.map((brand,index) =>{
            let STT = index + 1
        return(
                    <div  key={brand.id_brand} style={{height:'80px', borderBottom:'1px solid gray'}}>
                        <div className="d-flex flex-row" style={{color:'#174b97', textAlign:'center', margin:"20px 0"}}>
                            <h5 style={{flex:'1'}}>{STT}</h5>
                            <div style={{flex:'5', textAlign:'left'}}> 
                            {(activeEdit.active && activeEdit.index === index)?
                                <EditForm submitLabel="Update"
                                hasCancelButton
                                initialText={
                                brand.name_brand
                                }
                                handleSubmit={(content) =>{
                                    editBrand(
                                        brand.id_brand,
                                        content
                                    )
                                    setActiveEdit({active: false,
                                        index:0})}
                                }
                                handleCancel={() =>
                                    setActiveEdit({active: false,
                                        index:0})
                                }
                                />:<h5 >{brand.name_brand}</h5>
                            }
                            </div>
                            <div style={{flex:'2'}}><Button variant="success" 
                                    onClick={() =>
                                        setActiveEdit({
                                            active:!activeEdit.active,
                                            index: index
                                        })
                                    }
                                        >
                                    Sửa
                                </Button>
                            </div>
                            <div style={{flex:'2'}}><Button variant="danger" 
                            onClick={() =>
                                    delBrand(brand.id_brand)
                                }
                            >
                        <i className="far fa-trash-alt fa-x"   
                        ></i>
                    </Button></div>
                        
                            
                        
                        </div>
                    </div>                
        )
    })

    const onSubmitAddBrandNew = (event)=>{
        event.preventDefault()
        dispatch(addBrand(name_brand))
        setNameBrand("")

    }
    return(
        <div className="App">
            <HeaderPageEmployee full_name ={user.full_name}
              email = {user.email}
              phone_number = {user.phone_number}                         
              identification = {user.identification}                        
              date_of_birth  =  {user.date_of_birth}                    
              address = {user.address}
              avatar   ={user.avatar}
              gender ={user.gender}
              role ={user.role}/>
            <Container fluid style={{ marginTop: '110px', minHeight: '85vh' }}>
                <Row>
                <Menu />
                <Col xl={6} lg={4}>
                <Card>
                    <Card.Title className="border-bottom p-3 mb-0 d-flex flex-row ">
                            <h3 style={{color:'green', margin:'10px auto'}} >Quản Lý Danh Mục Sản Phẩm</h3>
                    </Card.Title>
                    
                    
                    <Card.Body className="show-item d-flex flex-column">
                        
                        <div className="d-flex flex-row" style={{color:'#174b97', textAlign:'center', height:'80px', borderBottom:'1px solid gray'}}>
                        <h5 style={{flex:'1'}}>#</h5>
                        <h5 style={{flex:'5', textAlign:'left'}}>Tên Danh Mục Sản Phẩm</h5>
                        <h5 style={{flex:'2'}}>Sửa</h5>
                        <h5 style={{flex:'2'}}>Xóa</h5>
                        
                            
                        
                        </div>
                        <div className="d-flex flex-column" style={{margin:'auto 0'}}>
                        {getBrand}
                        </div>
                    </Card.Body>
                    {pageCount >1?
                            <ReactPaginate
                                style={{textAlign: 'center'}}
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
                    </Card>

                </Col>
                <Col xl={4} lg={4}>
                <h2 style={{margin:'20px 20px 40px'}}>Thêm danh mục sản phẩm</h2>
                            <Form className="d-flex flex-row" style={{textAlign:'center',}} onSubmit={onSubmitAddBrandNew}>
                                
                                <FormControl type='text' name='name_brand' 
                                 style={{width:'60%'}} value={name_brand}
                                 onChange={(e) => setNameBrand(e.target.value)}
                                 >
                                </FormControl>
                                <Button type='submit'> <span style={{ color: 'white' }}>
                                            Thêm
                                </span></Button>
                            </Form>
                </Col>
                </Row>
            </Container>
            <Footer/>
        </div>
    )

}

export default ManageBrand