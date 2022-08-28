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
import * as types from "../.././contains/types"
import FetchCategory from '../Category/category'
import FetchBand from '../Brand/brand'
import { loadUser, setLogout } from '../../reducers/Account/LoginForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'


const Header = ({
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

    function convertViToEn(str, toUpperCase = false) {
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); 
        str = str.replace(/\u02C6|\u0306|\u031B/g, ""); 
    
        return toUpperCase ? str.toUpperCase() : str;
    }

    const onSubmitSearch = (event) => {
        event.preventDefault()
        const formmatSearch = convertViToEn(search.toLowerCase().replace(/\s+/g, ' ').trim())
        history.push(`/search/${formmatSearch}`)
        localStorage.removeItem('link')
    }
    let changeLoginToLogout
    if (localStorage[types.LOCAL_STORAGE_TOKEN_NAME]) {

        if(role===0){
            changeLoginToLogout = (
                <>
                    
                    <Dropdown.Item
                        as={Link}
                        to={{
                            pathname: "/update/customer",
                            state: {
                                full_name,
                                email,
                                phone_number,
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
                    <Dropdown.Item as={Link} to="/account/my-order">
                        Đơn hàng của tôi
                    </Dropdown.Item>
                    <Dropdown.Item
                        as={Link}
                        to="/"
                        onClick={() => {
                            dispatch(setLogout())
                            localStorage.removeItem('link')
                            localStorage.removeItem('idBrand')
                            localStorage.removeItem('nameBrand')
                            localStorage.removeItem('idCategory')
                            localStorage.removeItem('nameCategory')
                        }}
                     >
                        Đăng xuất
                    </Dropdown.Item>
                    
                </>
                )
        }else{
            changeLoginToLogout = (
                <>
                    
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
                    <Dropdown.Item as={Link} to="/account/my-order">
                        Đơn hàng của tôi
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/employee/home">
                        Trang quản lý
                    </Dropdown.Item>
                    <Dropdown.Item
                        as={Link}
                        to="/"
                        onClick={() => dispatch(setLogout())}
                     >
                            Đăng xuất
                    </Dropdown.Item>
                    
                </>
                )
        }
            
    }
    else {
            changeLoginToLogout = (
                <>
                    <Dropdown.Item as={Link} to="/login">
                        Đăng Nhập
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/register">
                        Đăng ký
                    </Dropdown.Item>
                </>
            )
    }


    return (
        <>
            <Navbar expand="lg">
            <Container fluid>
                    <Navbar.Brand>
                        <label htmlFor='nav-mobile-input'>
                        <Link to="/" onClick={()=>{localStorage.removeItem('link')
                            // localStorage.removeItem('idBrand')
                            // localStorage.removeItem('nameBrand')
                            // localStorage.removeItem('idCategory')
                            // localStorage.removeItem('nameCategory')
                        }}>
                            <img
                                className="title"
                                src={glassesIcon}
                                alt="glassesIcon"
                                style={{ width: '60px', height: '60px' }}
                            />
                        </Link>
                        </label>
                    </Navbar.Brand>
                        
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        {/* <FetchCategory/>
                        <FetchBand/> */}
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
                        {localStorage[types.LOCAL_STORAGE_TOKEN_NAME] ?
                            <Button className="btn_cart" style={{ marginRight: '20px' }} onClick={()=>history.push('/cart')}><FontAwesomeIcon icon={faCartShopping} /></Button>:<></>
                        }
                            <Dropdown>
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
                                {/* <Dropdown.Toggle
                                    id="dropdown-basic1"
                                >
                                    <span style={{ color: 'white' }}>
                                    <i className="fas fa-user-alt"></i>
                                    </span>
                                </Dropdown.Toggle> */}
                                <Dropdown.Menu align={{ md: "end" }}>
                                {changeLoginToLogout}
                                
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
