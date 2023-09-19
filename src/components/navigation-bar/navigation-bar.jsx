import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";


export const NavigationBar = ({
    user,
    onLoggedOut,
    movies,
    favorites,
    token,
    setUser,
}) => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand as={Link} to="/">
                    80s Flix
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0 w-100 d-flex justify-content-between"
                        style={{ maxHeight: "250px" }}
                        navbarScroll
                    >
                        {user && (
                            <>
                                <div className="d-flex justify-content-end navLinks">
                                    <Nav.Link as={Link} to="/">
                                        Home
                                    </Nav.Link>
                                    <Nav.Link as={Link} to={`/users/${user.Username}/`}>
                                        Profile
                                    </Nav.Link>
                                </div>
                                <div>
                                    <div className="d-flex justify-content-end navSearch">
                                        <Nav.Link
                                            as={Link}
                                            to="/login"
                                            onClick={onLoggedOut}
                                            className="mb-2"
                                        >
                                            Logout
                                        </Nav.Link>
                                    </div>
                                </div>
                            </>
                        )}
                    </Nav>
                    <Nav className="ms-auto">
                        {!user && (
                            <>
                                <Navbar.Collapse className="justify-content-end">
                                    <Nav.Link as={Link} to="/">
                                        Login
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/users">
                                        Register
                                    </Nav.Link>
                                </Navbar.Collapse>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};