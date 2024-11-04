import React, { Component } from 'react';
import './App.css';
import InstructorApp from './component/InstructorApp';
import { BrowserRouter as Router} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
  render() {
    return (
      <div className="container">
        <Router>
          <InstructorApp />
        </Router>
      </div>
    );
  }
}

export default App;