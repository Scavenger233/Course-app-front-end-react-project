import React, { Component } from 'react';
import AuthenticationService from '../service/AuthenticationService';

// It allows us to share data between components without passing props at each level.
export const MContext = React.createContext();  //exporting context object
// Holds some state and provides a way for child components to access and update this state.
class MyProvider extends Component {

state = {isUserLoggedIn: false}
render() {
        this.state.isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        return (
            <MContext.Provider value={
            {   state: this.state,
                setIsUserLoggedIn: (value) => this.setState({
                    isUserLoggedIn: value })}}>
            {this.props.children}   
            </MContext.Provider>)
    }
}

export default MyProvider