import {React,useEffect} from "react"
import "../.././App.css"
import { useDispatch, useSelector } from "react-redux"
import { loadUser, userSelector } from "../../reducers/Account/LoginForm"
import HeaderPageEmployee from "./HeaderPageEmployee"
import Footer from "../home/Footer"
import Menu from "./Menu"
import { Container, Col,Row } from "react-bootstrap"
import ManageOrrders from "./ManageOrders"

const HomeEmployee = () => {
    const dispatch = useDispatch()
    let user = useSelector(userSelector)

    useEffect(() => {
        dispatch(loadUser())
    }, [dispatch])
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
                    <ManageOrrders />
                </Col>
                </Row>
            </Container>
            <Footer/>
        </div>
    )
}

export default HomeEmployee;