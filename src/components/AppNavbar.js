import { Fragment, useState, useContext } from "react";
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link, NavLink } from "react-router-dom";
import UserContext from "../UserContext";

const AppNavbar = () => {
    const { user } = useContext(UserContext);
    return (
        <Navbar expand="lg" className="appNavbar" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="/">NO BUDGET GADGET</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {
                        (user.id !== null && user.isAdmin)
                        ?
                        <Nav className="me-auto">
                            <Nav.Link as={NavLink} to="/admin" exact>Dashboard</Nav.Link>
                        </Nav>
                        :
                        <Nav className="me-auto">
                            <Nav.Link as={NavLink} to="/shop" exact>Shop</Nav.Link>
                        </Nav>
                    }
                    {
                        ((user.id !== null) || (localStorage.getItem("token") !== null))
                        ?
                            <NavDropdown title={<span className="text-primary">Account</span>} id="basic-nav-dropdown">
                                <NavDropdown.Item as={NavLink} to="/changepassword">Change Password</NavDropdown.Item>
                                <NavDropdown.Item as={NavLink} to="/logout">Log Out</NavDropdown.Item>
                            </NavDropdown>
                        :
                            <Nav>
                                <Nav.Link as={NavLink} to="/login" exact>Log In</Nav.Link>
                                <Nav.Link as={NavLink} to="/signup" exact>Sign Up
                            </Nav.Link>
                            </Nav>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default AppNavbar;
