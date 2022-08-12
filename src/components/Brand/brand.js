import React,{ useEffect, useState } from "react"
import { Nav, NavDropdown } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { fetchListBrand, listBrandSelector } from "../../reducers/Brand/brand"
import { Link } from "react-router-dom"

const FetchBrand =() =>{
    const dispatch = useDispatch()
    const listBrand = useSelector(listBrandSelector)
    useEffect(() => {
        dispatch(fetchListBrand())
    }, [dispatch])

    const getBrand = listBrand.map((brand) =>{
        return(            
            <NavDropdown.Item as={Link} to={`/product/brand/${brand.id_brand}`} key={brand.id_brand} style={{textTransfrom:'capitalize'}}>
        
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