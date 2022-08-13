import {React,useEffect} from "react"
import "../.././App.css"
import { useDispatch, useSelector } from "react-redux"
import { loadUser, userSelector } from "../../reducers/Account/LoginForm"
import Header from "./Header"
import Body from "./Body"
import Footer from "./Footer"

const HomePage = () => {
    const dispatch = useDispatch()
    let user = useSelector(userSelector)

    useEffect(() => {
        dispatch(loadUser())
    }, [dispatch])
    return (
        <div className="App">
            <Header full_name ={user.full_name}
              email = {user.email}
              phone_number = {user.phone_number}                         
              identification = {user.identification}                        
              date_of_birth  =  {user.date_of_birth}                    
              address = {user.address}
              avatar   ={user.avatar}
              gender ={user.gender}
              role ={user.role}/>
            <Body/>
            <Footer/>
        </div>
    )
}

export default HomePage;