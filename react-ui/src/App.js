import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from "./pages/Profile"
import Header from './components/Header';
import Signup from './pages/Signup';
import './App.css';
import Auth from '../src/utils/auth'
import Discover from './pages/Discover';
import Dashboard from './pages/Dashboard';

const httpLink = createHttpLink({
  uri: '/graphql',
});


const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              {!Auth.loggedIn() ? <Redirect to="/login" /> : <Home />}
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/discover">
              <Discover />
            </Route>
            <Route exact path="/dashboard">
              <Dashboard />
            </Route>
            <Route exact path="/:username">
             <Profile />
            </Route>
          </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
