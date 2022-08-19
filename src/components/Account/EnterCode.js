import React, { useState } from "react"
import { Form, Button } from "react-bootstrap"
import { enterCodePass } from "../../utils/callerAPI"
import * as types from "../.././contains/types"
import {toastError, toastSuccess} from "../../Toast/Toast"
import { useHistory, Link, useLocation } from "react-router-dom"

const EnterCode = () => {
    const location = useLocation()
    const [codeForm, setCodeForm] = useState({
        account_name: location.state.account_name,
        code:""
    })
    const history = useHistory()
    const {account_name, code} = codeForm
    const onSubmitCode = async (event) => {
        event.preventDefault()
        try {
            const codeForgotPass = await enterCodePass({account_name, code})
            if (codeForgotPass.status === 200) {
                toastSuccess(codeForgotPass.message)
                
                history.push({
                    pathname:"/forgot/change",
                    state: {
                        account_name,
                        code
                    },            
                })
            } else {
                toastError(codeForgotPass.message)
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
                                <Form.Control type='text'
                                    placeholder="Nhập mã code xác nhận đã gửi đến gmail"
                                    name="code"
                                    require="true"
                                    value={code}
                                    onChange={(event) => setCodeForm({
                                        ...codeForm,
                                        [event.target.name]: event.target.value,
                                    })}
                                />
                            </Form.Group>
                            <Button className="mt-3" variant='success' type='submit'>Xác nhận</Button>
                        </Form>
                        <p>Gửi lại mã code?
                            &nbsp;
                            <Link to='/forgot/password'>
                                <Button style={{ color: 'white' }} variant='info' className='ml-2'>Lấy mã code</Button>
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

export default EnterCode
