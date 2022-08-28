import React, { useEffect, useRef, useState } from "react";
import "../.././App.css";
import { loadUser, userSelector } from "../../reducers/Account/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import {
  Col,
  Container,
  Row,
  Button,
  Form,
  Card,
  Table,
  FormControl,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Footer from "../home/Footer";
import Menu from "./Menu";
import HeaderPageEmployee from "./HeaderPageEmployee";
import ReactPaginate from "react-paginate";
import EditForm from "./EditForm";
import { loadAllVoucher,addVoucher,deleteVoucher,updateVoucher, voucherSelector } from "../../reducers/Voucher/voucher";
import { toastSuccess } from "../../Toast/Toast";

const ManageVoucher = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let user = useSelector(userSelector);
  let vouchers =useSelector(voucherSelector)  
  const dateStartRef = useRef()
  const dateEndRef = useRef()
  const formRef = useRef()
  useEffect(() => {
    dispatch(loadUser());
    dispatch(loadAllVoucher())
  }, [dispatch]);


  const [pageNumber, setPageNumber] = useState(0)
    const todoPerPage = 9
    const pagesVisited = pageNumber * todoPerPage
    const pageCount = Math.ceil(vouchers.length / todoPerPage)

    const delvoucher = (id_voucher) => {
      dispatch(deleteVoucher(id_voucher));
    };
    const [activeForm, setActiveForm] = useState(true);
    const [formVoucher, setFormVoucher] = useState({
      id_voucher:0,
      title:"",
      quantity: "",
      discount: "",
      covert_date_start:"",
      covert_date_end: "",
      description: "",
      
    });
    const {
      id_voucher,
      title,
      quantity,
      discount,
      covert_date_start,
      covert_date_end,
      description,
      
    } = formVoucher

  const onChangeFormVoucher = (event) => {
    setFormVoucher({
      ...formVoucher,
      [event.target.name]: event.target.value,
    });
  };


  const onSubmitFormVoucher = (event) => {
    event.preventDefault();
    
    if(activeForm){
      const fd = new FormData();
      fd.append("title", title);
      fd.append("quantity", quantity);
      fd.append("discount", discount);
      fd.append("date_start", covert_date_start);
      fd.append("date_end", covert_date_end);
      fd.append("description", description);
      
      dispatch(addVoucher({fd, history}));
    }else{
      const data= {
      id_voucher: id_voucher,
      quantity:quantity,
      description: description
      }
       dispatch(updateVoucher(data));
    }
    
    
    
  };


  const resetForm = (event) =>{
    event.preventDefault();
    setActiveForm(true)
    setFormVoucher({
        id_voucher:0,
        title:"",
        quantity: "",
        discount: "",
        covert_date_start:"",
        covert_date_end: "",
        description: "",
        
    }) 
    formRef.current.reset()
  }

  

  const showListvoucher = vouchers
    .slice(pagesVisited, pagesVisited + todoPerPage)
    .map((voucher, index) => {
      const STT = index + 1;

      return (
        <>
          <tr
            key={voucher.id_voucher}
            style={{
              textAlign: "center",
              color: "blue",
              fontWeight: "600",
              verticalAlign: "middle",
            }}
          >
            <td style={{}}>
              <span>{STT}</span>
            </td>
            <td style={{ textAlign: "left" }}>
              {voucher.title}
            </td>
            <td >{voucher.quantity}</td>
            <td>{voucher.discount}%</td>
            <td>{voucher.date_start}</td>
            <td>{voucher.date_end}</td>
            <td style={{ textAlign: "left" }}> {voucher.description} </td>
            <td>
              <Button
                variant="success"
                onClick={() =>{
                    setFormVoucher({
                        ...formVoucher,
                        id_voucher : voucher.id_voucher,
                        title: voucher.title,
                        quantity: voucher.quantity,
                        discount: voucher.discount,
                        covert_date_start: voucher.date_start,
                        covert_date_end: voucher.date_end,
                        description: voucher.description
                    }                        
                    )
                    setActiveForm(false)
                }
                }
              >
                Sửa
              </Button>
            </td>
            <td>
              <Button
                variant="danger"
                onClick={() => delvoucher(voucher.id_voucher)}
              >
                <i className="far fa-trash-alt fa-x"></i>
              </Button>
            </td>
          </tr>
        </>
      );
    });

    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }

  return (
    <div className="App">
      <HeaderPageEmployee
        full_name={user.full_name}
        email={user.email}
        phone_number={user.phone_number}
        identification={user.identification}
        date_of_birth={user.date_of_birth}
        address={user.address}
        avatar={user.avatar}
        gender={user.gender}
        role={user.role}
      />
      <Container fluid style={{ marginTop: "110px", minHeight: "85vh" }}>
        <Row>
          <Menu />
          <Col xl={7} lg={3}>
            <Card>
              <Card.Title className="border-bottom p-3 mb-0 d-flex flex-row ">
                <h3 style={{ color: "green", margin: "10px auto" }}>
                  Danh sách Voucher{" "}
                </h3>
              </Card.Title>
              <Card.Body className="show-product">
                <Table bordered>
                  <thead>
                    <tr style={{ textAlign: "center" }}>
                      <th style={{ width: "2%", lineHeight: "32px" }}>#</th>
                      <th style={{ width: "18%", lineHeight: "32px",textAlign: "left", }}>
                        Tên Mã
                      </th>
                      <th
                        style={{
                          width: "7%",
                          lineHeight: "32px",
                        }}
                      >
                        SL
                      </th>
                      
                      <th style={{ width: "8%", lineHeight: "32px" }}>
                        DisCount
                      </th>
                      <th style={{ width: "13%", lineHeight: "32px" }}>
                        Ngày bắt đầu
                      </th>
                      <th
                        style={{
                          width: "13%",
                          lineHeight: "32px",
                        }}
                      >
                        ngày kết thúc
                      </th>
                      <th
                        style={{
                          width: "33%",
                          lineHeight: "32px",
                          textAlign: "left",
                        }}
                      >
                        Mô tả
                      </th>
                      <th style={{ width: "6%", lineHeight: "32px" }}>Sửa</th>
                      <th style={{ width: "6%", lineHeight: "32px" }}>Xóa</th>
                    </tr>
                  </thead>
                  <tbody>{showListvoucher}</tbody>
                </Table>
              </Card.Body>
              {pageCount >1?
                    <ReactPaginate
                        style={{textAlign: 'center'}}
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
            </Card>
          </Col>
          <Col xl={3} lg={3}>
            {activeForm?
            <h2 style={{ margin: "20px 20px 40px" }}>Thêm Voucher mới</h2>
            :<h2 style={{ margin: "20px 20px 40px" }}>Cập nhật Voucher</h2>}
            <Form ref={formRef}
              className="d-flex flex-column"
              style={{ textAlign: "center" }}
              onSubmit={onSubmitFormVoucher}
            >
              {activeForm?
              <Form.Group className="mb-3" style={{textAlign:'left'}} >
              <Form.Label>Mã giảm giá:</Form.Label>
              <Form.Control
                type="text"
                require="true"
                placeholder="nhập mã giảm giá"
                name="title"
                value={title}
                onChange={onChangeFormVoucher}
              />
              </Form.Group>:
              <Form.Group className="mb-3" style={{textAlign:'left'}} >
              <Form.Label>Mã giảm giá:</Form.Label>
              <Form.Control
                disabled
                type="text"
                require="true"
                placeholder="nhập mã giảm giá"
                name="title"
                value={title}
                onChange={onChangeFormVoucher}
              />
              </Form.Group>
              }
              
              
              <Form.Group className="mb-3" style={{textAlign:'left'}} >
              <Form.Label>Số lượng mã:</Form.Label>
                <Form.Control
                  type="numeric"
                  require="true"
                  placeholder="Nhập Số lượng mã..."
                  name="quantity"
                  value={quantity}
                  onChange={onChangeFormVoucher}
                />
              </Form.Group>
              {activeForm?<Form.Group className="mb-3" style={{textAlign:'left'}} >
                <Form.Label>Giá trị của mã {'('}Tính Theo %{')'}</Form.Label>
                <Form.Control
                  type="number"
                  require="true"
                  placeholder="Giảm Tính Theo %.VD: nhập 10 => giảm 10%..."
                  name="discount"
                  value={discount}
                  onChange={onChangeFormVoucher}
                />
              </Form.Group>:
              <Form.Group className="mb-3" style={{textAlign:'left'}} >
              <Form.Label>Giá trị của mã {'('}Tính Theo %{')'}</Form.Label>
              <Form.Control
                disabled
                type="numeric"
                require="true"
                placeholder="Giảm Tính Theo %.VD: nhập 10 => giảm 10%..."
                name="discount"
                value={discount}
                onChange={onChangeFormVoucher}
              />
            </Form.Group>
              }
              {activeForm?<Form.Group className="mb-3" style={{textAlign:'left'}} >
                <Form.Label >Mã có hiệu lực từ ngày:</Form.Label>
                <Form.Control
                  
                  ref={dateStartRef}
                  require="true"
                  placeholder="Nhập ngày mã bắt đầu có hiệu lực"
                  name="covert_date_start"
                  value={covert_date_start}
                  onChange={onChangeFormVoucher}
                  type="text"
                  onFocus={() => {
                    dateStartRef.current.type = 'date'
                  }}
                  onBlur={() => {
                    dateStartRef.current.type = 'text'
                  }}
                />
              </Form.Group>:
                <Form.Group className="mb-3" style={{textAlign:'left'}} >
                <Form.Label >Mã có hiệu lực từ ngày:</Form.Label>
                <Form.Control
                  disabled
                  ref={dateStartRef}
                  require="true"
                  placeholder="Nhập ngày mã bắt đầu có hiệu lực"
                  name="covert_date_start"
                  value={covert_date_start}
                  onChange={onChangeFormVoucher}
                  type="text"
                  onFocus={() => {
                    dateStartRef.current.type = 'date'
                  }}
                  onBlur={() => {
                    dateStartRef.current.type = 'text'
                  }}
                />
              </Form.Group>
              }
              
              {activeForm?
              <Form.Group className="mb-3" style={{textAlign:'left'}} >
              <Form.Label >Ngày mã hết hiệu lực:</Form.Label>
              <Form.Control
                ref={dateEndRef}
                require="true"
                placeholder="nhập ngày mã hết hiệu lực..."
                name="covert_date_end"
                value={covert_date_end}
                onChange={onChangeFormVoucher}
                type="text"
                onFocus={() => {
                  dateEndRef.current.type = 'date'
                }}
                onBlur={() => {
                  dateEndRef.current.type = 'text'
                }}
              />
            </Form.Group>
              :
              <Form.Group className="mb-3" style={{textAlign:'left'}} >
                <Form.Label >Ngày mã hết hiệu lực:</Form.Label>
                <Form.Control
                   disabled
                  ref={dateEndRef}
                  require="true"
                  placeholder="nhập ngày mã hết hiệu lực..."
                  name="covert_date_end"
                  value={covert_date_end}
                  onChange={onChangeFormVoucher}
                  type="text"
                  onFocus={() => {
                    dateEndRef.current.type = 'date'
                  }}
                  onBlur={() => {
                    dateEndRef.current.type = 'text'
                  }}
                />
              </Form.Group>}

              <Form.Group className="mb-3" style={{textAlign:'left'}} >
                <Form.Label>Mô tả về mã:</Form.Label>
                <Form.Control
                  as='textarea'
                  require="true"
                  placeholder="Mô tả về mã"
                  name="description"
                  value={description}
                  onChange={onChangeFormVoucher}
                />
              </Form.Group>
             
            <div className="d-flex flex Row">
                  {activeForm?
                  <>
                  <Button style={{margin:'auto', width:'20%'}} type='button'
                  onClick={(e)=> resetForm(e)              
                  }
                >
                  <span style={{ color: "white" }}>Hủy</span>
                </Button>
                <Button type="submit" style={{margin:'auto',width:'20%'}}>
                  <span style={{ color: "white" }}>Thêm</span>
                </Button>
                </>  :
                <>
               < Button style={{margin:'auto', width:'20%'}} type='button'
                  onClick={(e)=> resetForm(e)              
                  }
                  >
                    <span style={{ color: "white" }}>Đóng</span>
                  </Button>
                  <Button type="submit" style={{margin:'auto',width:'20%'}}>
                    <span style={{ color: "white" }}>Cập nhật</span>
                  </Button>
            
                </>

                }
                        
    

            </div>
            </Form>
             
            
            {/* </>:
            <>
            <h2 style={{ margin: "20px 20px 40px" }}>Cập nhật sản phẩm</h2>
            <Form ref={formRef}
              className="d-flex flex-column"
              style={{ textAlign: "center" }}
              onSubmit={onSubmitUpdateProduct}
            >
              <Form.Group className="mb-3" style={{textAlign:'left'}} >
                <Form.Label>Tên Sản phẩm:</Form.Label>
                <Form.Control
                  type="text"
                  require="true"
                  placeholder="Tên sản phẩm"
                  name="name_product"
                  value={name_product}
                  onChange={onChangeAddProduct}
                />
              </Form.Group>
              <Form.Group className="mb-3" style={{textAlign:'left'}} >
              <Form.Label>Giá tiền:</Form.Label>
                <Form.Control
                  type="numeric"
                  require="true"
                  placeholder="Giá tiền"
                  name="price"
                  value={price}
                  onChange={onChangeAddProduct}
                />
              </Form.Group>
              <Form.Group className="mb-3" style={{textAlign:'left'}} >
                <Form.Label>Mô tả về sản phẩm:</Form.Label>
                <Form.Control
                  as='textarea'
                  require="true"
                  placeholder="Mô tả về sản phẩm"
                  name="description"
                  value={description}
                  onChange={onChangeAddProduct}
                />
              </Form.Group>
              <Form.Group className="mb-3" style={{textAlign:'left'}} >
                <Form.Label>Số lượng trong kho:</Form.Label>
                <Form.Control
                  type="numeric"
                  require="true"
                  placeholder="Số lượng trong kho"
                  name="quantity"
                  value={quantity}
                  onChange={onChangeAddProduct}
                />
              </Form.Group>
              <Form.Group className="mb-3" style={{textAlign:'left'}} >
                <Form.Label>Giảm giá {'('}Tính Theo %{')'}.VD: nhập 10 {'=>'} 10%</Form.Label>
                <Form.Control
                  type="numeric"
                  require="true"
                  placeholder="Giảm giá (Tính Theo %).VD: nhập 10 => 10%"
                  name="discount"
                  value={discount}
                  onChange={onChangeAddProduct}
                />
              </Form.Group>
              <Form.Group className="mb-3" style={{textAlign:'left'}} >
                <Form.Label >Ngày kết thúc giảm giá:</Form.Label>
                <Form.Control
                  ref={dateRef}
                  require="true"
                  placeholder="Ngày kết thúc giảm giá"
                  name="date_discount_end"
                  value={date_covert}
                  onChange={onChangeAddProduct}
                  type="text"
                  onFocus={() => {
                    dateRef.current.type = 'date'
                  }}
                  onBlur={() => {
                    dateRef.current.type = 'text'
                  }}
                />
              </Form.Group>
            <div className="d-flex flex Row">              
              <Button style={{margin:'auto', width:'20%'}} type='button'
              onClick={(e)=> resetForm(e)              
              }
              >
                <span style={{ color: "white" }}>Đóng</span>
              </Button>
              <Button type="submit" style={{margin:'auto',width:'20%'}}>
                <span style={{ color: "white" }}>Cập nhật</span>
              </Button>

            </div>
            </Form>
            </>} */}
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default ManageVoucher;
