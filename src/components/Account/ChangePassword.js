import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadUser, userSelector } from "../../reducers/Account/LoginForm"
import { changePassword } from "../../utils/callerAPI"
import { toastError, toastSuccess } from "../../Toast/Toast"
import { Link } from "react-router-dom"

const ChangePassword = () => {
    const [new_password, setNewPassword] = useState("")
    const [old_password, setOldPassword] = useState("")
    const [new_password_confirm, setNewPasswordConfirm] = useState("")
    const dispatch = useDispatch()
    const user = useSelector(userSelector)

    useEffect(() => {
        dispatch(loadUser)
    }, [dispatch])

    const onSubmitChangePassword = async (event) => {
        event.preventDefault()
        try {
            if (old_password === "") {
                toastError("Chưa nhập mật khẩu cũ!")
                return
            }
            if (new_password === "") {
                toastError("Chưa nhập mật khẩu mới!")
                return
            }
            if (new_password_confirm === "") {
                toastError("Chưa nhập mật khẩu xác nhận!")
                return
            }
            if (new_password !== new_password_confirm) {
                toastError("Mật khẩu xác nhận không khớp!")
                return
            }

            let data = {
                old_password: old_password,
                new_password: new_password,
            }
            const changePass = await changePassword(data)
            if(changePass.status ===200){
                toastSuccess(changePass.message)
            }
            else{
                toastError(changePass.message)
            }
            
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div className="wapper">
                <div className="content">
                    <Link to="/">
                        {" "}
                        <header className="img-logo"></header>
                    </Link>
                    <div className="login-content">
                        <div className="bia-login" />
                        <form
                            className="box-update-info open"
                            onSubmit={onSubmitChangePassword}
                        >
                            <h2 style={{ top: '20%' }}>Thay đổi mật khẩu</h2>

                            <div id="input1-changePass">
                                <label
                                    htmlFor="updateInfo-input1"
                                    className="item-lable"
                                >
                                    <i className="fas fa-lock">&nbsp;&nbsp;</i>
                                </label>
                                <input
                                    type="password"
                                    className="item-input"
                                    id="updateInfo-input1"
                                    placeholder="Mật khẩu cũ"
                                    name="old_password"
                                    require="true"
                                    value={old_password}
                                    onChange={(e) =>
                                        setOldPassword(e.target.value)
                                    }
                                />
                            </div>
                            <div id="input2-changePass">
                                <label
                                    htmlFor="updateInfo-input2"
                                    className="item-lable"
                                >
                                    <i className="fas fa-lock">&nbsp;&nbsp;</i>
                                </label>
                                <input
                                    type="password"
                                    className="item-input"
                                    id="updateInfo-input2"
                                    placeholder="Mật khẩu mới"
                                    name="new_password"
                                    require="true"
                                    value={new_password}
                                    onChange={(e) =>
                                        setNewPassword(e.target.value)
                                    }
                                />
                            </div>
                            <div id="input3-changePass">
                                <label
                                    htmlFor="updateInfo-input3"
                                    className="item-lable"
                                >
                                    <i class="fas fa-lock">&nbsp;&nbsp;</i>
                                </label>
                                <input
                                    type="password"
                                    className="item-input"
                                    id="updateInfo-input3"
                                    placeholder="Nhập lại mật khẩu mới"
                                    name="new_password_confirm"
                                    require="true"
                                    value={new_password_confirm}
                                    onChange={(e) =>
                                        setNewPasswordConfirm(e.target.value)
                                    }
                                />
                            </div>

                            <button id="sign-in-changePass" type="submit">
                                Đổi mật khẩu
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChangePassword
