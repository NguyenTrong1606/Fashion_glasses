import React, { useEffect, useState } from "react"
import ReactPaginate from "react-paginate"
import {
    Card,
    Button,
    Container,
    Row,
    Col,
    Image,
    ListGroup,
} from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { loadUser, userSelector } from "../../reducers/Account/LoginForm"
import { loadVoucherCollect, voucherCollectSelector,addVoucherAccount } from "../../reducers/Voucher/voucher"

const ShowVoucherCollect= () => {
    
    const dispatch = useDispatch()
    const user = useSelector(userSelector)
    const vouchers = useSelector(voucherCollectSelector)

    useEffect(() => {
        dispatch(loadUser())
        dispatch(loadVoucherCollect())
    }, [dispatch])
    const [pageNumber, setPageNumber] = useState(0)
    const todoPerPage = 6
    const pagesVisited = pageNumber * todoPerPage

    const pageCount = Math.ceil(vouchers.length / todoPerPage)

    const displayTodo = vouchers
        .slice(pagesVisited, pagesVisited + todoPerPage)
        .map((voucher, index) => {

            return (
                <Col lg={2} md={3} sm={4} key={voucher.id_voucher} style={{ margin: '15px 0' }} >
                    <Card className="bg-light card-voucher" style={{height:'220px'}} >
                        <Card.Body  className=" d-flex flex-column"> 
                        <Card.Title style={{textAlign: 'center', color:'orange' , flex:'2'}}>
                            {voucher.title}
                        </Card.Title>
                        <Card.Text style={{flex:'5'}}>
                          <i style={{fontSize:'10px'}}>HSD: {voucher.date_start} {'=>'}{voucher.date_end}</i>
                          <br></br>
                          <b  >{voucher.description}</b>  
                        </Card.Text>
                        <Button style={{flex:'1',width:'60%',margin:'0 auto'}}
                        onClick={()=>{dispatch(addVoucherAccount(voucher.id_voucher))}}
                        >Thu Thập</Button>
                        </Card.Body>
                        
                    </Card>
                </Col>

            )
        
        })


    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }

    return (
        <>
        
            
                <Row style={{ margin: '20px 0' }}>
                {displayTodo}
                </Row>
                
            
                {pageCount>1?(
                    <div className="list-page">
                        <ReactPaginate
                            previousLabel={<i className="fa fa-chevron-left "></i>}
                            nextLabel={<i className="fa fa-chevron-right"></i>}
                            pageCount ={pageCount}
                            onPageChange={changePage}
                            containerClassName={"pagination justify-content-center"}
                            pageClassName={"page-item me-2"}
                            pageLinkClassName={"page-link"}
                            previousClassName={"page-item me-2"}
                            previousLinkClassName={"page-link"}
                            nextClassName={"page-item"}
                            nextLinkClassName={"page-link"}
                            breakClassName={"page-item me-2"}
                            breakLinkClassName={"page-link"}
                            disabledClassName={"paginationDisabled"}
                            activeClassName={"active"}
                            marginPagesDisplayed={1}
                            pageRangeDisplayed={2}
                        />
                    </div>
                ) : (
                    <></>
                )}
            

        </>
    )

}

export default ShowVoucherCollect