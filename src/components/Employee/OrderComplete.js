import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import ReactPaginate from "react-paginate"
import { useParams } from "react-router"
import { FormControl,Button, Form, Card,Table } from "react-bootstrap"
import { loadUser,userSelector } from "../../reducers/Account/LoginForm"
import { loadOrdersComplete, loadOrdersHandle, ordersSelector, updateOrder} from "../../reducers/Orders/orders"
import { voucherSelector, loadAllVoucher } from "../../reducers/Voucher/voucher"
import { Link, useHistory } from "react-router-dom"

const OrdersComplete =() =>{

    const dispatch = useDispatch()
    const user = useSelector(userSelector)
    const vouchers = useSelector(voucherSelector)
    const orders = useSelector(ordersSelector)
    const { year, month } = useParams()
    const [pageNumber, setPageNumber] = useState(0)
    const todoPerPage = 12
    const pagesVisited = pageNumber * todoPerPage
    const pageCount = Math.ceil(orders.length / todoPerPage)
    const history = useHistory()

    
    useEffect(() => {
    dispatch(loadOrdersComplete({year,month}))
    }, [dispatch,year,month])

    useEffect(() => {
        dispatch(loadUser())
        dispatch(loadAllVoucher())
    }, [dispatch])

    
    var string = ""
    if(month<10){
        string = "0"+month
    }

    const [time, setTime] = useState(year+"-"+string)

    



    const [activeDetail, setActiveDetail] = useState({
        active: false,
        index:0
    })
    var tongThuNhap = 0
    

    for(let i= 0;i<orders.length;i++){
        var tongHoaDon =0
        for(let j= 0; j < orders[i].detail.length; j++ ){
            tongHoaDon = +tongHoaDon + orders[i].detail[j].quantity*orders[i].detail[j].price
        }
        for(let x=0;x<vouchers.length;x++){
            if(vouchers[x].id_voucher == orders[i].id_voucher){
                tongHoaDon = +tongHoaDon - tongHoaDon*vouchers[x].discount/100
            }
        }
        tongThuNhap = tongThuNhap + tongHoaDon

    }

    const showListOrder = orders
    .slice(pagesVisited, pagesVisited + todoPerPage)
    .map((order,index)=>{
        
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
        
        return(
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
              
            </tr>
            {
                (activeDetail.active && activeDetail.index === index) && (
                    <tr  key={index}>
                    <td colSpan={8}>
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
    })


    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }
    

    const onSubmitSearch = (event) => {
        event.preventDefault()
        const thoiGian = time.split("-")
        history.push(`/employee/order/complete/${+thoiGian[0]}/${+thoiGian[1]}`)
    }

    return(
        <>
        
                    
                    <Card>
                    <Card.Title className="border-bottom p-3 mb-0 d-flex flex-row ">
                            <h3 style={{color:'green', margin:'10px auto'}} >Danh thu theo tháng </h3>
                    </Card.Title>
                    <Form onSubmit={onSubmitSearch} className="d-flex flex-row" style={{textAlign:'center'}}>
                        <FormControl type='month' name='month' value={time} onChange={(e) => setTime(e.target.value)} style={{width:'20%'}} >
                        </FormControl>
                        <Button type='submit'> <span style={{ color: 'white' }}>
                                    <i className="fas fa-search"></i>
                        </span></Button>
                    </Form>
                    
                    <Card.Body className="show-item d-flex flex-column">
                        
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
                            </tr>
                        </thead>
                        <tbody>
                            {showListOrder}
                        </tbody>
                        
                        </Table>
                        {/* {tinhTongThuNhap} */}
                        <h3 style={{color:'red', textAlign:'right'}}>Tổng danh thu trong tháng: {tongThuNhap.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</h3>
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

 
            
        </>
    )

}

export default OrdersComplete