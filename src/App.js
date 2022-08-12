import React from "react"
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import routers from "./routers"
import { ToastContainer } from "react-toastify"
import HomePage from "./components/home/HomePage";
import "react-toastify/dist/ReactToastify.css"

function App() {
  const listRouters = (routers) => {
    let result = null
    result = routers.map((router, index) => {
            
        return (
            <Route
                key={index}
                path={router.path}
                exact={router.exact}
                render={router.render}
                element={router.main()}
            />       
        )
    })
    return <Routes>{result}</Routes>
  }

  return (
    <div className="App">
      <Router>
        
          <ToastContainer />
          {listRouters(routers)}   
      </Router>
    </div>
  )
}

export default App;
