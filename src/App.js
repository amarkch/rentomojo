import React from 'react';
import logo from './logo.svg';
import UsersTable from './UsersTable';
import PostList from './PostList';
import PostDetails from './PostDetails';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/users" component={UsersTable} />
        <Route exact path="/post-list-of-user/:id" component={PostList} />
        <Route exact path="/post-details/:userId/:id" component={PostDetails} />
        <Route exact path="/" component={UsersTable} />
      </Switch>
    </Router>
  );
}

export default App;
