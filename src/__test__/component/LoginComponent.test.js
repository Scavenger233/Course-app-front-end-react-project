import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import axios from 'axios';
import MyProvider from '../.././component/MyProvider';

import AuthenticationService from '../../service/AuthenticationService';

jest.mock('axios');

import LoginComponent from '../.././component/LoginComponent';

import renderer from 'react-test-renderer'

const basicToken = "Basic Ynl0ZWNhcHRhaW46Ynl0ZWNhcHRhaW4=";

test("renders correctly", () => {
    const tree = renderer.create(<Router><LoginComponent /></Router>).toJSON();
    expect(tree).toMatchSnapshot();
  });

test('Login with right credential', async() => {
    //TODO update
    let response = {data : {token: basicToken}};
    axios.get.mockResolvedValue(response);

    render(<MyProvider><Router><LoginComponent /></Router></MyProvider>);

    const usernameField = screen.getByTestId('username');

    fireEvent.change(usernameField, { target: { value: 'bytecaptain' }});

    const passwordField = screen.getByTestId('password');

    fireEvent.change(passwordField, { target: { value: 'bytecaptain' }});

    const button = screen.getByTestId("login");

    await waitFor(() => {
        fireEvent.click(button);
    });    

  });

  test('Login with worng credential', async() => {
    //TODO update
    let response = null;
    axios.get.mockResolvedValue(response);

    render(<MyProvider><Router><LoginComponent /></Router></MyProvider>);

    const usernameField = screen.getByTestId('username');

    fireEvent.change(usernameField, { target: { value: 'bytecaptain' }});

    const passwordField = screen.getByTestId('password');

    fireEvent.change(passwordField, { target: { value: 'wrongpassword' }});

    const button = screen.getByTestId("login");

    AuthenticationService.executeBasicAuthenticationService = jest.fn().mockRejectedValue(new Error('Login failed'));

    await waitFor(() => {
        fireEvent.click(button);
    });    

  });