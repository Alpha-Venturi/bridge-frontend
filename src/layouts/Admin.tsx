import React, { useEffect, FC } from 'react';
import { useLocation, Route, Switch, Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';

import AdminNavbar from '../components/Navbars/AdminNavbar';
import Sidebar from '../components/Sidebar/Sidebar';
import Transactions from '../views/Transactions/Transactions';


import routes from '../routes';

type Props = {
  location: {
    pathname: string;
  };
};

const Admin: FC<Props> = ({ location, children, ...props }) => {
  const mainContent = React.useRef(null);
  const Location = useLocation();



  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement!.scrollTop = 0;
  }, [Location, location.pathname]);


  return (
    <>
      <Sidebar
        {...props}
        routes={routes}
        logo={{
          innerLink: '/holoni/dashboard',
          imgSrc: require('../assets/img/brand/holoni-logo.svg').default,
          imgAlt: '...',
        }}
      />
      <div className="main-content" ref={mainContent}>
        <AdminNavbar {...props} mobile={false} />
        <>
          <Switch>
            <Route exact path={"/holoni/transactions"} component={Transactions} key={'key-' + Math.random()} />
            <Route path="*">
              <Redirect to="/holoni/transactions" />
            </Route>
          </Switch>
        </>
        <Container fluid>{/* <AdminFooter /> */}</Container>
      </div>
    </>
  )
}

export default Admin;
