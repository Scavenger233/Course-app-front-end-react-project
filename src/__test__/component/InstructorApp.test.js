import React, { Component } from 'react';
import {MemoryRouter} from 'react-router-dom'

import {render, screen} from '@testing-library/react'
import InstructorApp from '../.././component/InstructorApp';

test('valid path to render login page', () => {
  render(
    <MemoryRouter initialEntries={[ '/login', '/']}>
      <InstructorApp/>
    </MemoryRouter>
  );

  expect(screen.getByText(/User Name/i)).toBeInTheDocument()
  expect(screen.getByText(/Password/i)).toBeInTheDocument()
});

  test('valid path to render course page', () => {
    render(
      <MemoryRouter initialEntries={['/courses/1']}>
          <InstructorApp/>
      </MemoryRouter>
    );

    expect(screen.getByText(/Id/i)).toBeInTheDocument()
    expect(screen.getByText(/Description/i)).toBeInTheDocument()
  });

  test('valid path to render logout page', () => {
    render(
       <MemoryRouter initialEntries={[ '/logout' ]} >
         <InstructorApp/>
       </MemoryRouter>
     );
     
     expect(screen.getByText(/You are logged out/i)).toBeInTheDocument()
     expect(screen.getByText(/Thank You for Using Our Application./i)).toBeInTheDocument()
   });
