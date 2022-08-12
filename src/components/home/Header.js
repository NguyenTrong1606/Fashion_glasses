import {React, useState } from 'react'
import {
    Navbar,
    Container,
    Form,
    FormControl,
    Button,
    Dropdown,
    NavDropdown,
    Nav
} from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import userAvatar from "../../assets/user.png"
import glassesIcon from "../../assets/logo.png"
import FetchCategory from '../Category/category'
import FetchBand from '../Brand/brand'



const Header = () =>{
    const dispatch = useDispatch()
    const [search, setSearch] = useState("")
    const history = useNavigate()
    const onSubmitSearch = (event) => {
        event.preventDefault()
        history(`/search/${search}`)
    }
    return (
        <>
            <Navbar expand="lg">
            <Container fluid>
                    <Navbar.Brand>
                        <label htmlFor='nav-mobile-input'>
                            <img
                                className="title"
                                src={glassesIcon}
                                alt="glassesIcon"
                                style={{ width: '60px', height: '60px' }}
                            />
                        </label>
                    </Navbar.Brand>
                        
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <FetchCategory/>
                        <FetchBand/>
                        <Nav style={{ marginTop: '10px' }} className="me-auto my-2 my-lg-0">
                            <Form className="d-flex search" onSubmit={onSubmitSearch} >
                                <FormControl
                                    type="search"
                                    placeholder="Tìm kiếm sản phẩm"
                                    className="me-2 inputSearch"
                                    aria-label="Search"
                                    name="search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    
                                />
                                <Button type='submit' id="dropdown-basic2" className="btn_search"> <span style={{ color: 'white' }}>
                                    <i className="fas fa-search"></i>
                                </span></Button>
                            </Form>
                        </Nav>
                        <Nav className='topNav-right'>
                            <Dropdown>
                                <Dropdown.Toggle
                                    id="dropdown-basic1"
                                >
                                    <span style={{ color: 'white' }}>
                                    <i className="fas fa-user-alt"></i>
                                    </span>
                                </Dropdown.Toggle>
                                {/* {changeLoginToLogout} */}
                                <Dropdown.Menu>
                                    <Dropdown.Item as={Link} to="/login">
                                        Đăng Nhập
                                    </Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/register">
                                        Đăng ký
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>

                    </Navbar.Collapse>
            </Container>
            </Navbar>
            
                
        </>
        
      );
}

export default Header;
