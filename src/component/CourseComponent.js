import React, { Component } from 'react';
import withRouter from './withRouter';
//To use formik to edit form of course details, this is the most populare framework with React.
import { Formik, Form, Field, ErrorMessage } from 'formik';
import CourseDataService from '../service/CourseDataService';
const INSTRUCTOR = 'bytecaptain'

class CourseComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            description: ''
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    componentDidMount() {
        console.log(this.state.id)
        // eslint-disable-next-line
        debugger
        if (this.state.id === -1) {
            return
        }
        CourseDataService.retrieveCourse(INSTRUCTOR, this.state.id)
            .then(response => this.setState({
                description: response.data.description
            })).catch(error => {
                //TODO better handle errors
                return error;
            })

    }

    //Checking for empty description
    //Checking for a minimum length of 5
    validate(values) {
        let errors = {}
        if (!values.description) {
            errors.description = 'Enter a Description'
        } else if (values.description.length < 5) {
            errors.description = 'Enter at least 5 Characters in Description'
        }

        return errors
    }

    onSubmit(values) {
        let username = INSTRUCTOR

        let course = {
            id: this.state.id,
            description: values.description,
            targetDate: values.targetDate
        }

        if (this.state.id === -1) {
            CourseDataService.createCourse(username, course)
                .then(() => this.props.navigation('/courses'))
                .catch(error => {
                    //TODO better handle errors https://axios-http.com/docs/handling_errors
                    return error;
                })
        } else {
            CourseDataService.updateCourse(username, this.state.id, course)
                .then(() => this.props.navigation('/courses'))
                .catch(error => {
                    //TODO better handle errors https://axios-http.com/docs/handling_errors
                    return error;
                })
        }

        console.log(values);
    }

    render() {
        //Creating local variable using destructing
        let { description, id } = this.state
        return (
            <div>
                <h3>Course</h3>
                <div data-testid="courseContainer" className="container">
                    {/* Initialing Formik with the values loaded from state */}
                    <Formik
                        initialValues={{ id, description }}
                        onSubmit={this.onSubmit}
                        validateOnChange={true}
                        validateOnBlur={true}
                        validate={this.validate}
                        enableReinitialize={true}>
                        {
                            (props) => (
                                <Form>
                                    {/* Error message alert during description */}
                                    <ErrorMessage name="description" component="div"
                                        className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <label>Id</label>
                                        {/* Creating a disabled text element for id. The name of element should match the name in state. */}
                                        <Field data-testid="courseId" className="form-control" type="text" name="id" disabled />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field data-testid="courseDescription" className="form-control" type="text" name="description" />
                                    </fieldset>
                                    {/* Adding a submit buttom. */}
                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>

                </div>
            </div>
        )
    }
}

export default withRouter(CourseComponent);