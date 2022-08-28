import React, { useEffect, useState } from "react"
import { Container, Row, Col, Form, Button } from "react-bootstrap"
import SliderCoverImage from "../products/SliderCoverImage"
import FetchProduct from "../products/FetchProduct"
import ShowVoucherCollect from "../VoucherAccount/VoucherAccount"
import * as types from "../.././contains/types"
import {
    fetchListCategory,
    listCategorySelector,
  } from "../../reducers/Category/category";
  import { fetchListBrand, listBrandSelector } from "../../reducers/Brand/brand";
import { useDispatch, useSelector } from "react-redux"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFilter} from '@fortawesome/free-solid-svg-icons'
import { useHistory } from "react-router-dom"



const Body = () => {
    const dispatch = useDispatch();
    let categorys = useSelector(listCategorySelector);
    let brands = useSelector(listBrandSelector);

    useEffect(() => {
        dispatch(fetchListCategory());
        dispatch(fetchListBrand());
    }, [dispatch]);
    const history = useHistory();
    const [formData, setFormData] = useState({
        id_category: 0,
        name_category:"",
        id_brand: 0,
        name_brand:""
    })

    const listCategory = categorys.map((category, index) => {
        return (
            <Form.Check
            style={{color:'black', fontSize:'16px'}}
            key={index}
            inline
            label={category.name_category}
            name="id_category"
            type="radio"
            value={category.id_category}
            onChange={(e)=>{
                setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                    name_category: category.name_category
                })
            }}
            />
        );
      });
      const listBrand = brands.map((brand, index) => {
        return (
            <Form.Check
            style={{color:'black', fontSize:'16px'}}
            key={index}
            inline
            label={brand.name_brand}
            name="id_brand"
            type="radio"
            value={brand.id_brand}
            onChange={(e)=>{
                setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                    name_brand: brand.name_brand
                })
            }}
            />
        );
      });

      const submitFilter = async (event) => {
        event.preventDefault()
        if(formData.id_category != 0 && formData.id_brand !=0){
            history.push({pathname:`/category/${formData.id_category}/brand/${formData.id_brand}/filter`,
            state:{
                id_category: formData.id_category,
                id_brand: formData.id_brand,
                name_brand: formData.name_brand,
                name_category: formData.name_category,
            }
            })
        }
        else{
            if(formData.id_category == 0 && formData.id_brand == 0){
                history.push("/")
            }else{
                if(formData.id_category == 0){
                    history.push({pathname:`/brand/${formData.id_brand}/product`,
                    state:{
                        id_category: formData.id_category,
                        id_brand: formData.id_brand,
                        name_brand: formData.name_brand,
                        name_category: formData.name_category,
                    }
                    })
                }
                else{
                    history.push({pathname:`/category/${formData.id_category}/product`,
                    state:{
                        id_category: formData.id_category,
                        id_brand: formData.id_brand,
                        name_brand: formData.name_brand,
                        name_category: formData.name_category,
                    }
                    })
                }
            }
            
        }
        
      }



    return (
        <>
            
            <Container style={{ marginTop: '110px', minHeight: '85vh' }}>
                <Row >
                    <SliderCoverImage />
                </Row>
                
                {localStorage[types.LOCAL_STORAGE_TOKEN_NAME]?<Row>
                    <ShowVoucherCollect/>
                </Row>:<></>}
                <Row className="mt-4 mb-3" style={{background:'rgb(240, 248, 255)'}}>
                    <h2 style={{color:'orange'}}>Lọc sản phẩm</h2>
                    <Form className="d-flex flex-row" onSubmit={submitFilter}>
                        
                        <Form.Group className="mb-3 d-flex flex-column" style={{textAlign: 'left', flex:'4'}}>
                            <Form.Label style={{color:'blue',fontSize:'20px', fontWeight:'600'}}>Danh mục:</Form.Label>
                            <Form.Check
                                style={{color:'black', fontSize:'16px'}}
                                inline
                                label="Tất cả"
                                name="id_category"
                                type="radio"
                                value = '0'
                                onChange={(e)=>{
                                    setFormData({
                                        ...formData,
                                        [e.target.name]: e.target.value,
                                    })
                                }}
                                checked = {formData.id_category == 0}
                                />
                                {listCategory}
                        </Form.Group>
                        <Form.Group className="mb-3 d-flex flex-column" style={{textAlign: 'left',flex:'4'}}>
                            <Form.Label style={{color:'blue',fontSize:'20px', fontWeight:'600'}}>Nhãn hiệu:</Form.Label>
                            <Form.Check
                                style={{color:'black', fontSize:'16px'}}
                                inline
                                label="Tất cả"
                                name="id_brand"
                                type="radio"
                                value = '0'
                                onChange={(e)=>{
                                    setFormData({
                                        ...formData,
                                        [e.target.name]: e.target.value,
                                    })
                                }}
                                checked = {formData.id_brand == 0}
                                />
                                {listBrand}
                        </Form.Group>
                        <Button className="mt-3" variant='danger' type='submit' style={{textAlign: 'center', width:'10%', height:'40px' ,flex:'1', margin:'auto'}}><FontAwesomeIcon icon={faFilter}/></Button>
                        <div style={{flex:'5'}}></div>

                    </Form>
                </Row>
                <FetchProduct/>
                
            </Container>
        </>
    )
}

export default Body