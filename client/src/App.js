import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from "./pages/Profile"
import Header from './components/Header';
import './App.css';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/user/:id">
              <Profile />
            </Route>
          </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
