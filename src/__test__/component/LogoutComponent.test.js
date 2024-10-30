import React, { Component } from 'react';

import LogoutComponent from '../.././component/LogoutComponent';
import renderer from 'react-test-renderer'

test("renders correctly", async() => {

    const tree = renderer.create(<LogoutComponent />).toJSON();
    expect(tree).toMatchSnapshot();
});
