import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AuthenticationService from '../service/AuthenticationService';
import { MContext } from './MyProvider';

class MenuComponent extends Component {

    render() {
        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="" className="navbar-brand">Main Menu</a></div>
                    <ul className="navbar-nav">
                        <li><Link className="nav-link" to="/courses">Courses</Link></li>
                    </ul>
                    <MContext.Consumer>
                        {(context) => (
                            <ul className="navbar-nav navbar-collapse justify-content-end">
                                {!context.state.isUserLoggedIn && <li><Link className="nav-link" to="/login">Login</Link></li>}
                                {context.state.isUserLoggedIn && <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
                            </ul>
                        )}
                    </MContext.Consumer>
                </nav>
            </header>
        )
    }
}

export default MenuComponent