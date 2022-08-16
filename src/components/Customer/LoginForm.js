import React, { useState } from "react"
import { Link } from "react-router-dom"
import { loginUser } from "../.././utils/callerAPI"
import { toastError, toastSuccess } from "../.././Toast/Toast"
import { useHistory } from "react-router-dom"
import { Form, Button } from "react-bootstrap"

const LoginForm = () => {
    const [loginForm, setLoginForm] = useState({
        account_name: "",
        password: "",
    })

    const history = useHistory()

    const onChangeLogin = (event) => {
        setLoginForm({
            ...loginForm,
            [event.target.name]: event.target.value,
        })
    }
    const onSubmitLogin = async (event) => {
        event.preventDefault()
        try {
            const loginData = await loginUser(loginForm)
            if (loginData.status === 200) {
                toastSuccess(loginData.message)
                history.push("/")
            } else {
                toastError(loginData.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const { account_name, password } = loginForm
    return (        
        <div className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1>Mắt kính thời trang</h1>
                    <h4>Chào mừng bạn đến với website Glasses Fashion</h4>
                    <Form className='my-4' 
                    onSubmit={onSubmitLogin}
                    >
                        <Form.Group className="mb-3">
                            <Form.Control type='text'
                                placeholder="Tên đăng nhập"
                                require="true"
                                name="account_name"
                                value={account_name}
                                onChange={onChangeLogin}
                            />
                        </Form.Group>
                        <Form.Group >
                            <Form.Control type='password'
                                placeholder='Mật khẩu'

                                require='true'
                                name="password"
                                value={password}
                                onChange={onChangeLogin}
                            />
                        </Form.Group>
                        <Button className="mt-3" variant='success' type='submit'>Đăng nhập</Button>
                    </Form>
                    <Link style={{ color: 'white', marginBottom: '15px' }} to="/forgot/password">
                        Quên mật khẩu?
                    </Link>
                    <p>Bạn chưa có tài khoản?
                        &nbsp;
                        <Link to='/register'>
                            <Button style={{ color: 'white' }} variant='info' className='ml-2'>Đăng kí ngay</Button>
                        </Link>
                        &nbsp;
                        <Link to='/'>
                            <Button style={{ color: 'white' }} variant='info'>Trang chủ</Button>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LoginForm
