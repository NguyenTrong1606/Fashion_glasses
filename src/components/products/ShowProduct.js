import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { fetchProductId, productDetailSelector,fetchAllProduct, productsSelector } from "../../reducers/Products/products"
import Header from "../home/Header"
import Footer from "../home/Footer"
import { Col, Container, Row,Button, Form } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import ShowComment from "../Comment/ShowComment"
import ShowReview from "../Review/ShowReview"
import RamdomProduct from "./RamdomProduct"
import { loadUser,userSelector } from "../../reducers/Account/LoginForm"
import { toastError, toastSuccess } from "../.././Toast/Toast"
import { 
    addItemCart,
    updateItem,
    loadItem,
    cartItemSelector
 } from "../../reducers/Cart/cart"

    
const ShowProduct = ()=>{
    const dispatch = useDispatch()
    const listProduct = useSelector(productsSelector)
    const { id_product } = useParams()
    const product = useSelector(productDetailSelector)
    const user = useSelector(userSelector)
    var quantity = 1

    const itemCart = useSelector(cartItemSelector)

    useEffect(() => {
        dispatch(fetchAllProduct())
        dispatch(loadUser())
    }, [dispatch])
    useEffect(()=>{
        dispatch(loadItem(id_product))
        dispatch(fetchProductId(id_product))
    },[dispatch,id_product])
    let discountPrice


    if(product.discount<=0){
        discountPrice =(
            <>
            <span style={{color: 'var(--primary-color)', fontSize: '20px', fontWeight: 600}}>{(product.price - +product.price*product.discount/100).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</span>
            </>
            
        )
    }
    else {discountPrice= (
        <>
        <span style={{textDecoration: 'line-through', fontSize: '14px'}}>{product.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</span>
        <br/>
        <span style={{color: 'red', fontSize: '20px', fontWeight: 600}}>{(product.price - product.price*product.discount/100).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</span>
        </>
        
    )}
    // const formatDescription = (description) => {
    //     const chuoi = description.split("-")
    //     for(let i = 0; i < chuoi.length; i++){
    //         moTa = moTa + chuoi[i] + "<br/>"
    //     }
    // }
    let moTa 
    const chuoi = product.description.split("-")
    for(let i = 0; i < chuoi.length; i++){
         moTa = (<>{moTa}
             {chuoi[i]}
               <br/>
               </>)
    }
    

    const imgRef = useRef()
    const imgShowRef = useRef()
    const quantityRef = useRef()
    const handleTab = (index) =>{
        imgShowRef.current.src = product.images[index]
        const images = imgRef.current.children;
        for(let i=0; i<images.length; i++){
          images[i].className = images[i].className.replace("active", "");
        }
        images[index].className = "active";
      };
    
    const upQuantity = (i)=>{
        if(itemCart){
            const sl  =    +quantityRef.current.value + i
            if(0<sl && sl<=(+product.quantity - +itemCart.quantity)){
                quantity = sl
                quantityRef.current.value = quantity
                
            }
            
        }else{
            const sl  = +quantityRef.current.value + i
            if(0<sl && sl<= product.quantity){
                quantity = sl
                quantityRef.current.value = quantity
                
            }
            
        }   
        
    }

    const onSubmitAddCartItem = (event) => {
        event.preventDefault()
        if (user.id_account === 0) {
            toastError("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng")
            return
        } else {
            if(itemCart){
                quantity = +quantity + itemCart.quantity

                const item = {
                    id_product,
                    quantity
                }
                dispatch(updateItem(item))
                
                
            }
            else{
                const item = {
                    id_product,
                    quantity
                }
                dispatch(addItemCart(item))
            }

            quantity = 1

            quantityRef.current.value = 1
            
        }
    }

    
    
    return (
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
            <Container style={{ marginTop: '110px', minHeight: '85vh' }}>
                <Row className="wrapper-show">
                    <Col lg={7} className="card-items">
                        <div className="slider-imgs" ref={imgRef}>
                            {product.images.map((img,index)=>(
                                <img className="product-img" key={index} src={img} width="50px" height="auto" 
                                onClick={()=>handleTab(index)}/>
                            ))}
                        </div>
                        <Col className=" imgs-show" style={{marginLeft: '10px'}}>
                            <img id="show-productimg" alt="Sản phẩm" src={product.images[0]} style={{border: '1px solid #CCC', width:'600px', height:'auto'}}  ref={imgShowRef} />
                        </Col>
                    </Col>
                    <Col lg={4} className="card-items" style={{flexDirection: 'column'}}>
                        <div className="slider-imgs mb-3">
                            <h5 className="card-title mb-4" style={{color: '#271111', fontSize: '30px', fontWeight: 600}}>{product.name_product}</h5>
                            {product.quantity<1? 
                            <h4 style={{color:'red', fontWeight:'800', textDecoration:'underline'}}>HẾT HÀNG</h4>                            
                            :itemCart && +product.quantity - itemCart.quantity >0? <h6>Có sẵn:&nbsp;{+product.quantity - itemCart.quantity}&nbsp;Sản phẩm</h6>
                            :itemCart && +product.quantity - itemCart.quantity <=0?<></>
                            :<h6>Có sẵn:&nbsp;{product.quantity }&nbsp;Sản phẩm</h6>
                            }
                            <p>
                            {discountPrice}				 
                            </p>
                            <p style={{fontSize: '16px', marginTop: '5px'}}><b>Mô tả:</b><br/>
                                <b>Loại sản phẩm: {product.category}</b><br/>
                                <b>Nhãn hiệu: {product.brand}</b>
                             {moTa}</p>
                        </div>
                        <Row className="btn-orders">	
                            {product.quantity <1?(
                                   <Button disabled = 'true' style={{fontSize: '16px', fontWeight: 600, backgroundColor: 'gray', color: '#fff'}}> <FontAwesomeIcon icon={faCartShopping} /> Thêm vào giỏ hàng</Button>
                            ): itemCart && itemCart.quantity >= product.quantity?
                            <>
                                <Button disabled = 'true' style={{fontSize: '16px', fontWeight: 600, backgroundColor: 'gray', color: '#fff'}}> <FontAwesomeIcon icon={faCartShopping} /> Thêm vào giỏ hàng</Button>
                                <h4 style={{color:'green', fontWeight:'800', textDecoration:'underline'}}>Sản phẩm này đã được bạn thêm số lượng tối đa trong giỏ hàng</h4>
                            </>:
                            <Form onSubmit={onSubmitAddCartItem} style={{display:'flex'}}>
                                    
                                    <Button variant="secondary"  style={{border: '1px solid rgb(0 0 0/ 70%)', alignSelf: 'center'}}
                                        onClick={()=>upQuantity(-1)}
                                    ><FontAwesomeIcon icon={faMinus} /></Button>
                                    <Form.Group>
                                    <Form.Control disabled type='text'
                                            defaultValue={1} 
                                            min={1} 
                                            max={product.quantity} 
                                            inputMode="numeric"
                                            ref={quantityRef}
                                            require="true"
                                            value={quantity}
                                            style={{maxWidth: '48px', textAlign: 'center', height:'40px', fontSize: '16px', border: '1px solid rgb(0 0 0/ 90%)', alignSelf: 'center'}}
  
                                        />
                                    </Form.Group>
                                    <Button  variant="secondary" style={{border: '1px solid rgb(0 0 0/ 70%)', alignSelf: 'center'}}
                                        onClick={()=>upQuantity(1)}
                                    ><FontAwesomeIcon icon={faPlus} /></Button>  			                           
                                    
                                    <Button type="submit" style={{marginLeft:'15px',fontSize: '16px', fontWeight: 600, backgroundColor: 'Red', color: '#fff'}} > <FontAwesomeIcon icon={faCartShopping} /> Thêm vào giỏ hàng</Button>
                                    

                                </Form>
                                
                            }
                            
 
                            		
                        </Row>
                    </Col>
                </Row>
                <ShowReview />
                <ShowComment/>
                <RamdomProduct/>
            

            </Container>
            <Footer/>
        </>
    )
}

export default ShowProduct