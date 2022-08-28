import React,{ useEffect, useState } from "react"
import { Nav, NavDropdown } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { fetchListBrand, listBrandSelector } from "../../reducers/Brand/brand"
import { Link, useHistory } from "react-router-dom"

const FetchBrand =() =>{
    const dispatch = useDispatch()
    const listBrand = useSelector(listBrandSelector)
    useEffect(() => {
        dispatch(fetchListBrand())
    }, [dispatch])
    const history = useHistory()

    const idCate = localStorage.getItem('idCategory')
    const nameCate = localStorage.getItem('nameCategory')

    // const handleURL = (id_brand, name_brand) =>{
    //     if(idCate){
    //         localStorage.setItem('idBrand', id_brand)
    //         localStorage.setItem('nameBrand', name_brand)
    //         history.push({pathname:`/category/${idCate}/brand/${id_brand}/filter`,
    //         state:{
    //             name_brand: name_brand,
    //             name_category: nameCate,
    //         }
    //         });
            

    //     }else{
    //         localStorage.removeItem('link')
    //         localStorage.setItem('idBrand', id_brand)
    //         localStorage.setItem('nameBrand', name_brand)
    //         history.push({
    //             pathname:`/brand/${id_brand}/product`,
    //             state: {name_brand},
    //         })
            

    //     }
    // }

    const getBrand = listBrand.map((brand) =>{
        const name_brand = brand.name_brand
        return(            
            <NavDropdown.Item 
            as={Link} 
            to={{
                pathname:`/brand/${brand.id_brand}/product`,
                state: {name_brand},
            }}
            onClick={()=>localStorage.removeItem('link')}
            // onClick={()=>handleURL(brand.id_brand,brand.name_brand)}
             key={brand.id_brand} style={{textTransfrom:'capitalize'}}>
        
                    {brand.name_brand}
                      
            </NavDropdown.Item>
                            
        )
    })
    return (
        <>
            <Nav style={{backgroundColor:'#5d5555'}} className='dropdown-header'>
                <NavDropdown title="NHÃN HIỆU" className="basic-nav-dropdown">
                {getBrand}
                
                </NavDropdown>
            </Nav>
        </>
    )
}

export default FetchBrand