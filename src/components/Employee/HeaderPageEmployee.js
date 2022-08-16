import {React,useEffect, useState } from 'react'
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
import { useDispatch } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import glassesIcon from "../../assets/logo.png"


import { loadUser, setLogout } from '../../reducers/Account/LoginForm'



const HeaderPageEmployee = ({
    full_name,
    email,
    phone_number,
    identification,
    date_of_birth,
    address,
    avatar,
    gender,
    role,
}
) =>{
    const dispatch = useDispatch()
    const [search, setSearch] = useState("")
    const history = useHistory()

    useEffect(() => {
        dispatch(loadUser())
    }, [dispatch])

    const onSubmitSearch = (event) => {
        event.preventDefault()
        history.push(`/search/${search}`)
    }
    // let changeMenu


    //     if(role===1){
    //         changeMenu = (
    //             <>
    //             <Dropdown.Item
    //                     as={Link}
    //                     to={{
    //                         pathname: "/update/employee",
    //                         state: {
    //                             full_name,
    //                             email,
    //                             phone_number,
    //                             identification,
    //                             date_of_birth,
    //                             address,
    //                             avatar,
    //                             gender,
    //                         },
    //                     }}
    //                 >
    //                     Cập nhật thông tin
    //                 </Dropdown.Item>
    //                 <Dropdown.Item as={Link} to="/change/password">
    //                     Thay đổi mật khẩu
    //                 </Dropdown.Item>
    //                 <Dropdown.Item
    //                     as={Link}
    //                     to="/"
    //                     onClick={() => dispatch(setLogout())}
    //                  >
    //                         Đăng xuất
    //                 </Dropdown.Item>
                       
                    
    //             </>
    //             )
    //     }else{
    //         changeMenu = (
    //             <>
                    
    //                 <Dropdown.Item
    //                     as={Link}
    //                     to={{
    //                         pathname: "/update/employee",
    //                         state: {
    //                             full_name,
    //                             email,
    //                             phone_number,
    //                             identification,
    //                             date_of_birth,
    //                             address,
    //                             avatar,
    //                             gender,
    //                         },
    //                     }}
    //                 >
    //                     Cập nhật thông tin
    //                 </Dropdown.Item>
    //                 <Dropdown.Item as={Link} to="/change/password">
    //                     Thay đổi mật khẩu
    //                 </Dropdown.Item>
    //                 <Dropdown.Item as={Link} to="/employee/register">
    //                     Thêm Tài Khoản Nhân Viên 
    //                 </Dropdown.Item>
    //                 <Dropdown.Item
    //                     as={Link}
    //                     to="/"
    //                     onClick={() => dispatch(setLogout())}
    //                  >
    //                         Đăng xuất
    //                 </Dropdown.Item>
                    
    //             </>
    //             )
    //     }
            
    


    return (
        <>
            <Navbar expand="lg">
            <Container fluid>
                    <Navbar.Brand style={{flex:'2'}}>
                        <label htmlFor='nav-mobile-input'>
                        <Link to="/">
                            <img
                                className="title"
                                src={glassesIcon}
                                alt="glassesIcon"
                                style={{ width: '60px', height: '60px' }}
                            />
                        </Link>
                        </label>
                    </Navbar.Brand>
                     <Navbar.Brand style={{flex:'6'}}></Navbar.Brand>   
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll" style={{flex:'1'}}>                        
                        <Nav className='topNav-right' style={{textAlign:'right'}}>
                            <Dropdown>
                                {console.log(avatar)}
                                {avatar?
                                <Dropdown.Toggle className="dropdown-basic">
                                <img className="dropdown-basic1" src={avatar}></img>
                                </Dropdown.Toggle>:
                                <Dropdown.Toggle
                                    className="dropdown-basic3"
                                >
                                    <span style={{ color: 'white' }}>
                                    <i className="fas fa-user-alt"></i>
                                    </span>
                                </Dropdown.Toggle>
                                
                                }
                                <Dropdown.Menu align={{ md: "end" }}>

                                {/* {changeMenu} */}
                                <Dropdown.Item
                                            as={Link}
                                            to={{
                                                pathname: "/update/employee",
                                                state: {
                                                    full_name,
                                                    email,
                                                    phone_number,
                                                    identification,
                                                    date_of_birth,
                                                    address,
                                                    avatar,
                                                    gender,
                                                },
                                            }}
                                        >
                                            Cập nhật thông tin
                                        </Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/change/password">
                                            Thay đổi mật khẩu
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            as={Link}
                                            to="/"
                                            onClick={() => dispatch(setLogout())}
                                        >
                                                Đăng xuất
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

export default HeaderPageEmployee;