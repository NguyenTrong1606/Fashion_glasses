import React, { useState, useEffect } from "react"
import { Image } from "react-bootstrap"
import { updateinforCustomer, updateUser } from "../../utils/callerAPI"
import { toastError, toastSuccess } from "../.././Toast/Toast"
import { useDispatch } from "react-redux"
import { loadUser } from "../../reducers/Account/LoginForm"
import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'


const UpdateInforCustomer = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const [image, setImage] = useState({
        selectedFile: null,
    })
    const [formUpdateUser, setUpdateUser] = useState({
         full_name: location.state.full_name,
         email:location.state.email,
         phone_number:location.state.phone_number,
         address: location.state.address,
         avatar:location.state.avatar,
         gender:location.state.gender,
        
    })
    const { selectedFile } = image
    const { full_name,
        email,
        phone_number,
        address,
        avatar,
        gender, } = formUpdateUser

    useEffect(() => {
        return () => {
            avatar && URL.revokeObjectURL(avatar.preview)
        }
    }, [avatar])

    useEffect(() => {
        dispatch(loadUser())
    }, [dispatch])

    // const [frmGender, setGender] = useState(location.state.gender)

    const onChangeUpdateUser = (event) => {
        setUpdateUser({
            ...formUpdateUser,
            [event.target.name]: event.target.value,
        })
    }

    const fileSelectedHandle = (event) => {
        setImage({
            ...selectedFile,
            selectedFile: event.target.files[0],
        })

        const file = event.target.files[0]
        file.preview = URL.createObjectURL(file)
        setUpdateUser({
            ...formUpdateUser,
            avatar: file.preview
        })
    }
    const onSubmitUpdateUser = async (event) => {
        event.preventDefault()
        
        const fd = new FormData()
        fd.append('full_name', full_name)
        fd.append('address', address)
        fd.append('gender', gender)
        fd.append('avatar', selectedFile, selectedFile.name)

        try {

            const updateDataCustomer = await updateinforCustomer(fd)
            if (updateDataCustomer.status === 200) {
                toastSuccess(updateDataCustomer.message)
            } else {
                toastError(updateDataCustomer.message)
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
                                onSubmit={onSubmitUpdateUser}
                            >
                                <h2>Cập nhật thông tin cá nhân</h2>
                                <div className="box-avatar">
                                    <Image
                                        src={avatar}
                                        roundedCircle
                                        style={{ width: "8rem", height: '8rem' }}
                                        alt="avatar"
                                    />
                                </div>
                                <div id="input1">
                                    <label
                                        htmlFor="updateInfo-input1"
                                        className="item-lable"
                                    >
                                        <i className="fas fa-user-tie fa-lg">
                                            &nbsp;&nbsp;&nbsp;
                                        </i>
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        className="item-input"
                                        id="updateInfo-input1"
                                        placeholder="Họ và Tên người dùng"
                                        name="full_name"
                                        value={full_name}
                                        onChange={onChangeUpdateUser}
                                    />
                                </div>
                                <div id="input2">
                                    <label
                                        htmlFor="updateInfo-input2"
                                        className="item-lable"
                                    >
                                        <i className="fas fa-images fa-lg">
                                            &nbsp;
                                        </i>
                                    </label>
                                    <input
                                        required
                                        type="file"
                                        className="item-input"
                                        id="updateInfo-input2"
                                        placeholder="Đường dẫn ảnh của bạn"
                                        name="image"
                                        onChange={fileSelectedHandle}
                                    />
                                </div>
                                <div id="input3">
                                    <label
                                        htmlFor="updateInfo-input3"
                                        className="item-lable"
                                    >
                                        <i className="fas fa-envelope fa-lg">
                                            &nbsp;&nbsp;
                                        </i>
                                    </label>
                                    <input
                                        disabled
                                        type="text"
                                        className="item-input"
                                        id="updateInfo-input3"
                                        placeholder="Địa chỉ email..."
                                        name="email"
                                        value={email}
                                    />
                                </div>
                                <div id="input6">
                                <label
                                        htmlFor="updateInfo-input4"
                                        className="item-lable"
                                    >
                                        <FontAwesomeIcon icon={faHouse} />&nbsp;&nbsp;&nbsp;
                                    </label>
                                    <input
                                        type="text"
                                        className="item-input"
                                        id="updateInfo-input4"
                                        placeholder="địa chỉ...."
                                        name="address"
                                        value={address}
                                        onChange={onChangeUpdateUser}
                                    />
                                </div>
                                <div id="input4">
                                <label
                                        htmlFor="updateInfo-input6"
                                        className="item-lable"
                                    >
                                        <i className="fas fa-phone fa-lg">
                                            &nbsp;&nbsp;
                                        </i>
                                    </label>
                                    <input
                                        disabled
                                        type="text"
                                        className="item-input"
                                        id="updateInfo-input6"
                                        placeholder="SĐT.."
                                        name="phone_number"
                                        value={phone_number}
                                    />
                                    
                                </div>
                                {formUpdateUser.gender === 0?
                                    <div
                                    id="input5"
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        fontSize: "24px",
                                        fontWeight: "600",
                                    }}
                                >
                                    <div>
                                        <input
                                            type="radio"
                                            id="Nam"
                                            name="gender"
                                            value={0}
                                            onChange={onChangeUpdateUser}
                                            checked
                                        />
                                        <label htmlFor="Nam">Nam</label>&nbsp;
                                        <input
                                            type="radio"
                                            id="Nu"
                                            name="gender"
                                            value={1}
                                            onChange={onChangeUpdateUser}
                                            
                                        />
                                    </div>
                                    <label htmlFor="Nu">Nữ</label>
                                </div>:<div
                                    id="input5"
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        fontSize: "24px",
                                        fontWeight: "600",
                                    }}
                                >
                                    <div>
                                        <input
                                            type="radio"
                                            id="Nam"
                                            name="gender"
                                            value={0}
                                            onChange={onChangeUpdateUser}
                                            
                                        />
                                        <label htmlFor="Nam">Nam</label>&nbsp;
                                        <input
                                            checked
                                            type="radio"
                                            id="Nu"
                                            name="gender"
                                            value={1}
                                            onChange={onChangeUpdateUser}
                                            
                                        />
                                    </div>
                                    <label htmlFor="Nu">Nữ</label>
                                </div>
                                }
                                <button id="sign-in" type="submit">
                                    Cập nhật thông tin
                                </button>
                            </form>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateInforCustomer
