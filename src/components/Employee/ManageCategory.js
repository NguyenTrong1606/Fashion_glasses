import React, { useEffect, useRef, useState } from "react"
import "../.././App.css"
import { loadUser, userSelector } from "../../reducers/Account/LoginForm"
import { useDispatch, useSelector } from "react-redux"
import { Col, Container, Row,Button, Form, Card,Table,FormControl } from "react-bootstrap"
import { fetchListCategory, listCategorySelector,updateCategory,deleteCategory, addCategory } from "../../reducers/Category/category"
import { Link, useHistory } from "react-router-dom"
import Footer from "../home/Footer"
import Menu from "./Menu"
import HeaderPageEmployee from "./HeaderPageEmployee"
import ReactPaginate from "react-paginate"
import EditForm from "./EditForm"


const ManageCategory =() =>{
    const dispatch = useDispatch()
    const listCategory = useSelector(listCategorySelector)
    const history = useHistory()
    let user = useSelector(userSelector)
    useEffect(() => {
        dispatch(loadUser())
        dispatch(fetchListCategory())
    }, [dispatch])


    const [pageNumber, setPageNumber] = useState(0)
    const todoPerPage = 12
    const pagesVisited = pageNumber * todoPerPage
    const pageCount = Math.ceil(listCategory.length / todoPerPage)
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }
    
    const [activeEdit, setActiveEdit] = useState({
        active: false,
        index:0
    })

    const [name_category, setNameCategory]=useState("")

    const editCategory = (id_category, name_category) => {
        const category = {
            id_category,
            name_category,
        }
        dispatch(updateCategory(category))
    }

    const delCategory = (idCategory) => {
        const id_category = idCategory
        dispatch(deleteCategory(id_category))
    }



    const getCategory = listCategory.map((category,index) =>{
            let STT = index + 1
        return(
                    <div  key={category.id_category} style={{height:'80px', borderBottom:'1px solid gray'}}>
                        <div className="d-flex flex-row" style={{color:'#174b97', textAlign:'center', margin:"20px 0"}}>
                            <h5 style={{flex:'1'}}>{STT}</h5>
                            <div style={{flex:'5', textAlign:'left'}}> 
                            {(activeEdit.active && activeEdit.index === index)?
                                <EditForm submitLabel="Update"
                                hasCancelButton
                                initialText={
                                category.name_category
                                }
                                handleSubmit={(content) =>{
                                    editCategory(
                                        category.id_category,
                                        content
                                    )
                                    setActiveEdit({active: false,
                                        index:0})}
                                }
                                handleCancel={() =>
                                    setActiveEdit({active: false,
                                        index:0})
                                }
                                />:<h5 >{category.name_category}</h5>
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
                                    delCategory(category.id_category)
                                }
                            >
                        <i className="far fa-trash-alt fa-x"   
                        ></i>
                    </Button></div>
                        
                            
                        
                        </div>
                    </div>                
        )
    })

    const onSubmitAddCategoryNew = (event)=>{
        event.preventDefault()
        dispatch(addCategory(name_category))
        setNameCategory("")

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
                        {getCategory}
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
                            <Form className="d-flex flex-row" style={{textAlign:'center',}} onSubmit={onSubmitAddCategoryNew}>
                                
                                <FormControl type='text' name='name_category' 
                                 style={{width:'60%'}} value={name_category}
                                 onChange={(e) => setNameCategory(e.target.value)}
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

export default ManageCategory