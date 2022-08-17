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
    const history = useHistory()
    let user = useSelector(userSelector)

    let now = new Date()
    let yearNow = now.getFullYear();
    let monthNow = now.getMonth() + 1;

    useEffect(() => {
        dispatch(loadUser())
    }, [dispatch])


    const onSubmitSearch = (event) => {
        event.preventDefault()
        if(sDT==""){
            history.push('/employee/home')
        }else{
            history.push(`/employee/orders/search/${sDT}`)
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
                            <div className="d-flex flex-row" style={{flex:'2', margin:'0 auto'}}>
                            <Form className="d-flex" onSubmit={onSubmitSearch} >
                                <FormControl
                                    style={{width:'250px'}}
                                    type="search"
                                    placeholder="Tìm kiếm hóa đơn theo SĐT"
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
                            <div style={{flex:'1', textAlign:'center'}}>
                            <Button  variant="danger"
                            onClick={() =>
                                history.push(`/employee/order/complete/${yearNow}/${monthNow}`)
                              }
                            >Hóa Đơn Đã hoàn thành</Button>
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