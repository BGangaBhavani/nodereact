import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

const Register = () => {
  const [name, namechange] = useState("");

  const [email, emailchange] = useState("");

  const [password, passwordchange] = useState("");

  const nameChange = (e) => {
    namechange(e.target.value);
  };

  const emailChange = (e) => {
    emailchange(e.target.value);
  };

  const passwordChange = (e) => {
    passwordchange(e.target.value);
  };

  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();

    const empData = { name, email, password };

    await axios.post("http://localhost:8080/reguser", empData);

    alert("Registered Successfully!");

    navigate("/");
  };

  return (
    <div  className="content"style={{backgroundColor:"lightblue",height:"100vh"}} >
      <div className="Auth-form-container"  >
        <div
          className="Auth-form"
          style={{ backgroundColor: "lightgray", color: "black" }}>
          <div className="Auth-form-content">
            <h1> Register</h1> <br/>

            <form  onSubmit={handlesubmit}>
              <div>
                <label className="label" style={{float:"left"}}>Name :</label>
                <input type="text" required onChange={nameChange} style={{marginLeft: "30px"}}></input>
              </div>
              <br/>
              <div >
                <label className="label" style={{float:"left"}}>Email :</label>

                <input type="email" required onChange={emailChange} style={{marginLeft: "35px"}}></input>
              </div>
              <br/>
              <div >
                <label className="label" style={{float:"left"}}> Password : </label>
                <input type="password" required onChange={passwordChange} style={{marginLeft: "7px"}}></input>
              </div>
              <br/>

              <div className="login-div-con">
                <button type="submit" className="btn btn-primary"> Register </button>
              </div>
              <br></br>

              <div className="log-div">
               Already Have an account?<Link to={"/"}>login</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
