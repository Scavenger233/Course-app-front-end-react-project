import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginComponent from './LoginComponent';
import LogoutComponent from './LogoutComponent';
import CourseComponent from './CourseComponent';
import MenuComponent from './MenuComponent';
import ListCoursesComponent from './ListCoursesComponent';
import MyProvider from './MyProvider';

//Every React class component should extend a class called component

class InstructorApp extends Component {
    //the render() method of a component returns what needs to be displayed as part of the component
    render() {
        return (
            <>
                <MyProvider>
                    <MenuComponent />
                    <Routes>
                        <Route path="/" element={<LoginComponent />} />
                        <Route path="/login" element={<LoginComponent />} />
                        <Route path="/logout" element={<LogoutComponent />} />
                        <Route path="/courses" element={<ListCoursesComponent />} />
                        <Route path="/courses/:id" element={<CourseComponent />} />
                    </Routes>
                </MyProvider>
            </>
        )
    }
}

//Each JavaScript file is a module. If you wanted elements from a Javascript module to
//be used in other JavaScript modules, we would need to export them.
//Here we are making InstructorApp available for import in other components
export default InstructorApp;