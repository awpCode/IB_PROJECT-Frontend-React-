import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Interviews from './Components/Interviews';
import ShowInterview from './Components/ShowInterview';
import NewInterview from './Components/NewInterview';
import EditInterview from './Components/EditInterview';

import Users from './Components/Users';
import ShowUser from './Components/ShowUser';
import NewUser from './Components/NewUser';
import EditUser from './Components/EditUser';
import AppUser from './AppUser';

function App() {
  return (
    <div className = "container">
    <Router>

      <Route exact path = "/interviews/:id/show" component = {ShowInterview} />
      <Route exact path = "/interviews/new" component = {NewInterview} />
      <Route exact path = "/interviews/:id/edit" component = {EditInterview} />
      <Route exact path = "/" component = {Interviews} />
     

      <Route exact path = "/users" component = {Users} />
      <Route exact path = "/users/:id/show" component = {ShowUser} />
      <Route exact path = "/users/:id/edit" component = {EditUser} />
      <Route exact path = "/users/new" component = {NewUser} />
    </Router>
    </div>
  );
}

export default App;

/*

 <Route exact path='/' render={() =>
  <React.Fragment>
    <Interviews />
    <AppUser />
  </React.Fragment>
} />

*/