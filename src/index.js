import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import '@fortawesome/fontawesome-pro/js/all.min.js';
import './assets/scss/argon-dashboard-pro-react.scss';
import './app.scss';

import AdminLayout from './layouts/Admin';




const Web3Wrapper = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/holoni" render={(props) => <AdminLayout {...props} />} />
        <Route path="*">
          <Redirect to="/holoni/transactions" />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

ReactDOM.render(<Web3Wrapper />,

  document.getElementById('root')
);
