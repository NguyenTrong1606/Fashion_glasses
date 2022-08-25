import React,{ useEffect, useState } from "react"
import { Nav, NavDropdown } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { fetchListCategory, listCategorySelector } from "../../reducers/Category/category"
import { Link, useHistory } from "react-router-dom"

const FetchCategory =() =>{
    const dispatch = useDispatch()
    const listCategory = useSelector(listCategorySelector)
    useEffect(() => {
        dispatch(fetchListCategory())
    }, [dispatch])
    const history = useHistory()

    const idBrand = localStorage.getItem('idBrand')
    const nameBrand = localStorage.getItem('nameBrand')

    const handleURL = (id_category, name_category) =>{
        if(idBrand){
            localStorage.setItem('idCategory', id_category)
            localStorage.setItem('nameCategory', name_category)
            history.push({pathname:`/category/${id_category}/brand/${idBrand}/filter`,
            state:{
                name_brand: nameBrand,
                name_category: name_category,
            }
            });
            

        }else{
            localStorage.removeItem('link')
            localStorage.setItem('idCategory', id_category)
            localStorage.setItem('nameCategory', name_category)
            history.push({
                pathname:`/category/${id_category}/product`,
                state: {name_category},
            })
            

        }
    }

    const getCategory = listCategory.map((category) =>{
        const name_category = category.name_category
        return(
                
                <NavDropdown.Item
                //  as={Link} 
                // to={{pathname:`/category/${category.id_category}/product`,
                // state: {name_category},
                // }}
                // onClick={()=>localStorage.removeItem('link')}
                onClick={()=>handleURL(category.id_category,category.name_category)}
                 key={category.id_category}   style={{textTransfrom:'capitalize'}}>
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