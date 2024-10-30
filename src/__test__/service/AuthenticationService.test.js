import axios from 'axios';
import AuthenticationService from '../../service/AuthenticationService';
const API_URL = 'http://localhost:8080';

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';
const username = 'bytecaptain';
const password = 'bytecaptain';
const basicToken = "Basic Ynl0ZWNhcHRhaW46Ynl0ZWNhcHRhaW4=";

jest.mock('axios');

test('execute Basic Authentication Service', () => {
	let response = {data : "You are authenticated" };
	axios.get.mockResolvedValue(response);
	AuthenticationService.executeBasicAuthenticationService(username, password);
});

test('execute Create Basic Authentication Token ', () => {
	const token = AuthenticationService.createBasicAuthToken(username, password);
    expect(token).toEqual(basicToken);
});

test('Is User logged In', () => {
	let isUserLoggedin = AuthenticationService.isUserLoggedIn();
	expect(isUserLoggedin).toEqual(false);

	sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
	isUserLoggedin = AuthenticationService.isUserLoggedIn();
	expect(isUserLoggedin).toEqual(true);
	
});

test('setAuthorizationHeader', () => {
	//test if user not logged in
	sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
	let config = {headers : {authorization: ''}};
	let configWithoutToken = AuthenticationService.setAuthorizationHeader(config, basicToken);

	expect(configWithoutToken.headers.authorization).toEqual('');

	//test if user logged in
	sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
	let configWithToken = AuthenticationService.setAuthorizationHeader(config, basicToken);

	expect(configWithToken.headers.authorization).toEqual(basicToken);
});

test('register Successful Login', () => {
	AuthenticationService.registerSuccessfulLogin(username, password);
	expect(axios.interceptors.request.use).toHaveBeenCalledTimes(1);
});

test('logout', () => {
	AuthenticationService.logout(username, basicToken);
	let isUserLoggedin = AuthenticationService.isUserLoggedIn();
	expect(isUserLoggedin).toEqual(false);
});

test('setupAxiosInterceptors', () => {
	AuthenticationService.setupAxiosInterceptors(basicToken);
	expect(axios.interceptors.request.use).toHaveBeenCalledTimes(1);
});
