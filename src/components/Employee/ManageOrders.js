import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import Header from "../home/Header"
import Footer from "../home/Footer"
import { Col, Container, Row,Button, Form, Card,Table } from "react-bootstrap"
import { loadUser,userSelector } from "../../reducers/Account/LoginForm"
import { loadOrdersHandle, ordersSelector, updateOrder} from "../../reducers/Orders/orders"
import { voucherSelector, loadAllVoucher } from "../../reducers/Voucher/voucher"
import { toastError, toastSuccess } from "../.././Toast/Toast"
import { loadAccountId } from "../../utils/callerAPI"

const ManageOrrders =() =>{

    const dispatch = useDispatch()
    const user = useSelector(userSelector)
    const vouchers = useSelector(voucherSelector)
    const orders = useSelector(ordersSelector)
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

    

    const showListOrder = orders.map((order,index)=>{
        
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
              <td>{order.status < 3?<Button variant="link" 
                onClick={() =>
                    setActiveDetail({
                        active:!activeDetail.active,
                        index: index
                    })
                }
              >Xem chi tiết</Button>:<></>}</td>
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
    })

    return(
        <>
 
            <Card>
            <Card.Title className="border-bottom p-3 mb-0 d-flex flex-row ">
                    <h3 style={{color:'green', margin:'10px auto'}} >Danh sách đơn hàng của bạn </h3>
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
            </Card>
        </>
    )

}

export default ManageOrrders