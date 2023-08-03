import React, { Component } from 'react'
import EmployeeService from '../services/EmpService'
import { useParams } from 'react-router-dom';


export function withRouter(Children){
    return(props)=>{
        const match={params:useParams()};
        return  <Children{...props} match={match}/>
    }
}
class ViewEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            employee: {}
        }
    }

    componentDidMount(){
        EmployeeService.getEmployeeById(this.state.id).then( res => {
            this.setState({employee: res.data});
        })
    }

    render() {
        return (
            <div  style={{ backgroundImage:`url('https://wallpaper-mania.com/wp-content/uploads/2018/09/High_resolution_wallpaper_background_ID_77700383971.jpg')` , height:'700px'}}>
                <br></br>
                <div className = "  justify-content-center align-items-center" style={{ margin: '8rem'}}>
                <div className = "card col-md-6 onset-md-5" >
                    <h3 className = "text-center" style={{fontFamily:'cursive',color:'blue',fontSize:30}}> View Employee Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label style={{fontFamily:'cursive',color:'blue'}}> Employee First Name: </label>
                            <div> { this.state.employee.name }</div>
                        </div>
                        {/* <div className = "row">
                            <label style={{fontFamily:'cursive',color:'blue'}}> Employee Last Name: </label>
                            <div> { this.state.employee.lastName }</div>
                        </div> */}
                        {/* <div className = "row">
                            <label style={{fontFamily:'cursive',color:'blue'}}> Employee Email ID: </label>
                            <div> { this.state.employee.emailId }</div>
                        </div> */}
                        <div className = "row">
                            <label style={{fontFamily:'cursive',color:'blue'}}> Employee Department: </label>
                            <div> { this.state.employee.department }</div>
                        </div>
                        <div className = "row">
                            <label style={{fontFamily:'cursive',color:'blue'}}> Employee Salary: </label>
                            <div> { this.state.employee.salary }</div>
                        </div>
                        <div className = "row">
                            <label style={{fontFamily:'cursive',color:'blue'}}> Employee Gender: </label>
                            <div> { this.state.employee.gender }</div>
                        </div>
                        <div className = "row">
                            <label style={{fontFamily:'cursive',color:'blue'}}> Employee DateOfBirth: </label>
                            <div> { this.state.employee.dob }</div>
                        </div>
                    </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default withRouter(ViewEmployeeComponent);
