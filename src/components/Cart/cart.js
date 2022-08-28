import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import Header from "../home/Header"
import Footer from "../home/Footer"
import { Col, Container, Row,Button, Form, Card,Table } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { loadUser,updateAddressUser,userSelector } from "../../reducers/Account/LoginForm"
import { voucherSelector, loadVoucherAccount } from "../../reducers/Voucher/voucher"
import { addOrder } from "../../reducers/Orders/orders"
import { toastError, toastSuccess } from "../.././Toast/Toast"
import { 
    deleteItem,
    updateItem,
    loadItems,
    listItemsSelector
 } from "../../reducers/Cart/cart"
 import { useHistory } from "react-router-dom"

 

 const ShowCart =() =>{
    const dispatch = useDispatch()
    const user = useSelector(userSelector)
    const itemsCart = useSelector(listItemsSelector)
    const vouchers = useSelector(voucherSelector)
    useEffect(() => {
        dispatch(loadUser())
        dispatch(loadVoucherAccount())
        dispatch(loadItems())
    }, [dispatch])

    const [activeFormInfor, setActiveFormInfor] = useState(null)
    const [address1, setAddress1] = useState("")
    const [voucherForm, setVoucherForm] = useState({
      id_voucher : 0 
    })
    const history = useHistory()

    var tongTien = 0

    const ShowCartItem = itemsCart.map((itemCart, index)=>
        {
            var price = +itemCart.product.price - itemCart.product.price*itemCart.product.discount/100;
            var total = + price *  itemCart.quantity;
            tongTien = + tongTien +total
            price = price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});            
            total = total.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
            var STT = + index +1
            const upQuantity = (id_product, i)=>{
                 var quantity = +itemCart.quantity + i
                if(0<quantity && quantity<=itemCart.product.quantity){
                    const item = {
                        id_product,
                        quantity
                    }
                    dispatch(updateItem(item))
                }
            }
            const delCartItem=(id_product)=>{
                dispatch(deleteItem(id_product))
            }
            return(
                
                <tr key={itemCart.id_item} style={{textAlign: 'center', color:'blue', fontWeight:'600'}}>
                  <th>{STT}</th>
                  <td ><img width='100px' src={itemCart.product.img.image}></img></td>
                  <td style={{textAlign: 'left'}}>{itemCart.product.name_product}</td>
                  <td>{price}</td>
                  <td className="d-flex flex-row" style={{height:'119px'}}>
                  <Button variant="secondary"  style={{border: '1px solid rgb(0 0 0/ 70%)', alignSelf: 'center',fex:'1'}}
                             onClick={()=>upQuantity(itemCart.id_product,-1)}
                        ><FontAwesomeIcon icon={faMinus} /></Button>
                        <input disabled type='text'
                            
                            min={1} 
                            max={itemCart.product.quantity} 
                            inputMode="numeric"
                            require="true"
                            name="quantity"
                            value={itemCart.quantity}
                            style={{maxWidth: '48px', textAlign: 'center', height:'40px', fontSize: '16px', border: '1px solid rgb(0 0 0/ 90%)', alignSelf: 'center',fex:'1'}}
                         />
                        <Button  variant="secondary" style={{border: '1px solid rgb(0 0 0/ 70%)', alignSelf: 'center'}}
                                 onClick={()=>upQuantity(itemCart.id_product,1)}
                        ><FontAwesomeIcon icon={faPlus} /></Button>
                  </td>
                  <td>{total}</td>
                  <td><Button variant="danger">
                        <i className="far fa-trash-alt fa-x"
                             onClick={() =>
                                delCartItem(itemCart.id_product)
                            }
                        ></i>
                      </Button>
                  </td>
                </tr>

            )
            
        }
    )

    const listvoucher = vouchers.map((voucher,index)=>{
      return(
        <option key={voucher.id_voucher} value={voucher.id_voucher}>
          {voucher.title}
        </option>
      )
      
    })

    const id_voucher = voucherForm.id_voucher

    var giamGia = 0
    var chietKhau = 0

    var discount = vouchers.map((voucher,index)=>{
        if(voucher.id_voucher == id_voucher){
          giamGia =+tongTien*voucher.discount/100
          chietKhau = +voucher.discount          
        }
        
    })


    const onSubmitUpdateAddress = (event) =>{
      event.preventDefault()
      if(address1){
        dispatch(updateAddressUser(address1))
      }else{
        toastError("Địa chỉ giao hàng không được để trống")
      }
      setActiveFormInfor(null)
    }

    const onSubmitAddOrder = (event) =>{
      
      event.preventDefault()
      const address = user.address

      dispatch(addOrder({id_voucher,address, history}))
      dispatch(loadItems())

    }


    


    return(
    <>
        <Header full_name ={user.full_name}
                email = {user.email}
                phone_number = {user.phone_number}                         
                identification = {user.identification}                        
                date_of_birth  =  {user.date_of_birth}                    
                address = {user.address}
                avatar   ={user.avatar}
                gender ={user.gender}
                role ={user.role}/>
        <Container fluid style={{ margin: '110px 20px 10px', minHeight: '85vh' }}>
        {/* <Row className="d-flex flex-row">
          <div style={{flex:'9'}}></div>
          <Button variant="success" style={{flex:'1', color:'white', margin:'0 40px'}}
            onClick={() =>
              history.push('/account/my-order')
            }
          >Danh Sách Đơn Hàng</Button>
        </Row> */}
        <Row style={{marginTop: '30px'}}>

        <Col md ={3} className="panel panel-danger" style={{border:'green solid 1px', padding:'10px'}}>
          <h2 className="text-center my-5" style={{fontSize: '24px', color: '#28a745', fontWeight: '600'}}>Thông tin Thanh Toán</h2>
          <div id="control-display1" style={{display: 'block'}}>
            <div className="form-horizontal" >
                <div className="d-flex flex-row mb-3">
                <div style={{ flex:'1', margin:'auto 0'}} >Họ Tên</div>
                <input type='text' style={{ flex:'3'}} disabled   value={user.full_name} />
              </div>
              <div className="d-flex flex-row mb-3">
                <div style={{ flex:'1', margin:'auto 0'}} >SĐT</div>
                <input type='text' style={{ flex:'3'}} disabled value={user.phone_number} />
              </div>
              <div className="d-flex flex-row mb-3">
                <div style={{ flex:'1', margin:'auto 0'}} >Email</div>
                <input type='text'  style={{ flex:'3'}} disabled value={user.email} />
              </div>
              {activeFormInfor?
                  <>
                    <Form 
                    onSubmit={onSubmitUpdateAddress}
                    >
                    <Form.Group className="d-flex flex-row mb-3">
                      <Form.Label style={{ flex:'1', margin:'auto 0'}} htmlFor="textInput1">Địa chỉ giao hàng</Form.Label>
                      <Form.Control style={{ flex:'3'}} id="textInput1"  onChange={(e) => setAddress1(e.target.value)} value={address1} />
                    </Form.Group>
                    <Row className="d-flex justify-content-center">
                    <Button type="submit" variant="danger"  style={{textAlign: 'center', width:'30%'}}>Xác Nhận</Button>
                    </Row>
                    </Form>
                  </>
                  
                  :
                  <>
                  <div className="d-flex flex-row mb-3">
                    <div style={{ flex:'1', margin:'auto 0'}} >Địa chỉ giao hàng</div>
                    <input type='text'  style={{ flex:'3'}} disabled value={user.address} />
                  </div>
                  <Row className="d-flex justify-content-center">
                    
                      <Button type="button" variant="danger"  style={{textAlign: 'center', width:'30%'}}
                          onClick={() =>
                            setActiveFormInfor({active:0})
                          }
                        >Sửa Địa chỉ</Button>
                  </Row>
                  </>
                }
                
                
              
            </div>
          </div>
        </Col>
        <Col md={9}>
            
        <Card>
          <Card.Title className="border-bottom p-3 mb-0 d-flex flex-row ">
                <h3 style={{color:'green', margin:'10px auto'}} >THÔNG TIN GIỎ HÀNG</h3>
          </Card.Title>
          {itemsCart.length==0?<div style={{color: '#1699c1', fontSize:'32px', fontWeight:'600', minHeight:'100px', lineHeight:'100px', textAlign:'center'}}>Không có sản phẩm trong giỏ hàng</div>:<>
          <Card.Body className="show-item">
            <Table bordered>
              <thead>
                <tr style={{textAlign: 'center'}}>
                  <th style={{width:'2%', lineHeight:'32px'}}>#</th>
                  <th style={{width:'15%', lineHeight:'32px'}}>Hình ảnh</th>
                  <th style={{width:'40%', lineHeight:'32px',textAlign: 'left'}}>Tên Sản phẩm</th>
                  <th style={{width:'12%', lineHeight:'32px'}}>Giá tiền</th>
                  <th style={{width:'8%', lineHeight:'32px'}}>Số lượng</th>
                  <th style={{width:'15%', lineHeight:'32px'}}>Thành Tiền</th>
                  
                  <th style={{width:'8%', lineHeight:'32px'}}>Xóa</th>
                </tr>
              </thead>
              <tbody>
                {ShowCartItem}
              </tbody>
            </Table>
          </Card.Body>
          <Form className="d-flex flex-column " onSubmit={onSubmitAddOrder}>
            <div className="d-flex flex-row mb-3">
              <h3 style={{flex:'4'}}>Tổng:</h3>
              <h4 style={{flex:'1', color:'red'}}>{tongTien.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</h4>
            </div>
            <Form.Group className="d-flex flex-row mb-3" 
            >
              {discount}
              <Form.Label style={{ flex:'1', fontSize:'1.75rem', fontWeight:'500'}} htmlFor="textInput1">Giảm:</Form.Label>
              <h4 style={{ flex:'1', color:'orange', margin:'auto 0'}}>{chietKhau}%</h4>
              <Form.Select style={{ flex:'3'}} aria-label="Default select example"  
                onChange={(e)=>
                  setVoucherForm({
                    id_voucher: e.target.value
                  })}
                  
                >
                <option value='0'>Chọn mã giảm giá</option>
                {listvoucher}
              </Form.Select>
              
              <div style={{ flex:'3'}}></div>
              <h5 style={{ flex:'2',margin:'auto 0'}}>{giamGia.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</h5>

              
            </Form.Group>
            <div className="d-flex flex-row mb-3">
              <h3 style={{flex:'4'}}>Tổng:</h3>
              <h4 style={{flex:'1', color:'red'}}>{(+tongTien-giamGia).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</h4>
            </div>

            <Button type="submit" variant="danger" style={{width:'200px', margin:'0 auto 20px'}}>Đặt Hàng</Button>              
          </Form>

          </>}  
        </Card>




        </Col>
        
        </Row>
    </Container>
    <Footer/>
    </>
    )
    


 }

 export default ShowCart