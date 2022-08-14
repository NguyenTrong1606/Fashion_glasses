import React, { useEffect, useState } from "react"
import { Row, Col, Card, Image, Button,Form } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import ReactPaginate from "react-paginate"
import { loadReview, reviewSelector, loadStarReview, starReviewSelector, addReview } from "../../reducers/Review/review"
import { useParams } from "react-router"
import { toastError } from "../.././Toast/Toast"
import Star from '../../assets/star.jpg'
import { loadUser,userSelector } from "../../reducers/Account/LoginForm"

const ShowReview = ()=>{
    const dispatch = useDispatch()
    let reviews = useSelector(reviewSelector)
    let numberStar = useSelector(starReviewSelector)
    const { id_product } = useParams()
    const [reviewForm, setReviewForm] = useState({
        star_number: 0,
        content :""
    })
    const [reviewActive, setReviewActice] = useState(null)
    
    const user = useSelector(userSelector)
    const [pageNumber, setPageNumber] = useState(0)
    const todoPerPage = 9
    const pagesVisited = pageNumber * todoPerPage
    const pageCount = Math.ceil(reviews.length / todoPerPage)

    useEffect(() => {
        dispatch(loadUser())
        dispatch(loadStarReview(id_product))
        dispatch(loadReview(id_product))
    }, [dispatch, id_product])

    const formatContent = (content) => {
        let arr = content.split("\n")
        let res = []
        for (let line of arr) {
            res.push(line)
            res.push(<br />)
        }
        return res
    }
    const onSubmitReview = (event) => {
        event.preventDefault()
        if (user.id_account === 0) {
            toastError("Vui lòng đăng nhập để chat")
            return
        } else {
            const review = {
                id_product: id_product,
                star_number: star_number,
                content: content
            }

            dispatch(addReview(review))
            setReviewForm({
                    star_number:0,
                    content :""
            })
        }
    }
    const {star_number, content} = reviewForm

    const listReview = reviews.slice(pagesVisited, pagesVisited + todoPerPage).map((review,index)=>{
        return(
            <div className="read-comment" key={index}>
            <Card
                style={{
                    flexDirection: "row",
                    border: "0",
                    padding: "3px",
                    
                }}
            >
            
                <Card.Body style={{ padding: "0px" }}>
                    <Row className="d-flex">
                        <Card.Title
                            
                            style={{
                                textDecoration: "none",
                                color: "black",
                                display: "inline",
                            }}
                        >
                            {review.account.account_name}{" "}
                            
                            <span className="date-comment">
                                <i>
                                    {review.day} -{" "}
                                    {review.time}
                                </i>
                            </span>
                        </Card.Title>
                    </Row>
                    <h5 style={{color:'blue', marginLeft:'20px'}}>{review.star_number}<img src={Star} width='20px' height='auto'></img></h5>
                    <Card.Text
                        className="d-flex"
                        style={{
                            flexDirection: "column",
                        }}
                    >
                            <span
                                style={{ fontSize: "18px" }}
                            >
                                {formatContent(review.content)}
                            </span>
                        </Card.Text>
                    </Card.Body>
                </Card>
        </div>

        )
        
    })
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }
    return(
        <>
            <Row>
                <Col>
                <h4 style={{lineHeight:'40px'}}>Đánh giá {'&'} nhận xét</h4>
                <div className="box-comments">
                    <Row>
                        <Col md={2}></Col>
                        <Col md={7} style={{
                                        flexDirection: "row",
                                        border: "0",
                                        padding: "3px",
                                        
                                    }}>

                            <h1 style={{fontSize:'50px', color:'red', marginLeft:'50px'}}>{numberStar}/5 <img src={Star} width='50px' height='auto'></img></h1>
                            <h6>{'('} {reviews.length} đánh giá {'&'} nhận xét {')'}</h6>                              
                        </Col>
                        <Col md={3} style={{
                                        flexDirection: "column",
                                        border: "0",
                                        padding: "3px",
                                        
                                    }}>
                            <h6 style={{float: "right"}}>Bạn mua sản phẩm này trước đây?</h6>
                            <Button style={{
                                    
                                    fontSize: '20px',
                                    borderRadius: "5px",
                                    backgroundColor: "red",
                                    borderColor: "red",
                                    border: 0,
                                    float: "right"
                                }}
                                onClick={() =>
                                    setReviewActice({
                                        active: 0
                                    })
                                }

                                >Gửi đánh giá {'&'} nhận xét</Button>
                        </Col>
                    </Row>
                    {reviewActive ?(
                        <Form onSubmit={onSubmitReview}>
                        
                        <Form.Group className="mb-3 starReview" style={{textAlign: 'left'}}>
                        <img img src={Star} width='30px' height='auto' style={{margin:'0 15px'}}></img>
                                <Form.Check
                                    inline
                                    label="không Thích (1 Sao)"
                                    name="start_number"
                                    type="radio"
                                    id={`inline-radio-1`}
                                    value="1"
                                    onChange={(e)=>setReviewForm({
                                        ...reviewForm,
                                        [e.target.name]: e.target.value
                                    })}
                                />
                                <Form.Check
                                    inline
                                    label="Tạm được (2 Sao)"
                                    name="star_number"
                                    type="radio"
                                    id={`inline-radio-2`}
                                    value="2"
                                    onChange={(e)=>setReviewForm({
                                        ...reviewForm,
                                        [e.target.name]: e.target.value
                                    })}
                                />
                                <Form.Check
                                    inline
                                    label="Bình thường (3 Sao)"
                                    name="star_number"
                                    type="radio"
                                    id={`inline-radio-3`}
                                    value="3"
                                    onChange={(e)=>setReviewForm({
                                        ...reviewForm,
                                        [e.target.name]: e.target.value
                                    })}
                                />
                                <Form.Check
                                    inline
                                    label="Hài Lòng (4 Sao)"
                                    name="star_number"
                                    type="radio"
                                    id={`inline-radio-2`}
                                    value="4"
                                    onChange={(e)=>setReviewForm({
                                        ...reviewForm,
                                        [e.target.name]: e.target.value
                                    })}
                                />
                                <Form.Check
                                    inline
                                    label="Tuyệt vời (5 Sao)"
                                    name="star_number"
                                    type="radio"
                                    id={`inline-radio-5`}
                                    value="5"
                                    onChange={(e)=>setReviewForm({
                                        ...reviewForm,
                                        [e.target.name]: e.target.value
                                    })}
                                />
                        </Form.Group>

                        <textarea
                            type="text"
                            className="write-comment col-xl-12 col-lg-12 col-md-12 col-sm-12"
                            placeholder="Viết nhận xét..."
                            name="content"
                            onKeyPress={(e) => {
                                e.key === "Enter" && e.preventDefault()
                            }}
                            value={reviewForm.content}
                            onChange={(e)=>setReviewForm({
                                ...reviewForm,
                                [e.target.name]: e.target.value
                            })}
                            style={{ height: "120px", minHeight: "100px", maxHeight: "300px", padding: "10px", margin: "10px 0px", border: "2px solid #ccc", borderRadius: "5px", borderSizing: "border-box" }}
                        />
                        <Button
                            style={{
                                
                                fontSize: '20px',
                                borderRadius: "5px",
                                backgroundColor: "#146ebe",
                                borderColor: "#146ebe",
                                border: 0,
                                float: "right"
                            }}
                            type='submit'
                        >
                            gửi
                        </Button>
                        <Button
                            style={{
                                margin:'0 20px',
                                fontSize: '20px',
                                borderRadius: "5px",
                                backgroundColor: "#146ebe",
                                borderColor: "#146ebe",
                                border: 0,
                                float: "right"
                            }}
                            onClick={()=>setReviewActice(null)}
                            
                        >
                            hủy
                        </Button>
                        </Form>
                    ):<></>
                    }
                    <br/>
                    <br/>

                    
                    {listReview}
                    {pageCount > 1?
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
                    />:<></>
                    }
                    
                </div>
                </Col>
            </Row>
        </>
    )
}

export default ShowReview