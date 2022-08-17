import React, { useEffect } from "react"
import { Col, Image } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useDispatch,useSelector } from "react-redux"
import { loadUser, userSelector } from "../../reducers/Account/LoginForm"
import glassesIcon from "../../assets/logo.png"

const Menu = () => {
    const dispatch = useDispatch()
    const user = useSelector(userSelector)
    useEffect(() => {
        dispatch(loadUser())
    }, [dispatch])

    return (
        <>
            <Col xl={2} lg={3} md={0} sm={0} className="category">
                <div className='nav'>
                    <nav className='nav_pc flex-column flex-shrink-0 text-white bg-white'>
                        <h2 className="my-4 title_DM" style={{ color: '#084298' }} ><b>Danh mục</b></h2>
                        <ul className='nav_list nav nav-pills flex-column mb-auto'>
                            <li className="nav-item">
                                <Link to="/" className="nav-link text-dark" >
                                    <span className='bi me-3'>
                                        <i className="fas fa-home"></i>
                                    </span>
                                    Trang chủ
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/employee/home" className="nav-link text-dark" >
                                    <span className='bi me-3'>
                                        <i className="fas fa-heart"></i>
                                    </span>
                                    Quản lý Hóa Đơn
                                </Link>
                            </li>
                            {user.role === 2 && <li className="nav-item">
                                <Link to="/manage/account/register" className="nav-link text-dark" >
                                    <span className='bi me-3'>
                                        <i className="fas fa-heart"></i>
                                    </span>
                                    Tạo tài khoản nhân viên
                                </Link>
                            </li>}
                            <li className="nav-item">
                                <Link to="/employee/category" className="nav-link text-dark" >
                                    <span className='bi me-3'>
                                        <i className="fas fa-heart"></i>
                                    </span>
                                    Quản lý danh mục sản phẩm
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/employee/brand" className="nav-link text-dark" >
                                    <span className='bi me-3'>
                                        <i className="fas fa-heart"></i>
                                    </span>
                                    Quản lý nhãn hiệu
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="" className="nav-link text-dark" >
                                    <span className='bi me-3'>
                                        <i className="fas fa-heart"></i>
                                    </span>
                                    Quản lý sản phẩm
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/moderator/feedback" className="nav-link text-dark" >
                                    <span className='bi me-3'>
                                        <i className="fas fa-heart"></i>
                                    </span>
                                    Quản lý mã giảm giá
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>

                <input type='checkbox' hidden name='' id='nav-mobile-input' className='nav_input'></input>
                <label htmlFor='nav-mobile-input' className='nav_overplay'></label>


                <nav className='nav_mobile d-flex flex-column flex-shrink-0 p-3 text-white'>
                    <Link to="/" className="d-flex align-items-center mb-1 mb-md-0 me-md-auto text-decoration-none">
                        {/* <svg class="bi me-2" width="40" height="32"></svg> */}
                        <Image src={glassesIcon} style={{ width: '50px', height: '50px' }} className='title me-3' />
                        <span className="fs-4 text-dark">Danh mục</span>
                    </Link>
                    <label htmlFor='nav-mobile-input' className="fas fa-times nav_bar-close"></label>
                    <hr />
                    <ul className='nav_mobile-list nav nav-pills flex-column mb-auto'>
                        <li className="nav-item">
                            <Link to="/" className="nav-link text-dark" >
                                <span className='bi me-3'>
                                    <i className="fas fa-home"></i>
                                </span>
                                Trang chủ
                            </Link>
                        </li>
                        <li className="nav-item">
                                <Link to="/employee/home" className="nav-link text-dark" >
                                    <span className='bi me-3'>
                                        <i className="fas fa-heart"></i>
                                    </span>
                                    Quản lý Hóa Đơn
                                </Link>
                            </li>
                            {user.role === 2 &&
                            <li className="nav-item">
                                <Link to="/manage/account/register" className="nav-link text-dark" >
                                    <span className='bi me-3'>
                                        <i className="fas fa-heart"></i>
                                    </span>
                                    Tạo tài khoản nhân viên
                                </Link>
                            </li>}
                        <li className="nav-item">
                            <Link to="/employee/category" className="nav-link text-dark" >
                                <span className='bi me-3'>
                                    <i className="fas fa-heart"></i>
                                </span>
                                Quản lý danh mục sản phẩm
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/employee/brand" className="nav-link text-dark" >
                                <span className='bi me-3'>
                                    <i className="fas fa-heart"></i>
                                </span>
                                Quản lý nhãn hiệu
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/moderator/posts" className="nav-link text-dark" >
                                <span className='bi me-3'>
                                    <i className="fas fa-heart"></i>
                                </span>
                                Quản lý Sản phẩm
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/moderator/feedback" className="nav-link text-dark" >
                                <span className='bi me-3'>
                                    <i className="fas fa-heart"></i>
                                </span>
                                Quản lý Voucher
                            </Link>
                        </li>
                    </ul>
                    
                </nav>
                
            </Col>
        </>
    )
}

export default Menu
