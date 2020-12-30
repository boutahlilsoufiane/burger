import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Orders from './containers/Orders/Orders';
import Checkout from './containers/Checkout/Checkout';
import Auth from './containers/Auth/Auth';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/orders" render={props => <Orders {...props} />} />
            <Route path="/auth" render={props => <Auth {...props} />} />
            <Route path="/checkout" render={(props) => <Checkout {...props} />} />
            <Route path="/" render={(props) => <BurgerBuilder {...props} />} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
