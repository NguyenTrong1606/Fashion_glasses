import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import ReactPaginate from "react-paginate"
import { useParams } from "react-router"
import { FormControl,Button, Form, Card,Table, FormGroup,Row, Container, Col } from "react-bootstrap"
import { loadUser,userSelector } from "../../reducers/Account/LoginForm"
import { loadOrdersByStatus, loadOrdersComplete, loadOrdersHandle, ordersSelector, updateOrder} from "../../reducers/Orders/orders"
import { voucherSelector, loadAllVoucher } from "../../reducers/Voucher/voucher"
import { Link, useHistory, useLocation } from "react-router-dom"
import { toastError } from "../../Toast/Toast"
import Chart from "react-apexcharts";
import HeaderPageEmployee from "./HeaderPageEmployee"
import Menu from "./Menu"
import Footer from "../home/Footer"

const OrdersChart=() =>{

    const dispatch = useDispatch()
    const user = useSelector(userSelector)
    const vouchers = useSelector(voucherSelector)
    const orders = useSelector(ordersSelector)
    const location = useLocation()
    const history = useHistory()
    const {year} = useParams()
    const [dataYear, setDataYear] = useState(year)

    var date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    
    useEffect(() => {
        dispatch(loadOrdersByStatus(3))
    }, [dispatch])

    useEffect(() => {
        dispatch(loadUser())
        dispatch(loadAllVoucher())
    }, [dispatch])
    
    let doanhThuThang = []

    if(year < new Date().getFullYear()){
        for(let z=0;z<12;z++){
            var thuNhapTrongThang = 0
            for(let i= 0; i<orders.length; i++){
                var tongHoaDon =0
                let array_time = orders[i].day.split("/");
                let day = new Date(array_time[2]+"-"+array_time[1]+"-"+array_time[0])
                if(year == day.getFullYear() && day.getMonth() == z){
                for(let j= 0; j < orders[i].detail.length; j++ ){
                    tongHoaDon = +tongHoaDon + orders[i].detail[j].quantity*orders[i].detail[j].price
                }
                for(let x=0;x<vouchers.length;x++){
                    if(vouchers[x].id_voucher == orders[i].id_voucher){
                        tongHoaDon = +tongHoaDon - tongHoaDon*vouchers[x].discount/100
                    }
                }}
                thuNhapTrongThang = thuNhapTrongThang + tongHoaDon
        
            }
            doanhThuThang.push(thuNhapTrongThang)
        }
    }

    if(year == new Date().getFullYear()){
        
        for(let z = 0; z <= new Date().getMonth(); z++){
            var thuNhapTrongThang = 0
            for(let i= 0; i<orders.length; i++){
                var tongHoaDon =0
                let array_time = orders[i].day.split("/");
                let day = new Date(array_time[2]+"-"+array_time[1]+"-"+array_time[0])
                if(year == day.getFullYear() && day.getMonth() == z){
                for(let j= 0; j < orders[i].detail.length; j++ ){
                    tongHoaDon = +tongHoaDon + orders[i].detail[j].quantity*orders[i].detail[j].price
                }
                for(let x=0;x<vouchers.length;x++){
                    if(vouchers[x].id_voucher == orders[i].id_voucher){
                        tongHoaDon = +tongHoaDon - tongHoaDon*vouchers[x].discount/100
                    }
                }}
                thuNhapTrongThang = thuNhapTrongThang + tongHoaDon
        
            }
            doanhThuThang.push(thuNhapTrongThang.toLocaleString('it-IT', {style : 'currency', currency : 'VND'}))
        }
    }
    
    let month = []

    for(let i= 0; i < doanhThuThang.length; i++){
        month.push(i+1)
    }

    const options= {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: month
        }
      }

    const  series= [
        {
          name: "series-1",
          data: doanhThuThang
        }
      ]
    
    const onSubmitSearch = (event) =>{
        event.preventDefault()
        history.push(`/employee/order/chart/${dataYear}`)
    }


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
                <Menu/>
                <Col xl={10} lg={9}>
                <Card>
                    <Card.Title className="border-bottom p-3 mb-0 d-flex flex-column ">
                            <h3 style={{color:'green', margin:'10px auto 0'}} >Biểu Đồ Doanh Thu Năm {year} </h3>
                            <h5 style={{color:'green', margin:'0 auto 10px'}}>{'('}Đơn vị Nghìn VND {')'}</h5>
                    </Card.Title>
                    <div className="border-bottom p-3 mb-0 d-flex flex-row ">
                    <Form onSubmit={onSubmitSearch} className="d-flex flex-row mt-3 mb-3" style={{textAlign:'center',flex:'8'}}>
                        <FormGroup className="d-flex flex-row" style={{textAlign:'left'}}>
                            <Form.Label style={{lineHeight:'38px', margin:'0 10px', fontWeight:'500'}}>Năm:</Form.Label>
                            <FormControl type='number' value = {dataYear} min="2020" max={new Date().getFullYear()}
                            onChange={(e) => setDataYear(e.target.value)} 
                            style={{width:'50%'}} >
                            </FormControl>                            
                        </FormGroup>
                        <Button type='submit'> <span style={{ color: 'white' }}>
                            <i className="fas fa-search"></i>
                         </span></Button>
                    </Form>
                    <div className="mt-3 mb-3" style={{flex:'1'}}><Button style={{textAlign:'center'}}
                    onClick={()=>{
                        history.push({pathname:`/employee/order/complete`,
                            state: {
                                firstDay: firstDay,
                                lastDay: lastDay
                            },
                            })
                    }}
                    >Back</Button></div>
                    </div>
                    
                    <Card.Body >
                        <Chart
                        options={options}
                        series={series}
                        type="bar"
                        width="60%"
                        />
                    </Card.Body>
            
                </Card>
                    
                </Col>
                </Row>
            </Container>
            <Footer/>
          
        </>
        
    )

}


export default OrdersChart