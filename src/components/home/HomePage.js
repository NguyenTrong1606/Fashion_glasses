import React from "react"
import "../.././App.css"
import Header from "./Header"
import Body from "./Body"
import Footer from "./Footer"

const HomePage = () => {
    return (
        <div className="App">
            <Header/>
            <Body/>
            <Footer/>
        </div>
    )
}

export default HomePage;