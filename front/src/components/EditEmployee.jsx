import React, { Component } from 'react'
import EmployeeService from '../services/EmpService';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export function withRouter(Children){
    return(props)=>{
        const match={params:useParams()};
        return  <Children{...props} match={match}/>
    }
}

class EditEmployee extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id:this.props.match.params.id,
            name: '',
            department:'',
            salary:'',
            gender:'',
            dob:'',
            image:""
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);

        this.updateEmployee = this.updateEmployee.bind(this);
    }


componentDidMount(){

        EmployeeService.getEmployeeById(this.state.id).then((res)=>{

            let employee =res.data[0];

            this.setState({...this.state,name:employee.name,

           
            department:employee.department,
            salary:employee.salary,

            gender:employee.gender,

            dob:employee.dob,

            image:employee.image

    });

});
    }
    updateEmployee = (e) => {
        e.preventDefault();
        let employee = {name: this.state.name,department :this.state.department,salary:this.state.salary,gender:this.state.gender,dob:this.state.dob,image:this.state.image};
        console.log('employee => ' + JSON.stringify(employee));
        const conf= window.confirm("Do you want to update ?");
        if(conf){ EmployeeService.updateEmployee(employee,this.state.id)
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

            />

          );

        }

        return null;

      };
    
    render(){
        return( <div style={{backgroundColor:"lightblue", height:"100vh"}}>
            <br></br>
               <div className = "container">
                    <div className = "row">
                        <div className = " w-50 vh-50 justify-content-center align-items-center" style={{ margin: '5rem',backgroundColor:'' }}>
                            
                            <div className = "card-body">
                                <form>
                                    <div className = "form-group">
                                    <div clasName="btn-group btn-group " >
                    <Link to="/employees"><button type='button' className='btn btn-light'>Employees List</button></Link>
                    <Link to="/add-employee"><button type='button' className='btn btn-light'>Add Employee</button></Link>             
                    <button type='button' className='btn btn-light active'>Edit Employee</button>
                    <Link to="/"><button type='button' className='btn btn-light '>LogOut</button></Link>
                </div>
                                        <label style={{fontFamily:'-moz-initial'}}>Name: </label>
                                        <input placeholder="Name" name="Name" className="form-control" 
                                            value={this.state.name} onChange={this.changeNameHandler}/>
                                    </div>
                                    <div className="form-group" >

                                          <label>Image</label>

                                          <input type="file"  accept="image/*"    onChange={this.handleImageChange}  className="form-control"  required  />

                                                     {this.renderUserImage()}

                                       <small className="form-text ">Upload an Image for User</small>

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
                                        <label style={{fontFamily:'-moz-initial'}}> Salary: </label>
                                        <input placeholder="salary" name="salary" className="form-control" 
                                            value={this.state.salary} onChange={this.changeSalaryHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label style={{fontFamily:'-moz-initial'}}> Gender: </label>
                                        <select placeholder="Enter M or F" name="gender" className="form-control" 
                                            value={this.state.gender} onChange={this.changeGenderHandler}>
                                                <option>None</option>
                                                <option>Male</option>
                                                <option>Female</option>
                                        </select>
                                    </div>
                                    <div className = "form-group">
                                        <label style={{fontFamily:'-moz-initial'}}> DateofBirth: </label>
                                        <input placeholder="dob" name="dob" className="form-control"  type='date'
                                            value={this.state.dob} onChange={this.changeDobHandler}/>
                                    </div>
                                    <div className = "form-group">
                                    
                                    <Link to='/employees'><button className="btn btn-success"  onClick={this.updateEmployee}>Update</button></Link>
                                    <Link to='/employees'> <button className="btn btn-info"  style={{marginLeft: "10px"}}>Cancel</button></Link>
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


export default withRouter(EditEmployee)
