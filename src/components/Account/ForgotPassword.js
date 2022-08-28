import React, { useState } from "react"
import { Form, Button } from "react-bootstrap"
import { toastError,toastSuccess } from "../../Toast/Toast"
import {forgotPassword} from "../../utils/callerAPI"
import { useHistory, Link } from "react-router-dom"
import * as types from "../.././contains/types"

const ForgotPassword = () => {
    const history = useHistory()
    const [account_name, setAccount_name] = useState("")
    const onSubmitForgotPassword = async (event) => {
        event.preventDefault()
        toastSuccess("Đang gửi mã CODE đến email của bạn. Vui lòng chờ...!")
        const response = await forgotPassword(account_name)
        if (response.status === 200) {
            toastSuccess(response.message)
            history.push({pathname:"/forgot/code",
            state: {
                account_name,
            },                            
            })
        } else {
            toastError(response.message)
        }
    }

    return (
        <>
            <div className="landing">
                <div className="dark-overlay">
                    <div className="landing-inner">
                        <h1>Chào mừng bạn đến với Fashion Glasses</h1>
                        <h4>Lấy lại mật khẩu</h4>
                        <Form className='my-4' onSubmit={onSubmitForgotPassword}>
                            <Form.Group className="mb-3">
                                <Form.Control type='text'
                                    placeholder="Tên đăng nhập"
                                    name="account_name"
                                    require="true"
                                    value={account_name}
                                    onChange={(e) =>
                                        setAccount_name(e.target.value)
                                    }
                                />
                            </Form.Group>
                            <Button className="mt-3" variant='success' type='submit'>Lấy mã code</Button>
                        </Form>
                        <p>Bạn đã nhớ mật khẩu?
                            &nbsp;
                            <Link to='/login'>
                                <Button style={{ color: 'white' }} variant='info' className='ml-2'>Đăng nhập</Button>
                            </Link>
                            &nbsp;
                            <Link to='/'>
                                <Button style={{ color: 'white' }} variant='info'>Trang chủ</Button>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword
