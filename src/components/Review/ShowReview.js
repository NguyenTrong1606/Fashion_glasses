import React, { useEffect, useState } from "react"
import { Row, Col, Card, Image, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { loadReview, reviewSelector, loadStarReview, starReviewSelector } from "../../reducers/Review/review"
import { useParams } from "react-router"
import { toastError } from "../.././Toast/Toast"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import Star from '../../assets/star.jpg'

const ShowReview = ()=>{
    const dispatch = useDispatch()
    let reviews = useSelector(reviewSelector)
    let numberStar = useSelector(starReviewSelector)
    const { id_product } = useParams()
    const [content, setContent] = useState("")
    

    useEffect(() => {
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

    const listReview = reviews.map((review,index)=>{
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

    return(
        <>
            <Row>
                <Col>
                <h4 style={{lineHeight:'40px'}}>Đánh giá {'&'} nhận xét</h4>
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
                                }}>Gửi đánh giá {'&'} nhận xét</Button>
                        </Col>
                    </Row>
                    <div className="box-comments">
                        {listReview}
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default ShowReview