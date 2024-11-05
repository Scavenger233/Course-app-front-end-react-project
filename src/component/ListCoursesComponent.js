import React, { Component } from 'react';
import withRouter from './withRouter';
import CourseDataService from '../service/CourseDataService';
import AuthenticationService from '../service/AuthenticationService';
import DeleteAlert from './DeleteAlert';
import Table from 'react-bootstrap/Table';

const INSTRUCTOR = 'bytecaptain';

class ListCoursesComponent extends Component {

    constructor(props) {
        super(props)
        //To display courses, we need to make them available to the component.
        //We add courses to the state of the component and initialize it in the constructor.
        this.state = {
            courses: [],
            message: null,
            showDeleteAlert: false, // show delete box
            courseIdToDelete: null,  // Course ID to be deleted
            searchQuery: ""  // For search function
        }

        // To make sure the method is bound to this in the construtor
        this.refreshCourses = this.refreshCourses.bind(this)
        this.handleSearchChange = this.handleSearchChange.bind(this); 
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.deleteCourseClicked = this.deleteCourseClicked.bind(this)
        this.confirmDelete = this.confirmDelete.bind(this) // confirm deletion
        this.updateCourseClicked = this.updateCourseClicked.bind(this)
        this.addCourseClicked = this.addCourseClicked.bind(this)
        
    }

    componentDidMount() {
        this.refreshCourses(); 
        // Check if the route state contains a message
        const message = localStorage.getItem("message");
        if (message) {
            this.setState({ message });
            localStorage.removeItem("message"); // Clear message status to prevent duplicate displays
        }
    }
    
    // This allows the component to "remember" what the user has typed and use it for searching.
    handleSearchChange(event) {
        this.setState({ searchQuery: event.target.value });
    }

    handleSearchSubmit(event) {
        event.preventDefault(); // Prevent form submissions from refreshing the page
        this.refreshCourses(); // Refresh course listings when submitting a search
    }

    addCourseClicked() {
        // Add notification
        localStorage.setItem("message", "Course created successfully!");
        this.props.navigation("/courses/-1");
    }
    
    updateCourseClicked(id) {
        // Add nitification
        localStorage.setItem("message", `Course ${id} updated successfully!`);
        this.props.navigation(`/courses/${id}`);
    }
    

    refreshCourses() {
        const { searchQuery } = this.state;

        if (searchQuery) {

            CourseDataService.searchCourses(INSTRUCTOR, searchQuery)
                .then(response => {
                    this.setState({ courses: response.data });
                })
                .catch(error => {
                    console.error("Error fetching search results:", error);
                });
        } else {
            // Return all courses when there is no key words
            CourseDataService.retrieveAllCourses(INSTRUCTOR)
                .then(response => {
                    this.setState({ courses: response.data });
                })
                .catch(error => {
                    console.error("Error fetching courses:", error);
                });
        }
    }

    // Open delete confirmation box
    deleteCourseClicked(id) {
        this.setState({ showDeleteAlert: true, courseIdToDelete: id });
    }

    
    confirmDelete(id) {
        const { courseIdToDelete } = this.state;
        CourseDataService.deleteCourse(INSTRUCTOR, courseIdToDelete)
            .then(response => {
                    // When we get a successful response for delete API call,
                    // We set a message into state and refresh the courses list
                    this.setState({ 
                        message: `Delete of course ${courseIdToDelete} Successful`,
                        showDeleteAlert: false,
                        courseIdToDelete: null 
                    });
                    this.refreshCourses();
                })
                .catch(error => {
                //TODO better handle errors
                return error;
            });

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
                    
                    {/* Search bar */}
                    <nav className="navbar navbar-light bg-light justify-content-end">
                        <form className="form-inline" onSubmit={this.handleSearchSubmit}>
                            <input 
                                className="form-control mr-sm-2" 
                                type="search" 
                                placeholder="Search" 
                                aria-label="Search" 
                                value={this.state.searchQuery}
                                onChange={this.handleSearchChange}
                            />
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </nav>

                    <div className="container">
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Description</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>  
                            <tbody>
                                {
                                    this.state.courses.map(course =>
                                        <tr key={course.id}>
                                            <td>{course.id}</td>
                                            <td>{course.description}</td>
                                            <td>
                                                <button 
                                                    data-testid="updateButton" 
                                                    className="btn btn-success" 
                                                    onClick={() => this.updateCourseClicked(course.id)}
                                                >
                                                    Update
                                                </button>
                                            </td>
                                            <td>
                                                <button 
                                                    data-testid="deleteButton" 
                                                    className="btn btn-warning" 
                                                    onClick={() => this.deleteCourseClicked(course.id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </Table>
                    </div>
                    <div className="row">
                        <div className="col-auto">
                        <button className="btn btn-success" onClick={this.addCourseClicked}>Add</button>
                        </div>
                    </div>
                    
                    

                    {/* Delete box */}
                    <DeleteAlert
                        show={this.state.showDeleteAlert}
                        onClose={() => this.setState({ showDeleteAlert: false })}
                        onDelete={this.confirmDelete}
                    />
                </div>
            )
        }

        
    }
}

export default withRouter(ListCoursesComponent);