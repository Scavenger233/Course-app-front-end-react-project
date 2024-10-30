import React, { Component } from 'react';

import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import ListCoursesComponent from '../.././component/ListCoursesComponent';

import CourseDataService from '../.././service/CourseDataService';
import renderer from 'react-test-renderer'

import { BrowserRouter as Router} from 'react-router-dom';

import axios from 'axios';

const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';
const username = 'bytecaptain';

jest.mock('axios');

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

test("renders correctly", async() => {

    const courses = [{ "id": 10001, "username": "bytecaptain", "description": "Learn JPA" }, { "id": 10002, "username": "bytecaptain", "description": "Learn JPA Course" }];
    axios.get.mockResolvedValue(courses);

    const tree = renderer.create(<ListCoursesComponent />).toJSON();
    expect(tree).toMatchSnapshot();
});

test('Render ListCourseComponent widgets with user logged in ', async() => {

    const courses = [{ "id": 10001, "username": "bytecaptain", "description": "Learn JPA" }, { "id": 10002, "username": "bytecaptain", "description": "Learn JPA Course" }];
    let response = { data: courses };
    axios.get.mockResolvedValue(response);
	//test if user logged in
	sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
    const { container } = render(<ListCoursesComponent />);

    //Verify text
    expect(screen.getByText(/All Courses/i)).toBeInTheDocument()
    expect(screen.getByText(/Id/i)).toBeInTheDocument()
    expect(screen.getByText(/Description/i)).toBeInTheDocument()
    expect(screen.getByText(/Update/i)).toBeInTheDocument()
    expect(screen.getByText(/Delete/i)).toBeInTheDocument()

    const title = container.querySelector('h3');
    expect(title.innerHTML).toEqual('All Courses');

    const listCourseDiv = container.querySelector('div.container');
    const listCourseDivContent = listCourseDiv.innerHTML
    expect(listCourseDivContent).toContain('Id');
    expect(listCourseDivContent).toContain('Description');
    expect(listCourseDivContent).toContain('Update');
    expect(listCourseDivContent).toContain('Delete');

    //Verify widget
    const addCourseButton = container.querySelector('button');
    expect(addCourseButton.outerHTML).toEqual('<button class="btn btn-success">Add</button>');

});

test('add course', async() => {

    const courses = [{ "id": 10001, "username": "in28minutes", "description": "Learn JPA" }, { "id": 10002, "username": "in28minutes", "description": "Learn JPA Course" }];
    let response = { data: courses };
    axios.get.mockResolvedValue(response);

    const tree = renderer.create(<ListCoursesComponent  />);
    render(<ListCoursesComponent />);
    fireEvent.click(screen.getByText("Add"))
    
});

test('update course', async() => {

    const courses = [{ "id": 10001, "username": "in28minutes", "description": "Learn JPA" }, { "id": 10002, "username": "in28minutes", "description": "Learn JPA Course" }];
    let response = { data: courses };
    axios.get.mockResolvedValue(response);
    render(<ListCoursesComponent />);

    await waitFor(() => screen.getAllByTestId('updateButton'));
    
    fireEvent.click(screen.getAllByTestId('updateButton')[0]);

});

test('delete course', async() => {

    const courses = [{ "id": 10001, "username": "in28minutes", "description": "Learn JPA" }, { "id": 10002, "username": "in28minutes", "description": "Learn JPA Course" }];
    let response = { data: courses };
    axios.get.mockResolvedValue(response);
    render(<ListCoursesComponent />);

    let deleteResponse = { messge: "test" };
    axios.delete.mockResolvedValue(deleteResponse);
    await waitFor(() => screen.getAllByTestId('deleteButton'));
    
    fireEvent.click(screen.getAllByTestId('deleteButton')[0]);

    //TODO check if arrived to course list page and one entry left

});

test('Render ListCourseComponent widgets with user not logged in ', async() => {

    const courses = [{ "id": 10001, "username": "bytecaptain", "description": "Learn JPA" }, { "id": 10002, "username": "bytecaptain", "description": "Learn JPA Course" }];
    let response = { data: courses };
    axios.get.mockResolvedValue(response);
	//test if user logged in
	sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    render(<ListCoursesComponent />);

    //Verify text
    const allCourseText = screen.queryByTestId("All Courses")
    expect(allCourseText).toBeNull()

    const updateText = screen.queryByTestId("Update")
    expect(updateText).toBeNull()

    const deleteText = screen.queryByTestId("Delete")
    expect(deleteText).toBeNull()

});