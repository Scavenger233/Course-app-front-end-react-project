import React, { Component } from 'react';
import withRouter from './withRouter';
import CourseDataService from '../service/CourseDataService';
import AuthenticationService from '../service/AuthenticationService';

const INSTRUCTOR = 'bytecaptain';

class ListCoursesComponent extends Component {

    constructor(props) {
        super(props)
        //To display courses, we need to make them available to the component.
        //We add courses to the state of the component and initialize it in the constructor.
        this.state = {
            courses: [],
            message: null
        }

        this.refreshCourses = this.refreshCourses.bind(this)
        // To make sure the method is bound to this in the construtor
        this.deleteCourseClicked = this.deleteCourseClicked.bind(this)
        this.updateCourseClicked = this.updateCourseClicked.bind(this)
        this.addCourseClicked = this.addCourseClicked.bind(this)
        
    }



    componentDidMount() {
        this.refreshCourses();
    }

    addCourseClicked() {
        //TODO refactor/improve this
        this.props.navigation("/courses/-1")
    }

    updateCourseClicked(id) {
        console.log('update ' + id)
        this.props.navigation(`/courses/${id}`)
    }

    refreshCourses() {
        CourseDataService.retrieveAllCourses(INSTRUCTOR)//HARDCODED
            .then(
                //When the response comes back with data, we update the state
                response => {
                    console.log(response);
                    this.setState({ courses: response.data })
                }
            ).catch(error => {
                //TODO better handle errors https://axios-http.com/docs/handling_errors
                return error;
            })
    }

    // When we get a successful response for delete API call,
    // We set a message into state and refresh the courses list
    deleteCourseClicked(id) {
        CourseDataService.deleteCourse(INSTRUCTOR, id)
            .then(
                response => {
                    this.setState({ message: `Delete of course ${id} Successful` })
                    this.refreshCourses()
                }
            ).catch(error => {
                //TODO better handle errors
                return error;
            })

    }

    render() {

        // login check to see if user want to access course list page
        if (!AuthenticationService.isUserLoggedIn()) {
            this.props.navigation('/login')
        } else {
            return (
                <div className="container">
                    <h3>All Courses</h3>
                    {/* We display the notify message just below the header ALL COURSES */}
                    {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                    <div className="container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Description</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>  
                            <tbody>
                                {
                                    //Connect to constructor->state(on the top of this class)
                                    this.state.courses.map(
                                        course =>
                                            <tr key={course.id}>
                                                <td>{course.id}</td>
                                                <td>{course.description}</td>
                                                <td><button data-testid="updateButton" className="btn btn-success" onClick={() => this.updateCourseClicked(course.id)}>Update</button></td>
                                                {/* Add delete button on front end page */}
                                                <td><button data-testid="deleteButton" className="btn btn-warning" onClick={() => this.deleteCourseClicked(course.id)}>Delete</button></td>
                                            </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addCourseClicked}>Add</button>
                    </div>
                </div>
            )
        }

        
    }
}

export default withRouter(ListCoursesComponent);