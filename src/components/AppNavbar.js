import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, NavLink } from "react-router-dom";

const AppNavbar = () => {
    return (
        <Navbar expand="lg" className="appNavbar" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="/">NO BUDGET GADGET</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/shop" exact>Gadgets</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link as={NavLink} to="/login" exact>Log In</Nav.Link>
                        <Nav.Link as={NavLink} to="/signup" exact>Sign Up
                    </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default AppNavbar;
