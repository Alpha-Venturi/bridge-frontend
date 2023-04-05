/*eslint-disable*/
import React from "react";

// reactstrap components
import { NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";

const Footer = () => {
  return (
    <>
      <footer className="py-5">
        <Container>
          <Row className="align-items-center">
            <Col>
              <Nav className="nav-footer">
                <NavItem>
                  <NavLink
                    href="#"
                    target="_blank"
                    className="text-light"
                  >
                    Contact Support
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    href="#"
                    target="_blank"
                    className="text-light"
                  >
                    About GDPR & Privacy
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
