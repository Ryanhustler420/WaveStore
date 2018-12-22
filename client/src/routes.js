import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home/index';
import Layout from './HOC/layout';
import RegisterLogin from './components/Register_login/index';
import Register from './components/Register_login/register';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/register" exact component={Register}/>
        <Route path="/register_login" exact component={RegisterLogin}/>
        <Route path="/" exact component={Home}/>
      </Switch>
    </Layout>
  )
}

export default Routes;
