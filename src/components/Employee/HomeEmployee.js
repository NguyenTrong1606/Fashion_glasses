import {React,useEffect, useState} from "react"
import "../.././App.css"
import { useDispatch, useSelector } from "react-redux"
import { loadUser, userSelector } from "../../reducers/Account/LoginForm"
import HeaderPageEmployee from "./HeaderPageEmployee"
import { Link, useHistory } from "react-router-dom"
import Footer from "../home/Footer"
import Menu from "./Menu"
import { Container, Col,Row,Form,
    FormControl,
    Button } from "react-bootstrap"
import ManageOrders from "./ManageOrders"

const HomeEmployee = () => {
    const dispatch = useDispatch()
    const [sDT, setSDT] = useState("")
    const [maDH, setMaDH] = useState("")
    const history = useHistory()
    let user = useSelector(userSelector)

    let now = new Date()
    let yearNow = now.getFullYear();
    let monthNow = now.getMonth() + 1;

    useEffect(() => {
        dispatch(loadUser())
    }, [dispatch])


    const onSubmitSearchSDT = (event) => {
        event.preventDefault()
        if(sDT==""){
            history.push('/employee/home')
        }else{
            history.push(`/employee/orders/search/SDT/${sDT}`)
        }
        
    }
    const onSubmitSearchMaDH = (event) => {
        event.preventDefault()
        if(maDH==""){
            history.push('/employee/home')
        }else{
            history.push(`/employee/orders/search/MaHD/${maDH}`)
        }
        
    }
    return (
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
                <Col xl={10} lg={9}>
                    <div className="d-flex flex-row mb-3">
                            <div className="d-flex flex-row" style={{flex:'1', margin:'0 auto'}}>
                            <Form className="d-flex" onSubmit={onSubmitSearchSDT} >
                                <FormControl
                                    style={{width:'200px'}}
                                    type="search"
                                    placeholder="Tìm kiếm theo SĐT"
                                    aria-label="Search"
                                    name="searchSDT"
                                    value={sDT}
                                    onChange={(e) => setSDT(e.target.value)}
                                    
                                />
                                <Button type='submit'> <span style={{ color: 'white' }}>
                                    <i className="fas fa-search"></i>
                                </span></Button>
                            </Form>
                            </div>
                            <div className="d-flex flex-row" style={{flex:'1', margin:'0 auto'}}>
                            <Form className="d-flex" onSubmit={onSubmitSearchMaDH} >
                                <FormControl
                                    style={{width:'200px'}}
                                    type="search"
                                    placeholder="Tìm kiếm theo mã số"
                                    aria-label="Search"
                                    name="searchMaDonHang"
                                    value={maDH}
                                    onChange={(e) => setMaDH(e.target.value)}
                                    
                                />
                                <Button type='submit'> <span style={{ color: 'white' }}>
                                    <i className="fas fa-search"></i>
                                </span></Button>
                            </Form>
                            </div>
                            <div className="d-flex flex-row" style={{flex:'4'}}>                            
                            <div style={{flex:'1', textAlign:'center'}}>
                            <Button  variant="info" style={{flex:'1'}}
                            onClick={() =>
                                history.push(`/employee/order/status/0`)
                              }
                            >Chưa xác nhận</Button>
                            </div>
                            <div style={{flex:'1', textAlign:'center'}}>
                            <Button  variant="info" 
                            onClick={() =>
                                history.push(`/employee/order/status/1`)
                              }
                            >Đã xác nhận</Button>
                            </div>
                            <div style={{flex:'1', textAlign:'center'}}>
                            <Button  variant="info" style={{flex:'1'}}
                            onClick={() =>
                                history.push(`/employee/order/status/2`)
                              }
                            >Đang giao</Button>
                            </div>
                            <div style={{flex:'1', textAlign:'center'}}>
                            <Button  variant="info" style={{flex:'1'}}
                            onClick={() =>
                                history.push(`/employee/order/status/3`)
                              }
                            >Đã giao</Button>
                            </div>
                            <div style={{flex:'1', textAlign:'center'}}>
                            <Button  variant="info" style={{flex:'1'}}
                            onClick={() =>
                                history.push(`/employee/order/status/4`)
                              }
                            >Đã hủy</Button>
                            </div>
                            </div>                            
                    </div>
                    <ManageOrders />
                </Col>
                </Row>
            </Container>
            <Footer/>
        </div>
    )
}

export default HomeEmployee;