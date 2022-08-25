import React, { useState, useRef } from "react"
import { toastError, toastSuccess } from "../.././Toast/Toast"
import { registerEmployee } from "../../utils/callerAPI"
import { useHistory, Link } from "react-router-dom"
import { Form, Button } from "react-bootstrap"


const RegisterEmployeeForm = () => {
    const [registerForm, setRegisterForm] = useState({
        full_name: "",
        email: "",
        phone_number:"",
        identification:"",
        date_of_birth:'',
        gender:0,
        address:"",
        account_name: "",
        password: "123456",
        confirm: "123456",
    })

    const history = useHistory()
    const dateRef = useRef()

    const onChangeRegister = (event) => {
        setRegisterForm({
            ...registerForm,
            [event.target.name]: event.target.value,
        })
    }
    const onSubmitRegister = async (event) => {
        event.preventDefault()
        if (password !== confirm) {
            toastError("Password and Confirm password must match")
        } else {
            try {
                var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
                var CCCD_format=/(([0-9]{12})\b)/g
                if(!vnf_regex.test(phone_number)){
                    toastError("SĐT phải có 10 số! Bắt đầu bằng 1 trong các cặp số 09, 03, 07, 08, 05")
                    return 
                }
                if(!CCCD_format.test(identification)){
                    toastError("CCCD phải là 12 chữ số")
                    return 
                }

                const register = {
                    full_name: full_name,
                    email: email,
                    phone_number:phone_number,
                    identification:identification,
                    date_of_birth:date_of_birth,
                    gender:gender,
                    address:address,
                    account_name: account_name,
                    password: password,
                }
                toastSuccess('Đang tạo tài khoản vui lòng chờ thông báo tiếp theo')
                const registerData = await registerEmployee(register)
                if (registerData.status) {
                    toastSuccess(registerData.message)
                    setRegisterForm({
                        full_name: "",
                        email: "",
                        phone_number:"",
                        identification:"",
                        date_of_birth:'',
                        gender:0,
                        address:"",
                        account_name: "",
                        password: "123456",
                        confirm: "123456",
                    })
                } else {
                    toastError(registerData.message)
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    const {  full_name, email,phone_number,identification, date_of_birth, gender,address,account_name, password, confirm } = registerForm
    return (
        
        <div className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1>Đăng kí tài khoản nhân niên</h1>
                    <Form className='my-4' 
                    onSubmit={onSubmitRegister}
                    >
                        <Form.Group className="mb-3">
                            <Form.Control type='text'
                                require="true"
                                placeholder="Họ và tên khách hàng"
                                name="full_name"
                                value={full_name}
                                onChange={onChangeRegister}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control type='email'
                                require="true"
                                placeholder="Email"
                                name="email"
                                value={email}
                                onChange={onChangeRegister}
                                
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control type='text'
                                require="true"
                                placeholder="Số điện thoại"
                                name="phone_number"
                                value={phone_number}
                                onChange={onChangeRegister}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control type='text'
                                require="true"
                                placeholder="CCCD"
                                name="identification"
                                value={identification}
                                onChange={onChangeRegister}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control type='date'
                                ref={dateRef}
                                require="true"
                                placeholder="Ngày sinh"
                                name="date_of_birth"
                                value={date_of_birth}
                                onChange={onChangeRegister}
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
                                 type='text'
                                require="true"
                                placeholder="Địa chỉ"
                                name="address"
                                value={address}
                                onChange={onChangeRegister}
                               
                                
                            />
                        </Form.Group> 
                        <Form.Group className="mb-3" style={{textAlign: 'left'}}>
                                <Form.Check
                                    inline
                                    label="Nam"
                                    name="gender"
                                    type="radio"
                                    id={`inline-radio-1`}
                                    value="0"

                                    onChange={onChangeRegister}
                                />
                                <Form.Check
                                    inline
                                    label="Nữ"
                                    name="gender"
                                    type="radio"
                                    id={`inline-radio-2`}
                                    value="1"
                                    onChange={onChangeRegister}
                                />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Control type='text'
                                require="true"
                                placeholder="Tên đăng nhập"
                                name="account_name"
                                value={account_name}
                                onChange={onChangeRegister}
                            />
                        </Form.Group>                                                
                        {/* <Form.Group className="mb-3">
                            <Form.Control type='password'
                                require="true"
                                placeholder="Mật khẩu"
                                name="password"
                                value={password}
                                onChange={onChangeRegister}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control type='password'
                                require="true"
                                placeholder="Nhập lại mật khẩu"
                                name="confirm"
                                value={confirm}
                                onChange={onChangeRegister}
                            />
                        </Form.Group> */}
                        <Button className="mt-3" variant='danger' type='submit'>Đăng kí</Button>
                    </Form>
                </div>
            </div>
        </div >
    )
}

export default RegisterEmployeeForm