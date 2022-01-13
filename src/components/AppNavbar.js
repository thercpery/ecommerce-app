import { Fragment, useState, useContext } from "react";
import { Navbar, Nav, Container } from 'react-bootstrap';
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
                        (user.id !== null || user.isAdmin)
                        ?
                        <Nav className="me-auto">
                            <Nav.Link as={NavLink} to="/admin/dashboard" exact>Dashboard</Nav.Link>
                            <Nav.Link as={NavLink} to="/admin/orders" exact>All Orders</Nav.Link>
                        </Nav>
                        :
                        <Nav className="me-auto">
                            <Nav.Link as={NavLink} to="/shop" exact>Shop</Nav.Link>
                        </Nav>
                    }
                    {
                        ((user.id !== null) || (localStorage.getItem("token") !== null))
                        ?
                            <Nav>
                                <Nav.Link as={NavLink} to="/logout">Log Out</Nav.Link>
                            </Nav>
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
