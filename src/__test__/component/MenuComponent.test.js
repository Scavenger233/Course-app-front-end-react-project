import React, { Component } from 'react';

import MenuComponent from '../.././component/MenuComponent';
import renderer from 'react-test-renderer'
import MyProvider from '../.././component/MyProvider';

import { BrowserRouter as Router} from 'react-router-dom';

test("renders correctly", async() => {
    const tree = renderer.create(<MyProvider><Router><MenuComponent /></Router></MyProvider>).toJSON();
    expect(tree).toMatchSnapshot();
});
