import React,{ useEffect, useState } from "react"
import { Nav, NavDropdown } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { fetchListCategory, listCategorySelector } from "../../reducers/Category/category"
import { Link } from "react-router-dom"

const FetchCategory =() =>{
    const dispatch = useDispatch()
    const listCategory = useSelector(listCategorySelector)
    useEffect(() => {
        dispatch(fetchListCategory())
    }, [dispatch])

    const getCategory = listCategory.map((category) =>{
        return(
                
                <NavDropdown.Item as={Link} to={`/product/category/${category.id_category}`} key={category.id_category}   style={{textTransfrom:'capitalize'}}>
                    {category.name_category}
            
                    </NavDropdown.Item>
                           
                
        )
    })
    return (
        <>
            <Nav style={{backgroundColor:'#5d5555'}} className='dropdown-header'>
                <NavDropdown title="DANH MỤC" className="basic-nav-dropdown">
                {getCategory}
                
                </NavDropdown>
            </Nav>
        </>
    )
}

export default FetchCategory