import React, { useEffect, useRef, useState } from "react";
import "../.././App.css";
import { loadUser, userSelector } from "../../reducers/Account/LoginForm";
import {
  fetchListCategory,
  listCategorySelector,
} from "../../reducers/Category/category";
import { fetchListBrand, listBrandSelector } from "../../reducers/Brand/brand";
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
import {
  fetchAllProduct,
  productsSelector,
  deleteProduct,
  addProduct,
  updateProduct
} from "../../reducers/Products/products";
import { toastError, toastSuccess } from "../../Toast/Toast";

const ManageProduct = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let user = useSelector(userSelector);
  let categorys = useSelector(listCategorySelector);
  let brands = useSelector(listBrandSelector);
  const products = useSelector(productsSelector);
  const dateRef = useRef()
  const formRef = useRef()
  useEffect(() => {
    dispatch(loadUser());
    dispatch(fetchListCategory());
    dispatch(fetchListBrand());
    dispatch(fetchAllProduct());
  }, [dispatch]);


  const [pageNumber, setPageNumber] = useState(0)
    const todoPerPage = 9
    const pagesVisited = pageNumber * todoPerPage
    const pageCount = Math.ceil(products.length / todoPerPage)


  const [activeForm, setActiveForm] = useState(true);
  const [images, setImages] = useState([]);
  const [formProduct, setFormProduct] = useState({
    id_product:0,
    id_category: 0,
    id_brand: 0,
    name_product: "",
    price: "",
    description: "",
    quantity: "",
    discount: "",
    date_discount_end: "",
  });
  const {
    id_product,
    id_category,
    id_brand,
    name_product,
    price,
    description,
    quantity,
    discount,
  } = formProduct;

  const date_covert = formProduct.date_discount_end

  const delProduct = (id_product) => {
    dispatch(deleteProduct(id_product));
  };

  const onChangeAddProduct = (event) => {
    setFormProduct({
      ...formProduct,
      [event.target.name]: event.target.value,
    });
  };
  const fileSelectedHandle = (event) => {
    setImages(event.target.files);
  };
  

  const onSubmitAddProduct = (event) => {
    event.preventDefault();
    const fd = new FormData();
    // if(!price_format.test(formProduct.price)){
    //   console.log(typeof formProduct.price)
    //   toastError("Giá Tiền phải là số và không bắt đầu bằng số 0")
    //   return 
    // }
    // if(!price_format.test(formProduct.quantity)){
    //   toastError("Số lượng trong kho phải là số và không bắt đầu bằng số 0")
    //   return 
    // }
    // if(!discount_format.test(formProduct.quantity)){
    //   toastError("Giảm giá phải 2 chữ số. VD:01, 02, 99")
    //   return 
    // }

    fd.append("name_product", formProduct.name_product);
    fd.append("description", formProduct.description);
    fd.append("price", formProduct.price);
    fd.append("quantity", formProduct.quantity);
    fd.append("discount", formProduct.discount === "" ? 0 : formProduct.discount);
    fd.append("date_discount_end", formProduct.date_discount_end);
    fd.append("id_category", formProduct.id_category);
    fd.append("id_brand", formProduct.id_brand);
    fd.append("img1", images[0] || new Blob([]), images[0]?.name || "");
    fd.append("img2", images[1] || new Blob([]), images[1]?.name || "");
    fd.append("img3", images[2] || new Blob([]), images[2]?.name || "");
    fd.append("img4", images[3] || new Blob([]), images[3]?.name || "");
    fd.append("img5", images[4] || new Blob([]), images[4]?.name || "");
    toastSuccess("Đang thêm Sản phẩm vui lòng chờ giây lát....")
    dispatch(addProduct(fd));
  };

  const onSubmitUpdateProduct = (event) => {
    event.preventDefault();
    if(discount === ""){
        discount = 0
    }
    if(date_covert.indexOf('/') !== -1){
        const time = date_covert.split('/');
        const date_discount_end = new Date(time[2]+"-"+time[1]+"-"+time[0]);
        const data= {
                id_product:id_product,
                name_product:name_product,
                price:price,
                description: description,
                quantity: quantity,
                discount: discount,
                date_discount_end: date_discount_end
        }
        dispatch(updateProduct(data));
    }else{
        const data= {
            id_product:  id_product,
            name_product: name_product,
            price: price,
            description:  description,
            quantity:  quantity,
            discount:  discount,
            date_discount_end:  date_covert
        }
        dispatch(updateProduct(data));
    }

    
    
  };
  
  const resetForm = (event) =>{
    event.preventDefault();
    setActiveForm(true)
    setFormProduct({
        id_product:0,
        id_category: 0,
        id_brand: 0,
        name_product: "",
        price: "",
        description: "",
        quantity: "",
        discount: "",
        date_discount_end: "",
    }) 
    formRef.current.reset()
  }

  const listCategory = categorys.map((category, index) => {
    return (
      <option key={category.id_category} value={category.id_category}>
        {category.name_category}
      </option>
    );
  });
  const listBrand = brands.map((brand, index) => {
    return (
      <option key={brand.id_brand} value={brand.id_brand}>
        {brand.name_brand}
      </option>
    );
  });

  const showListProduct = products
    .slice(pagesVisited, pagesVisited + todoPerPage)
    .map((product, index) => {
      const STT = index + 1;

      return (
          <tr
            key={product.id_product}
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
            <td>
              <img src={product.images[0]} width="100px"></img>
            </td>
            <td style={{ textAlign: "left" }}>{product.name_product}</td>
            <td>{product.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</td>
            <td>{product.quantity}</td>
            <td>{product.discount}%</td>
            <td>{product.date_discount_end}</td>
            <td style={{ textAlign: "left" }}> {product.description} </td>
            <td>
              <Button
                variant="success"
                onClick={() =>{
                    setFormProduct({
                        ...formProduct,
                        id_product:product.id_product,
                        name_product: product.name_product,
                        price: product.price,
                        description: product.description,
                        quantity: product.quantity,
                        discount: product.discount,
                        date_discount_end: product.date_discount_end,
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
                onClick={() => delProduct(product.id_product)}
              >
                <i className="far fa-trash-alt fa-x"></i>
              </Button>
            </td>
          </tr>
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
                  Danh sách sản phẩm{" "}
                </h3>
              </Card.Title>
              <Card.Body className="show-product">
                <Table bordered>
                  <thead>
                    <tr style={{ textAlign: "center" }}>
                      <th style={{ width: "2%", lineHeight: "32px" }}>#</th>
                      <th style={{ width: "10%", lineHeight: "32px" }}>
                        Hình ảnh
                      </th>
                      <th
                        style={{
                          width: "12%",
                          lineHeight: "32px",
                          textAlign: "left",
                        }}
                      >
                        Tên sản phẩm
                      </th>
                      <th style={{ width: "13%", lineHeight: "32px" }}>Giá</th>
                      <th style={{ width: "8%", lineHeight: "32px" }}>SL</th>
                      <th style={{ width: "8%", lineHeight: "32px" }}>
                        DisCount
                      </th>
                      <th style={{ width: "13%", lineHeight: "32px" }}>
                        Giảm đến ngày
                      </th>
                      <th
                        style={{
                          width: "22%",
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
                  <tbody>{showListProduct}</tbody>
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
            <>
            <h2 style={{ margin: "20px 20px 40px" }}>Thêm sản phẩm mới</h2>
            <Form ref={formRef}
              className="d-flex flex-column"
              style={{ textAlign: "center" }}
              onSubmit={onSubmitAddProduct}
            >
              <Form.Select
                className="mb-3"
                aria-label="Default select example"
                name="id_category"
                onChange={onChangeAddProduct}
              >
                <option value="0">Sẩn phẩm thuộc danh mục</option>
                {listCategory}
              </Form.Select>

              <Form.Select
                className="mb-3"
                name="id_brand"
                aria-label="Default select example"
                onChange={onChangeAddProduct}
              >
                <option value="0">Sản phẩm thuộc nhãn hiệu</option>
                {listBrand}
              </Form.Select>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  require="true"
                  placeholder="Tên sản phẩm"
                  name="name_product"
                  value={name_product}
                  onChange={onChangeAddProduct}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  require="true"
                  placeholder="Giá tiền"
                  min="1000"
                  name="price"
                  value={price}
                  onChange={onChangeAddProduct}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  as="textarea"
                  require="true"
                  placeholder="Mô tả về sản phẩm"
                  name="description"
                  value={description}
                  onChange={onChangeAddProduct}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  require="true"
                  placeholder="Số lượng trong kho"
                  name="quantity"
                  value={quantity}
                  onChange={onChangeAddProduct}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  require="true"
                  placeholder="Giảm giá (Tính Theo %).VD: nhập 10 => 10%"
                  min="0" max="99"
                  name="discount"
                  value={discount}
                  onChange={onChangeAddProduct}
                />
              </Form.Group>
              <Form.Group className="mb-3">
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

              <Form.Group className="mb-3">
                <Form.Control
                  type="file"
                  multiple
                  require="true"
                  placeholder="Chọn file hình ảnh"
                  name="images"
                  onChange={(e) => {
                    fileSelectedHandle(e);
                  }}
                />
              </Form.Group>
            <div className="d-flex flex Row">              
              <Button style={{margin:'auto', width:'20%'}} type='button'
              onClick={(e)=> resetForm(e)              
              }
              >
                <span style={{ color: "white" }}>Hủy</span>
              </Button>
              <Button type="submit" style={{margin:'auto',width:'20%'}}>
                <span style={{ color: "white" }}>Thêm</span>
              </Button>

            </div>
            </Form>
            </>:
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
                  type="number"
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
                  min="0" max="99"
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
            </>}
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default ManageProduct;
