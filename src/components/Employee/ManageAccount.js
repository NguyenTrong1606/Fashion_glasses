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
import RegisterEmployeeForm from "./RegisterEmployeeForm"


const ManageAccount = () => {
    const dispatch = useDispatch()
    const [sDT, setSDT] = useState("")
    const history = useHistory()
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
            <Container fluid style={{ marginTop: '90px', minHeight: '85vh' }}>
                <Row>
                <Menu />
                <Col xl={10} lg={9}>
                    <RegisterEmployeeForm />
                </Col>
                </Row>
            </Container>
            <Footer/>
        </div>
    )
}

export default ManageAccount;