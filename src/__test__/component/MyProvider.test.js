import React, { Component } from 'react';

import MyProvider from '../.././component/MyProvider';
import renderer from 'react-test-renderer'

import { BrowserRouter as Router} from 'react-router-dom';

test("renders correctly", async() => {

    const tree = renderer.create(<MyProvider />).toJSON();
    expect(tree).toMatchSnapshot();
});