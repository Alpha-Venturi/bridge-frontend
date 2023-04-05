import React, { FC } from 'react';

import { Navbar, Nav, Container } from 'reactstrap';


type Props = {
  mobile: boolean;
};

const AdminNavbar: FC<Props> = ({ mobile, children, ...props }) => {


  return (
    <>
      <Navbar className={mobile ? 'd-md-none' : `d-none d-md-flex navbar-top navbar-dark`} expand="md" id="navbar-main">
        <Container fluid>
          <Nav className={'align-items-center ml-auto'} navbar>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
