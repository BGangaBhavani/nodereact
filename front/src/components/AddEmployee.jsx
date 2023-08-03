import React, { Component } from 'react'

import EmployeeService from '../services/EmpService';

import { Link } from 'react-router-dom';

class AddEmployee extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            department:'',
            salary:'',
            gender:'',
            dob:'',
            image:""
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.saveEmployee = this.saveEmployee.bind(this);
    }
    saveEmployee = (event) => {
        event.preventDefault();
        let employee = {name: this.state.name,department :this.state.department,salary:this.state.salary,gender:this.state.gender,dob:this.state.dob,image:this.state.image};
        console.log('employee => ' + JSON.stringify(employee));
        if (this.state.name.length === 0) {
            alert("firstName field is Empty");
          }
          else if (this.state.department.length === 0) {
            alert("Department field is Empty");
          }
          else if (this.state.salary.length === 0) {
            alert("salary field is Empty");
          }
          else if (this.state.gender.length === 0) {
            alert("gender field is Empty");
          }
          else if (this.state.dob.length === 0) {
            alert("dob field is Empty");
          }
          else if(window.confirm("Do you want to save ?")){
            EmployeeService.createEmployee(employee)
            .then(res =>{
                <Link to='/employees'> this.props.history.push('/employees');</Link>
                window.location.replace("/employees");
            });
            }
    }
    changeNameHandler= (event) => {

        this.setState({name: event.target.value});
    }
    
    changeDepartmentHandler= (event) => {
        this.setState({department: event.target.value});
    }
    changeSalaryHandler= (event) => {
        this.setState({salary: event.target.value});
    }
    changeGenderHandler= (event) => {
        this.setState({gender: event.target.value});
    }
    changeDobHandler= (event) => {
        this.setState({dob: event.target.value});
    }
    cancel(){
        this.props.history.push('/employees');
    }
    handleImageChange = (e) => {

        const file = e.target.files[0];

        const reader = new FileReader();

     

        reader.onload = (event) => {

            const base64String = event.target.result.split(",")[1];

           this.setState({image:base64String});

         

        };

     

        reader.onerror = (error) => {

          console.log("Error: ", error);

        };

     

        if (file) {

          reader.readAsDataURL(file);

        }

      };  

       renderUserImage = () => {

        if (this.state.image) {

          return (

            <img

              src={`data:image/jpeg;base64,${this.state.image}`}

              alt="User"

              style={{height:100, width:100}}

              className="user-image"

            />

          );

        }

        return null;

    }
    render(){

        return(<div style={{backgroundColor:"lightblue", height:"100vh"}}>
            <div>
                <Link to='/employees'> <button className="btn btn-warning" size="xl" style={{marginLeft: "10px",size:'xl'}}>Back</button></Link>
                </div>
               <div className = "container" >
                    <div className = "row">
                        <div className = "d-flex w-50 vh-50 justify-content-center align-items-center" style={{ margin: '0rem',backgroundColor:'' }}>
                            <div className = "card-body" >
                                <form>
                                    <div className = "form-group" >
                                    <div clasName="btn-group btn-lg d-flex gap-2" >
                    <Link to="/employees"><button type='button' className='btn btn-light'>Employees List</button></Link>
                    <button type='button' className='btn btn-light active'>Add Employee</button>                   
                    <button type='button' className='btn btn-light '>Edit Employee</button>
                    <Link to="/"><button type='button' className='btn btn-light '>LogOut</button></Link>
                </div>
                                        <label style={{fontFamily:'-moz-initial',fontSize:25}} required>Name: </label>
                                        <input placeholder="Name" name="Name" className="form-control"
                                         value={this.state.name}   required onChange={this.changeNameHandler}/>
                                    </div><div className="form-group" >

<label>Image</label>

<input type="file"  accept="image/*"    onChange={this.handleImageChange}  className="form-control"  required  />

           {this.renderUserImage()}

<small className="form-text ">Upload an image for User</small>

</div>  

                                    <div className = "form-group">
                                        <label style={{fontFamily:'Quire Sans',fontSize:25}} required> Department: </label>
                                        <select  name="department" className="form-control"
                                             value={this.state.department} required onChange={this.changeDepartmentHandler}>
                                                <option>None</option>
                                                <option>Sales</option>
                                                <option>Accounts</option>
                                                <option>Developmenet</option>
                                                <option>Testing</option> 
                                        </select>
                                    </div>



                                    <div className = "form-group">
                                        <label style={{fontFamily:'-moz-initial',fontSize:25}} required> Salary: </label>
                                        <input type= 'number' placeholder="salary" name="salary" className="form-control"
                                            value={this.state.salary} required onChange={this.changeSalaryHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label style={{fontFamily:'Quire Sans',fontSize:25}} required> Gender: </label>
                                        <select  name="gender" className="form-control"
                                            value={this.state.gender} required onChange={this.changeGenderHandler}>
                                                <option>None</option>
                                                <option>Male</option>
                                                <option>Female</option>

                                                
                                        </select>
                                    </div>
                                    <div className = "form-group">
                                        <label style={{fontFamily:'Garamond',fontSize:25}}> DateofBirth: </label>
                                        <input placeholder="dob" name="dob" className="form-control"  type='date'
                                           value={this.state.dob} required onChange={this.changeDobHandler}/>
                                    </div>
                                    <div className = "form-group">
                                    <Link to='/employees'><button className="btn btn-success" onClick={this.saveEmployee} >Update</button></Link>
                                    <Link to='/employees'> <button className="btn btn-danger" value ="submit" type="reset" style={{marginLeft: "10px"}}>Cancel</button></Link>
                                    </div>                            
                                </form>
                            </div>
                     </div>
                    </div>
               </div>
        </div>
    )

    }
    }
export default AddEmployee
