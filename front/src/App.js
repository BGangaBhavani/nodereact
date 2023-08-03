import "./App.css";
import HeaderComponent from "./components/HeaderComponent";
import EmployeeList from "./components/EmployeeList";
import { BrowserRouter as Router, Route } from "react-router-dom";
import React from "react";
import AddEmployee from "./components/AddEmployee";
import EditEmployee from "./components/EditEmployee";
// import ViewEmployeeComponent from "./components/ViewEmployeeComponent";
import Home from "./components/loginpage";
import Register from "./components/Registerpage";
import { Routes } from "react-router-dom";
function App() {
  return ( 
    <div>
      <Router>
        <HeaderComponent />
        <div className="contain">
          <Routes>
            <Route path="/" element={< Home/>} />
            <Route path="/register" element={< Register/>} />
            <Route path="/employees" element={<EmployeeList />}></Route>
            <Route path="/add-employee" element={<AddEmployee />} />
            <Route path ="/update-employee/:id" element={<EditEmployee/>}></Route>
            {/* <Route path ="/view-employee/:id"  element= {<ViewEmployeeComponent/>}></Route> */}
            
          </Routes>
        </div>
        
      </Router>
    </div>
  );
}

export default App;
