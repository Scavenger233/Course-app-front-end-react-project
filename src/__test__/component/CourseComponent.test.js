import React from 'react';

import axios from 'axios';

import CourseComponent from '../.././component/CourseComponent';
import renderer from 'react-test-renderer';

import { BrowserRouter as Router} from 'react-router-dom';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

jest.mock('axios');

test("renders correctly", async () => {

    const courses = [{ "id": 10001, "username": "in28minutes", "description": "Learn JPA" }, { "id": 10002, "username": "in28minutes", "description": "Learn JPA Course" }];
    axios.get.mockResolvedValue(courses);

    const addParams = {params: {id: -1}};
    const addCourseComponent = renderer.create(<Router><CourseComponent match={addParams}/></Router>).toJSON();
    expect(addCourseComponent).toMatchSnapshot();

});

test('add course', async () => {

    const params = {params: {id: -1}};
    render(<Router><CourseComponent match={params} /></Router>);
    
    const descriptionField = screen.getByTestId('courseDescription');
    await waitFor(() => descriptionField);
    fireEvent.blur(descriptionField);

    const courseContainer = screen.getByTestId('courseContainer');
    await waitFor(() => {
        expect(courseContainer).toHaveTextContent("Enter a Description");  
    });

    fireEvent.change(descriptionField, { target: { value: '112' }});

    await waitFor(() => {
        expect(courseContainer).toHaveTextContent("Enter at least 5 Characters in Description");  
    }); 

    fireEvent.change(descriptionField, { target: { value: 'Description' }});
    
    await waitFor(() => {
        const descriptionError = screen.queryByText("Enter at least 5 Characters in Description");
        expect(descriptionError).toBeNull();
    }); 
    
    let course = { "id": 10001, "username": "bytecaptain", "description": "Learn JPA" };
    axios.post.mockResolvedValue(course);

    const button = screen.getByText("Save");

    await waitFor(() => {
        fireEvent.click(button);
    });  
    
});

test('update course', async () => {

    //TODO refactor to be reused
    const updatedcourse = {data: { "id": 10001, "username": "bytecaptain", "description": "Learn JPA" }};
    axios.get.mockResolvedValue(updatedcourse);

    const params = {params: {id: 10001}};
    render(<Router><CourseComponent match={params} /></Router>);
    
    const descriptionField = screen.getByTestId('courseDescription');
    await waitFor(() => descriptionField);

    fireEvent.change(descriptionField, { target: { value: 'Learn JPA Description updated' }});
    
    let course = { "id": 10001, "username": "bytecaptain", "description": "Learn JPA Description updated" };
    axios.put.mockResolvedValue(course);

    const button = screen.getByText("Save");

    await waitFor(() => {
        fireEvent.click(button);
    });    
    
});
