import React, { useState } from "react"
import { toastError, toastSuccess } from "../.././Toast/Toast"
import { registerUser } from "../../utils/callerAPI"
import { useHistory, Link } from "react-router-dom"
import { Form, Button } from "react-bootstrap"


const RegisterForm = () => {
    const [registerForm, setRegisterForm] = useState({
        full_name: "",
        email: "",
        phone_number:"",
        gender:0,
        address:"",
        account_name: "",
        password: "",
        confirm: "",
    })

    const history = useHistory()

    const onChangeRegister = (event) => {
        setRegisterForm({
            ...registerForm,
            [event.target.name]: event.target.value,
        })
    }
    const onSubmitRegister = async (event) => {
        event.preventDefault()
        var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        if(!vnf_regex.test(phone_number)){
            toastError("SĐT phải có 10 số! Bắt đầu bằng 1 trong các cặp số 09, 03, 07, 08, 05")
            return 
        }
        if (password !== confirm) {
            toastError("Password and Confirm password must match")
        } else {
            try {
                const register = {
                    full_name: full_name,
                    email: email,
                    phone_number:phone_number,
                    gender:gender,
                    address:address,
                    account_name: account_name,
                    password: password,
                }
                const registerData = await registerUser(register)
                if (registerData.status) {
                    toastSuccess(registerData.message)
                    history.push("/login")
                } else {
                    toastError(registerData.message)
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    const {  full_name, email,phone_number, gender,address,account_name, password, confirm } = registerForm
    return (
        
        <div className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1>Đăng kí tài khoản</h1>
                    <h4>Chào mừng bạn đến với website Glasses Fashion</h4>
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
                                placeholder="Địa chỉ"
                                name="address"
                                value={address}
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
                        <Form.Group className="mb-3">
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
                        </Form.Group>
                        <p>Nhấp ĐĂNG KÝ là bạn đồng ý với điều khoản và quy định</p>
                        <Button className="mt-3" variant='danger' type='submit'>Đăng kí</Button>
                    </Form>
                    <p>Bạn đã có tài khoản?
                        &nbsp;
                        <Link to='/login'>
                            <Button style={{ color: 'white' }} variant='info' className='ml-2'>Đăng nhập ngay</Button>
                        </Link>
                        &nbsp;
                        <Link to='/'>
                            <Button style={{ color: 'white' }} variant='info'>Trang chủ</Button>
                        </Link>
                    </p>
                </div>
            </div>
        </div >
    )
}

export default RegisterForm