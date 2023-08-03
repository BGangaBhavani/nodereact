import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Home = () => {
  const navigate = useNavigate();
  const [email, emailchange] = useState("");
  const [password, passwordchange] = useState("");
  const emailChange = (e) => {
    emailchange(e.target.value);
  };
  const passwordChange = (e) => {
    passwordchange(e.target.value);
  };
  const handlesubmit = async (e) => {
    e.preventDefault();

    axios
      .post(`http://localhost:8080/emp_login`, { email, password })

      .then((res) => {
        if (res.data === "Success") {
          alert("Login Successfully");

          navigate("/employees");
        } else {
          alert("wrong credentials");
        }
      })

      .catch((err) => console.log(err));
  };
  const registerPage = () => {
    navigate("/register");
  };
  return (
    <div
      className="content"
      style={{ backgroundColor: "lightblue", height: "100vh" }}
    >
      <div className="Auth-form-container">
        <div
          className="Auth-form"
          style={{ backgroundColor: " lightgray", color: "black" }}
        >
          <div className="Auth-form-content">
            <h1> Login</h1>
            <br />
            <form className="containe" onSubmit={handlesubmit}>
              <div>
                <label className="label" style={{ textAlign: "right" }}>
                  Email :{" "}
                </label>
                <input
                  type="email"
                  required
                  onChange={emailChange}
                  style={{ marginLeft: "37px" }}
                ></input>
              </div>
              <br />
              <div>
                <label
                  className="label"
                  required
                  style={{ textAlign: "right" }}
                >
                  {" "}
                  Password :{" "}
                </label>
                <input
                  type="password"
                  required
                  onChange={passwordChange}
                  style={{ marginLeft: "10px" }}
                ></input>
              </div>
              <br></br>
              <div>
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
            </form>

            <br></br>
            <label className="label">Don't Have an Account ? </label>
            <button className="btn btn-outline-primary" onClick={registerPage}>
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
