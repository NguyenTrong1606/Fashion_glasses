import React, { useState } from "react"
import { Form, Button } from "react-bootstrap"
import { enterPasswordChange } from "../../utils/callerAPI"
import * as types from "../.././contains/types"
import {toastError, toastSuccess} from "../../Toast/Toast"
import { useHistory, Link, useLocation } from "react-router-dom"

const EnterNewPassword= () => {
    const location = useLocation()
    const [codeForm, setCodeForm] = useState({
        account_name: location.state.account_name,
        code: location.state.code,
        new_password:"",
        confirm: "",
    })
    const history = useHistory()
    const {account_name, code, new_password, confirm} = codeForm
    const onSubmitCode = async (event) => {
        event.preventDefault()
        try {
            if (new_password === "") {
                toastError("Chưa nhập mật khẩu mới!")
                return
            }
            if (confirm === "") {
                toastError("Chưa nhập mật khẩu xác nhận!")
                return
            }
            if (new_password !== confirm) {
                toastError("Mật khẩu xác nhận không khớp!")
                return
            }
            const enterNewPass = await enterPasswordChange({account_name, code, new_password})
            if (enterNewPass.status === 200) {
                toastSuccess(enterNewPass.message)                
                history.push('/login')
            } else {
                toastError(enterNewPass.message)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div className="landing">
                <div className="dark-overlay">
                    <div className="landing-inner">
                        <h1>Chào mừng bạn đến với Fashion Glasses</h1>
                        <h4>Lấy lại mật khẩu</h4>
                        <Form className='my-4' onSubmit={onSubmitCode}>
                            <Form.Group className="mb-3">
                                <Form.Control type='password'
                                    placeholder="Nhập mật khẩu mới"
                                    name="new_password"
                                    require="true"
                                    value={new_password}
                                    onChange={(event) => setCodeForm({
                                        ...codeForm,
                                        [event.target.name]: event.target.value,
                                    })}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control type='password'
                                    placeholder="Xác nhận mật khẩu mới"
                                    name="confirm"
                                    require="true"
                                    value={confirm}
                                    onChange={(event) => setCodeForm({
                                        ...codeForm,
                                        [event.target.name]: event.target.value,
                                    })}
                                />
                            </Form.Group>
                            <Button className="mt-3" variant='success' type='submit'>Xác nhận</Button>
                        </Form>                        
                            &nbsp;
                            <Link to='/'>
                                <Button style={{ color: 'white' }} variant='info'>Trang chủ</Button>
                            </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EnterNewPassword
