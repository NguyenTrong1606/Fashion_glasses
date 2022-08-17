import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import ReactPaginate from "react-paginate"
import { useParams } from "react-router"
import HeaderPageEmployee from "./HeaderPageEmployee"
import Footer from "../home/Footer"
import { Link, useHistory } from "react-router-dom"
import { Col, Container, Row,Button, Form, Card,Table,FormControl } from "react-bootstrap"
import { loadUser,userSelector } from "../../reducers/Account/LoginForm"
import { loadOrdersHandle, ordersSelector, updateOrder} from "../../reducers/Orders/orders"
import { voucherSelector, loadAllVoucher } from "../../reducers/Voucher/voucher"
import Menu from "./Menu"

const SearchOrderbySDT =() =>{

    const dispatch = useDispatch()
    const user = useSelector(userSelector)
    const [sDT, setSDT] = useState("")
    const history = useHistory()
    const vouchers = useSelector(voucherSelector)
    const orders = useSelector(ordersSelector)

    let now = new Date()
    let yearNow = now.getFullYear();
    let monthNow = now.getMonth() + 1;

    const [pageNumber, setPageNumber] = useState(0)
    const { phone_number } = useParams()
    const todoPerPage = 12
    const pagesVisited = pageNumber * todoPerPage
    const pageCount = Math.ceil(orders.length / todoPerPage)
    useEffect(() => {
        dispatch(loadUser())
        dispatch(loadOrdersHandle())
        dispatch(loadAllVoucher())
    }, [dispatch])

    const [activeDetail, setActiveDetail] = useState({
        active: false,
        index:0
    })

    const updateStatusOrder = (id_order, status) => {
        const order = {
            id_order,
            status,
        }
        dispatch(updateOrder(order))
    }

    

    const showListOrder = orders.slice(pagesVisited, pagesVisited + todoPerPage).map((order,index)=>{
        
        var STT = index + 1
        var tong = 0
        var chietKhau = 0
        
        
         
        const ShowDeltail = order.detail.map((orderDetail)=>{
            tong = tong + orderDetail.price * orderDetail.quantity
            return(
                <tr key={orderDetail.id_product} style={{textAlign: 'center', color:'blue', fontWeight:'600'}}>
                  <td style={{textAlign: 'left'}}>{orderDetail.name_product}</td>
                  <td>{orderDetail.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</td>
                  <td >{orderDetail.quantity}</td>
                  
                </tr>
            )
            
        })
        const Discount = vouchers.map((voucher)=>{
            if(voucher.id_voucher === order.id_voucher){
                chietKhau = voucher.discount
            }
        })
        let changListOrder
        if(order.account.phone_number.indexOf(phone_number) !== -1){
            changListOrder=(
                <>
                <tr key={order.id_order} style={{textAlign: 'center', color:'blue', fontWeight:'600'}}>
                    <td>{STT}</td>
                    <td >{order.id_order}</td>
                    <td>{order.account.full_name}</td>
                    <td>{order.account.phone_number}</td>
                    <td style={{textAlign: 'left'}}>{order.address}</td>
                    <td>{order.day} - {order.time}</td>
                    <td className="d-flex flex-column">
                        {order.status===0 && <h6 style={{lineHeight:'100px'}}>chờ xác nhận</h6>}
                        {order.status===1 && <h6 style={{lineHeight:'100px'}}>Đã xác nhận</h6>}
                        { order.status===2 && <h6 style={{lineHeight:'100px'}}>Đang giao</h6>}
                        {order.status===3 && <h6 style={{lineHeight:'100px'}}>Đã giao</h6>}
                        {order.status===4 && <h6 style={{lineHeight:'100px'}}>Shop hủy đơn</h6>}
                        
                    </td>
                    <td><Button variant="link" 
                        onClick={() =>
                            setActiveDetail({
                                active:!activeDetail.active,
                                index: index
                            })
                        }
                    >Xem chi tiết</Button></td>
                    <td>
                                {order.status===0 && <Button variant="success" 
                                    onClick={() =>
                                        updateStatusOrder(
                                            order.id_order,
                                            1
                                        )
                                    }
                                > XÁC NHẬN </Button>}
                                { order.status===1 && <Button variant="success" 
                                    onClick={() =>
                                        updateStatusOrder(
                                            order.id_order,
                                            2
                                        )
                                    }
                                > ĐANG GIAO </Button>}
                                {order.status===2 && <Button variant="success" 
                                    onClick={() =>
                                        updateStatusOrder(
                                            order.id_order,
                                            3
                                        )
                                    }
                                > ĐÃ GIAO </Button>}

                    </td>
                    <td><Button variant="danger" onClick={() =>
                                        updateStatusOrder(
                                            order.id_order,
                                            4
                                        )
                                    }
                                >
                            <i className="far fa-trash-alt fa-x"   
                            ></i>
                        </Button>
                    </td>
                    </tr>
                    {
                        (activeDetail.active && activeDetail.index === index) && (
                            <tr  key={index}>
                            <td colSpan={10}>
                                <Card>
                                    <Card.Title className="border-bottom p-3 mb-0 d-flex flex-row ">
                                            <h3 style={{color:'green', margin:'10px auto'}} >Chi tiết đơn hàng</h3>
                                    </Card.Title>
                                    <Card.Body className="show-item">
                                        <Table bordered>
                                        <thead>
                                            <tr style={{textAlign: 'center'}}>
                                                <th style={{width:'40%', lineHeight:'28px',textAlign: 'left'}}>Tên Sản phẩm</th>
                                                <th style={{width:'2%', lineHeight:'28px'}}>Giá</th>
                                                <th style={{width:'15%', lineHeight:'28px'}}>Số lượng</th>   
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ShowDeltail}
                                        </tbody>
                                        </Table>
                                    </Card.Body>
                                    <div className="d-flex flex-column mb-3">
                                        <div className="d-flex flex-row" style={{height:'50px'}}>
                                            <h4 style={{flex:'3', lineHeight:'50px', color:'red',textAlign:'right'}}>Tổng:</h4>
                                            <h5 style={{flex:'1', lineHeight:'50px', color:'blue', textAlign:'center'}}>{tong.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</h5>
                                        </div>
                                        <div className="d-flex flex-row" style={{height:'50px'}}>
                                            <h4 style={{flex:'3', lineHeight:'50px', color:'red',textAlign:'right'}}>Chiết khấu:</h4>
                                            <h5 style={{flex:'1', lineHeight:'50px', color:'blue', textAlign:'center'}}>
                                                {chietKhau}%
                                            </h5>
                                        </div>
                                        <div className="d-flex flex-row" style={{height:'50px'}}>
                                            <h4 style={{flex:'3', lineHeight:'50px', color:'red',textAlign:'right'}}>Thành Tiền:</h4>
                                            <h5 style={{flex:'1', lineHeight:'50px', color:'blue', textAlign:'center'}}>{(tong-tong*chietKhau/100).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</h5>
                                        </div>
                                    </div>
                                </Card>
                            </td>
                            
                        </tr>
                        )
                    }
                    
                </>
            )
        }
        else{
            changListOrder=(<></>)
        }
        return(
            <>
            
                {changListOrder}
            
            </>

        )
    })


    const changePage = ({ selected }) => {
        setPageNumber(selected)


    }

    const onSubmitSearch = (event) => {
        event.preventDefault()
        if(sDT==""){
            history.push('/employee/home')
        }else{
            history.push(`/employee/orders/search/${sDT}`)
        }
        
    }


    return(
        <>

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
 
            <Card>
            <Card.Title className="border-bottom p-3 mb-0 d-flex flex-row ">
                    <h3 style={{color:'green', margin:'10px auto'}} >Danh sách đơn hàng cần xử lý </h3>
            </Card.Title>
            <Card.Body className="show-item">
                <Table bordered>
                <thead>
                    <tr style={{textAlign: 'center'}}>
                    <th style={{width:'2%', lineHeight:'32px'}}>#</th>
                    <th style={{width:'5%', lineHeight:'32px'}}>Mã số</th>
                    <th style={{width:'12%', lineHeight:'32px'}}>Tên Khách Hàng</th>
                    <th style={{width:'12%', lineHeight:'32px'}}>SĐT</th>
                    <th style={{width:'20%', lineHeight:'32px',textAlign: 'left'}}>Địa chỉ giao hàng</th>
                    <th style={{width:'13%', lineHeight:'32px'}}>Ngày đặt hàng</th>
                    <th style={{width:'10%', lineHeight:'32px'}}>Trạng thái</th>
                    <th style={{width:'10%', lineHeight:'32px'}}>chi tiết</th>
                    <th style={{width:'10%', lineHeight:'32px'}}>Xử lý</th>
                    <th style={{width:'6%', lineHeight:'32px'}}>Hủy</th>
                    </tr>
                </thead>
                <tbody>
                    {showListOrder}
                </tbody>
                
                </Table>
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
                </Row>
            </Container>
            <Footer/>
        </div>
        </>
    )

}

export default SearchOrderbySDT 