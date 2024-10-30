import axios from 'axios'

const INSTRUCTOR = 'bytecaptain'
const COURSE_API_URL = 'http://localhost:8080'
//const PASSWORD = 'bytecaptain'
const INSTRUCTOR_API_URL = COURSE_API_URL+'/instructors/'+INSTRUCTOR

class CourseDataService {

    retrieveAllCourses(name) {
        return axios.get(INSTRUCTOR_API_URL+'/courses');//, 
        //{ headers: { authorization: 'Basic ' + window.btoa(INSTRUCTOR + ":" + PASSWORD) } });
    }

    retrieveCourse(name, id) {
        return axios.get(INSTRUCTOR_API_URL+'/courses/'+id);
    }

    //Excutes the delete request to specific course api url
    deleteCourse(name, id) {
        //console.log('executed service')
        return axios.delete(INSTRUCTOR_API_URL+'/courses/'+id);
    }

    updateCourse(name, id, course) {
        return axios.put(INSTRUCTOR_API_URL+'/courses/'+id, course);
    }
  
    createCourse(name, course) {
        return axios.post(INSTRUCTOR_API_URL+'/courses', course);
    }
}
//we are creating an instance of CourseDataService and making it available for other components
export default new CourseDataService()