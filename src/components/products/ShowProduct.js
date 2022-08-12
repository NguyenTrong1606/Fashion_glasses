import React, { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { fetchProductId, productDetailSelector } from "../../reducers/Products/products"
import Header from "../home/Header"
import Footer from "../home/Footer"
import { Col, Container, Row,Button } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import ShowComment from "../Comment/ShowComment"
import ShowReview from "../Review/ShowReview"
import RamdomProduct from "./RamdomProduct"


    // const imgRef = React.createRef()
    // let index = 0
    // const handleTab = index =>{
    //     this.setState({index: index})
    //     const images = this.myRef.current.children;
    //     for(let i=0; i<images.length; i++){
    //       images[i].className = images[i].className.replace("active", "");
    //     }
    //     images[index].className = "active";
    //   };
const ShowProduct = ()=>{
    const dispatch = useDispatch()
    const { id_product } = useParams()
    const product = useSelector(productDetailSelector)
    useEffect(()=>{
        dispatch(fetchProductId(id_product))
    },[dispatch,id_product])
    let discountPrice
    if(product.discount<=0){
        discountPrice =(
            <>
            <span style={{color: 'var(--primary-color)', fontSize: '20px', fontWeight: 600}}>{product.price - +product.price*product.discount/100}đ</span>
            </>
            
        )
    }
    else {discountPrice= (
        <>
        <span style={{textDecoration: 'line-through', fontSize: '14px'}}>{product.price}đ</span>
        <br/>
        <span style={{color: 'red', fontSize: '20px', fontWeight: 600}}>{product.price - product.price*product.discount/100}đ</span>
        </>
        
    )}

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
        let sl  = +quantityRef.current.value + i
        if(0<sl && sl< product.quantity){
            quantityRef.current.value = sl
        }
    }

    
    
    return (
        <>
            <Header />
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
                            <p>
                            {discountPrice}				 
                            </p>
                            <p style={{fontSize: '16px', marginTop: '5px'}}>Mô tả: {product.description}</p>
                        </div>
                        <Row className="btn-orders">	
                            <Col lg={4} className="btn-quantity" style={{display: 'flex'}}> 
                            <Button variant="secondary"  style={{border: '1px solid rgb(0 0 0/ 70%)', alignSelf: 'center'}}
                                onClick={()=>upQuantity(-1)}
                            ><FontAwesomeIcon icon={faMinus} /></Button>
                            <input disabled type="text" id="QuantityProduct" defaultValue={1} min={1} max={product.quantity} inputMode="text" ref={quantityRef} style={{maxWidth: '48px', textAlign: 'center', height:'40px', fontSize: '16px', border: '1px solid rgb(0 0 0/ 90%)', alignSelf: 'center'}} />
                            <Button  variant="secondary" style={{border: '1px solid rgb(0 0 0/ 70%)', alignSelf: 'center'}}
                                onClick={()=>upQuantity(1)}
                            ><FontAwesomeIcon icon={faPlus} /></Button>  			                           
                            </Col>
                            <Col lg={1}></Col>
                            <Col lg={7}>
                            <Button  style={{fontSize: '16px', fontWeight: 600, backgroundColor: 'Red', color: '#fff'}}> <FontAwesomeIcon icon={faCartShopping} /> Thêm vào giỏ hàng</Button>
                            </Col>    
                            		
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