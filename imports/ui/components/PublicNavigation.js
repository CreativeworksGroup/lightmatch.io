import React from 'react';

const PublicNavigation = () => (
  <Nav pullRight>
    <LinkContainer to="signup">
      <NavItem eventKey={1} href="/signup">
        Sign Up
      </NavItem>
    </LinkContainer>
    <LinkContainer to="login">
      <NavItem eventKey={2} href="/login">
        Log In
      </NavItem>
    </LinkContainer>
  </Nav>
);

export default PublicNavigation;
