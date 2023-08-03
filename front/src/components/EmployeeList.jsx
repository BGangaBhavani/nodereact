import React, { Component } from 'react'
import EmployeeService from '../services/EmpService';
import { Link } from 'react-router-dom';

class EmployeeList extends Component {
    constructor(props) {
        super(props)

        this.state = {
                employees: []
        }
         this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }
    

    deleteEmployee(id){
        const conf= window.confirm("Do you want to delete ?");

        if(conf){
            EmployeeService.deleteEmployee(id)
            .then( res => {
                this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});
                window.location.reload();

            });
    
       
     }
    
}
renderUserImage = (employee) => {

    if (employee.image && typeof employee.image === 'string') {

      const blobData = atob(employee.image);

      const arrayBuffer = new ArrayBuffer(blobData.length);

      const uintArray = new Uint8Array(arrayBuffer);

      for (let i = 0; i < blobData.length; i++) {

        uintArray[i] = blobData.charCodeAt(i);

      }

      const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });

 

      const base64String = URL.createObjectURL(blob);

      return (

        <img

          src={base64String}

          alt="User"

          style={{height:50, width:50}}

        />

      );

    } else if (employee.image && Array.isArray(employee.image)) {

      const base64String = btoa(String.fromCharCode.apply(null, employee.image));

      return (

        <img

          src={`data:image/jpeg;base64,${base64String}`}

          alt="User"

          style={{height:100, width:100}}

        />

      );

    }

    return null;

  };
    viewEmployee(id){
        <Link to={`/view-employee/${id}`}>this.props.history.push(`/view-employee/${id}`);</Link>
    }
    editEmployee(id){
        <Link to={`/update-employee/${id}`}>this.props.history.push(`/update-employee/${id}`);</Link>
    }

    componentDidMount(){
        EmployeeService.getEmployees().then((res) => {
            this.setState({ employees: res.data});
        });
    }

    addEmployee(){

        this.props.history.push('/add-employee');
    }

    render() {
        return (
            
            <div  className="content"style={{backgroundColor:"lightblue",height:"100vh"}} >
                <div className='container'  ><br/><br/>
                <div clasName="btn-group btn-lg d-flex gap-2" >
                    <button type='button' className='btn btn-light  active  '>Employees List</button>
                    <Link to='/add-employee'><button className='btn btn-light '>Add Employee</button></Link>                    
                    <button type='button' className='btn btn-light '>Edit Employee</button>
                    <Link to ="/"><button type='button' className='btn btn-light '>LogOut</button></Link>
                </div>
                    <br></br>
                    <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                <th style={{textAlign:"center",fontFamily:"FrankRuehl"}}> Image</th>
                                    <th style={{textAlign:"center",fontFamily:"FrankRuehl"}}> Name</th>
                                    <th style={{textAlign:"center",fontFamily:"FrankRuehl"}}> Department</th>
                                    <th style={{textAlign:"center",fontFamily:"FrankRuehl"}}> Salary</th>
                                    <th style={{textAlign:"center",fontFamily:"FrankRuehl"}}> Gender</th>
                                    <th style={{textAlign:"center",fontFamily:"FrankRuehl"}}> DateOfBirth</th>
                                    <th style={{width:"200px",textAlign:"center",fontFamily:"FrankRuehl"}}> Actions</th>
                                   
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.employees.map(
                                        employee => 
                                        <tr key = {employee.id}>
                                            <td>{this.renderUserImage(employee)}</td>
                                             <td> { employee.name} </td>
                         
                                             <td> {employee.department}</td>
                                             <td> {employee.salary}</td>
                                             <td> {employee.gender}</td>
                                             <td> {employee.dob}</td>
                                             <td>
                                          <Link to={`/update-employee/${employee.id}`}><button style={{marginLeft:"20px"}} onClick={ () => this.editEmployee(employee.id)} className="btn btn-success" >Edit</button></Link>
                                           <Link to={'/employees'}><button style={{marginLeft:"20px"}} onClick={ () => this.deleteEmployee(employee.id)} className="btn btn-danger">Delete </button></Link>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default EmployeeList
