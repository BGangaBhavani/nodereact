import React, {Component } from 'react'
// import { Link } from 'react-router-dom'

class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    {/* <Link to={"/employees"}><button>Home</button></Link> */}
                    {/* <Link to={"/add-employee"}><button>Add</button></Link> */}
                    {/* <Link to={"/add-employee"}><button>Edit</button></Link> */}
                    </nav>
                </header>
            </div>
        )
    }
}

export default HeaderComponent