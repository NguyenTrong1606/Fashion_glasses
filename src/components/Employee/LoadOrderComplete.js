import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Footer from "../home/Footer"
import { Col, Container, Row,Button, Form, Card,Table } from "react-bootstrap"
import { loadUser,userSelector } from "../../reducers/Account/LoginForm"

import HeaderPageEmployee from "./HeaderPageEmployee"
import Menu from "./Menu"
import OrdersComplete from "./OrderComplete"

const LoadOrderComplete =() =>{

    const dispatch = useDispatch()
    const user = useSelector(userSelector)


    
    
    
    useEffect(() => {
        dispatch(loadUser())
        
    }, [dispatch])

    

    
    return(
        <>
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
                    <OrdersComplete/>
                    
                </Col>
                </Row>
            </Container>
            <Footer/>
 
            
        </>
    )

}

export default LoadOrderComplete