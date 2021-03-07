import React, { Component } from 'react';
import {Nav,Navbar,NavItem,NavbarBrand,NavLink} from 'reactstrap';

class NavApp extends Component {
    state = {  }
    render() { 
        return ( 
            <Navbar color="dark" dark expand="md">
            <div class="container">
              <NavbarBrand href="/">Budget Tracker</NavbarBrand>
                <Nav className="mr-auto" navbar>
                  <NavItem>
                    <NavLink href="/">Home</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/categories">Categories</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/expenses">Expenses</NavLink>
                  </NavItem>
                </Nav>
              </div>
            </Navbar>
        );
    }
}
 
export default NavApp;