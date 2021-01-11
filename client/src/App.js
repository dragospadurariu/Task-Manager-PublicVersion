import React, { Fragment, useEffect } from 'react';
import './App.css';
import Landing from './components/layout/landing/landing.layout';
import Navbar from './components/layout/navbar/navbar.layout';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/auth/register.page';
import Login from './components/auth/login.page';
import { setAuthToken } from './components/utils/authToken.js';
//Redux
import { Provider } from 'react-redux';
import store from './store';
import VerifyEmail from './components/auth/verify-email.page';
import { loadUser } from './actions/auth.action';
import PrivateRoute from './components/routing/PrivateRoute.component';
import Home from './components/home/home.component';
import Dashboard from './components/dashboard/dashboard.page';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser(localStorage.token));
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <div className='container'>
            <Route exact path='/' component={Landing} />
            <Switch>
              <Route
                path='/users/signup/activate/:token'
                component={VerifyEmail}
              />
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <PrivateRoute exact path='/dashboard/:id' component={Dashboard} />
              <PrivateRoute exact path='/home' component={Home} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
