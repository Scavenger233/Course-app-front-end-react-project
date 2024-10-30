import axios from 'axios'
const COURSE_API_URL = 'http://localhost:8080'

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

class AuthenticationService {

    executeBasicAuthenticationService(username, password) {
        return axios.get(`${COURSE_API_URL}/basicauth`,
            { headers: { authorization: this.createBasicAuthToken(username, password)} })
    }

    createBasicAuthToken(username, password) {
        return 'Basic ' + window.btoa(username + ":" + password)
    }

    registerSuccessfulLogin(username, password) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        this.setupAxiosInterceptors(this.createBasicAuthToken(username, password))
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return false
        return true
    }

    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        this.setupAxiosInterceptors("");
    }

    setupAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) => this.setAuthorizationHeader(config, token)
        )
    }

    setAuthorizationHeader(config, token) {
        if (this.isUserLoggedIn()) {
            config.headers.authorization = token
        }
        return config
    }

    /*setupAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = token
                }
                return config
            }
        )
    }*/
}

export default new AuthenticationService()