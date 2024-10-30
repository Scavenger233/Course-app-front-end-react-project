import axios from 'axios';
import CourseDataService from '../../service/CourseDataService';

jest.mock('axios');

test('Get all courses', () => {
	const courses = [{ "id": 10001, "username": "bytecaptain", "description": "Learn JPA" }, { "id": 10002, "username": "bytecaptain", "description": "Learn JPA Course" }];
	axios.get.mockResolvedValue(courses);

	CourseDataService.retrieveAllCourses("bytecaptain").then(responseData => expect(responseData).toEqual(courses));
});

test('Get course by id', () => {
	const course = { "id": 10001, "username": "bytecaptain", "description": "Learn JPA" };
	axios.get.mockResolvedValue(course);

	CourseDataService.retrieveCourse("bytecaptain", 10001).then(responseData => expect(responseData).toEqual(course));
});

test('create course', () => {
	const course = { "id": 10001, "username": "bytecaptain", "description": "Learn JPA" };
	axios.post.mockResolvedValue(course);

	CourseDataService.createCourse("bytecaptain", course).then(responseData => expect(responseData).toEqual(course));
});

test('update course', () => {
	const course = { "id": 10001, "username": "bytecaptain", "description": "Learn JPA" };
	axios.put.mockResolvedValue(course);

	CourseDataService.updateCourse("bytecaptain", course).then(responseData => expect(responseData).toEqual(course));
});

test('delete course', () => {

	CourseDataService.deleteCourse("bytecaptain", 10001);

	expect(axios.delete).toHaveBeenCalledTimes(1);

	const response = '';
	axios.delete.mockResolvedValue(response);
	CourseDataService.deleteCourse("bytecaptain", 10001).then(responseData => expect(responseData).toEqual(""));
});


