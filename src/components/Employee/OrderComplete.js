import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import ReactPaginate from "react-paginate"
import { useParams } from "react-router"
import { FormControl,Button, Form, Card,Table, FormGroup } from "react-bootstrap"
import { loadUser,userSelector } from "../../reducers/Account/LoginForm"
import { loadOrdersByStatus, loadOrdersComplete, loadOrdersHandle, ordersSelector, updateOrder} from "../../reducers/Orders/orders"
import { voucherSelector, loadAllVoucher } from "../../reducers/Voucher/voucher"
import { Link, useHistory, useLocation } from "react-router-dom"
import { toastError } from "../../Toast/Toast"

const OrdersComplete =() =>{

    const dispatch = useDispatch()
    const user = useSelector(userSelector)
    const vouchers = useSelector(voucherSelector)
    const orders = useSelector(ordersSelector)
    const location = useLocation()
    const [pageNumber, setPageNumber] = useState(0)
    const [activeFormAll, setActiveFormAll] = useState(false)
    const todoPerPage = 12
    const pagesVisited = pageNumber * todoPerPage
    const pageCount = Math.ceil(orders.length / todoPerPage)
    const history = useHistory()
    let dateFirst = new Date(location.state.firstDay)
    let dateLast = new Date(location.state.lastDay)
    var firstDate = dateFirst.getDate()
    var firstMonth = dateFirst.getMonth() + 1
    var lastDate = dateLast.getDate()
    var lastMonth = +dateLast.getMonth() + 1
    if(firstDate <10){
        firstDate = "0" + firstDate
    }
    if(firstMonth <10){
        firstMonth = "0" + firstMonth
    }
    if(lastDate <10){
        lastDate = "0" + lastDate
    }
    if(lastMonth <10){
        lastMonth = "0" + lastMonth
    }
    
    var firstDay = dateFirst.getFullYear() + "-" + firstMonth + "-" + firstDate
    var lastDay = dateLast.getFullYear() + "-" + lastMonth + "-" + lastDate
    
    const [formData , setFormData] = useState({
        firstDay: firstDay,
        lastDay: lastDay
    })


    
    useEffect(() => {
        dispatch(loadOrdersByStatus(3))
    }, [dispatch])

    useEffect(() => {
        dispatch(loadUser())
        dispatch(loadAllVoucher())
    }, [dispatch])

    var tongThuNhapTheoTime = 0
    

    for(let i= 0;i<orders.length;i++){
        var tongHoaDon =0
        let array_time = orders[i].day.split("/");
        let day = new Date(array_time[2]+"-"+array_time[1]+"-"+array_time[0])
        if(dateFirst.getTime() <= day.getTime() && day.getTime()<= dateLast.getTime()){
        for(let j= 0; j < orders[i].detail.length; j++ ){
            tongHoaDon = +tongHoaDon + orders[i].detail[j].quantity*orders[i].detail[j].price
        }
        for(let x=0;x<vouchers.length;x++){
            if(vouchers[x].id_voucher == orders[i].id_voucher){
                tongHoaDon = +tongHoaDon - tongHoaDon*vouchers[x].discount/100
            }
        }}
        tongThuNhapTheoTime = tongThuNhapTheoTime + tongHoaDon

    }

    const showListOrder = orders
    // .slice(pagesVisited, pagesVisited + todoPerPage)
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

        let loadOrder
        let array_time = order.day.split("/");
        let day = new Date(array_time[2]+"-"+array_time[1]+"-"+array_time[0])
        if(dateFirst.getTime() <= day.getTime() && day.getTime()<= dateLast.getTime()){
            loadOrder =(
                <>
            <tr key={order.id_order} style={{textAlign: 'center', color:'blue', fontWeight:'600'}}>
              <td>{STT}</td>
              <td >{order.id_order}</td>
              <td>{order.account.full_name}</td>
              <td>{order.account.phone_number}</td>
              <td>{order.day} - {order.time}</td>              
              <td>              
              {(tong-tong*chietKhau/100).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}
              </td>
              
            </tr>
            </>
            )
        }else{
            loadOrder=(<></>)
        }
        return(
            loadOrder

        )
    })


    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }
    

    const onSubmitSearch = (event) => {
        event.preventDefault()
        if(new Date(formData.firstDay).getTime() > new Date(formData.lastDay).getTime()){
            toastError("Chọn ngày không hợp lệ")
            return
        }
        history.push({
            pathname:`/employee/order/complete`,
            state: {
                firstDay: formData.firstDay,
                lastDay: formData.lastDay
            },
                            
        })
    }



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

    const showListOrderAll = orders
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
            <tr key={order.id_order} style={{textAlign: 'center', color:'blue', fontWeight:'600'}}>
                <td>{STT}</td>
                <td >{order.id_order}</td>
                <td>{order.account.full_name}</td>
                <td>{order.account.phone_number}</td>
                <td>{order.day} - {order.time}</td>              
                <td>              
                {(tong-tong*chietKhau/100).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}
                </td>
                
          </tr>)
            
            
    })

    return(
        <>
        {!activeFormAll && <>        
            <Card>
            <Card.Title className="border-bottom p-3 mb-0 d-flex flex-row ">
                    <h3 style={{color:'green', margin:'10px auto'}} >Danh thu từ {firstDate}/{firstMonth}/{dateFirst.getFullYear()} đến {lastDate}/{lastMonth}/{dateLast.getFullYear()} </h3>
            </Card.Title>
            <div className="border-bottom p-3 mb-0 d-flex flex-row ">
            <Form onSubmit={onSubmitSearch} className="d-flex flex-row mt-3 mb-3" style={{textAlign:'center',flex:'8'}}>
                <FormGroup className="d-flex flex-row" style={{flex:'1',textAlign:'left'}}>
                    <Form.Label style={{lineHeight:'38px', margin:'0 10px', fontWeight:'500'}}>Từ ngày:</Form.Label>
                    <FormControl type='date' name='firstDay' value = {formData.firstDay}
                     onChange={(e) => setFormData({
                        ...formData,
                        [e.target.name]: e.target.value
                     })} 
                    style={{width:'70%'}} >
                    </FormControl>
                    
                </FormGroup>
                
                <FormGroup className="d-flex flex-row" style={{flex:'1',textAlign:'left'}}>
                    <Form.Label style={{lineHeight:'38px', margin:'0 10px', fontWeight:'500'}}>Đến ngày:</Form.Label>
                    <FormControl type='date' name='lastDay' value = {formData.lastDay}
                     onChange={(e) => setFormData({
                        ...formData,
                        [e.target.name]: e.target.value
                     })} 
                    style={{width:'70%'}} >
                    </FormControl>
                    
                </FormGroup>
                <Button type='submit'> <span style={{ color: 'white' }}>
                            <i className="fas fa-search"></i>
                </span></Button>
                <div style={{flex:'1',}}></div>
            </Form>
            <div className="mt-3 mb-3" style={{flex:'1'}}><Button style={{textAlign:'center'}}
            onClick={()=>{
                history.push(`/employee/order/chart/${new Date().getFullYear()}`)
            }}
            >Biểu đồ</Button></div>
            <div className="mt-3 mb-3" style={{flex:'1'}}><Button style={{textAlign:'center'}}
            onClick={()=>{
                setActiveFormAll(true)
            }}
            >Tổng Doanh Thu</Button></div>
            </div>
            
            
            <h3 style={{color:'red', textAlign:'right'}}>Tổng danh thu: {tongThuNhapTheoTime.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</h3>
            
            <Card.Body className="show-item d-flex flex-column">
                
                <Table bordered>
                <thead>
                    <tr style={{textAlign: 'center'}}>
                    <th style={{width:'2%', lineHeight:'32px'}}>#</th>
                    <th style={{width:'5%', lineHeight:'32px'}}>Mã số</th>
                    <th style={{width:'12%', lineHeight:'32px'}}>Tên Khách Hàng</th>
                    <th style={{width:'12%', lineHeight:'32px'}}>SĐT</th>
                    <th style={{width:'13%', lineHeight:'32px'}}>Ngày đặt hàng</th>
                    <th style={{width:'10%', lineHeight:'32px'}}>Tổng tiền</th>
                    </tr>
                </thead>
                <tbody>
                    {showListOrder}
                </tbody>
                
                </Table>
                
            </Card.Body>
            
            </Card>
            </>}
            {activeFormAll && <>        
            <Card>
            <Card.Title className="border-bottom p-3 mb-0 d-flex flex-row ">
                    <h3 style={{color:'green', margin:'10px auto'}} >Tổng doanh thu </h3>
            </Card.Title>
            <div className="border-bottom p-3 mb-0 d-flex flex-row ">
            <div className="mt-3 mb-3" style={{flex:'8'}}></div>
            <div className="mt-3 mb-3" style={{flex:'1'}}><Button style={{textAlign:'center'}}
            onClick={()=>{
                history.push(`/employee/order/chart/${new Date().getFullYear()}`)
            }}
            >Biểu đồ</Button></div>
            <div className="mt-3 mb-3" style={{flex:'1'}}><Button style={{textAlign:'center'}}
            onClick={()=>{
                setActiveFormAll(false)
            }}
            >Back</Button></div>
            </div>
            
            
            <h3 style={{color:'red', textAlign:'right'}}>Tổng danh thu: {tongThuNhap.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</h3>
            
            <Card.Body className="show-item d-flex flex-column">
                
                <Table bordered>
                <thead>
                    <tr style={{textAlign: 'center'}}>
                    <th style={{width:'2%', lineHeight:'32px'}}>#</th>
                    <th style={{width:'5%', lineHeight:'32px'}}>Mã số</th>
                    <th style={{width:'12%', lineHeight:'32px'}}>Tên Khách Hàng</th>
                    <th style={{width:'12%', lineHeight:'32px'}}>SĐT</th>
                    <th style={{width:'13%', lineHeight:'32px'}}>Ngày đặt hàng</th>
                    <th style={{width:'10%', lineHeight:'32px'}}>Tổng tiền</th>
                    </tr>
                </thead>
                <tbody>
                    {showListOrderAll}
                </tbody>
                
                </Table>
                
            </Card.Body>
            
            </Card>


    
            </>

            }
        </>
        
    )

}

export default OrdersComplete