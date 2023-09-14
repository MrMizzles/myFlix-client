import React, { useState, userEffect } from "react";
import { Card, Button, Row, Col, Modal, Form, ModalFooter } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { NavigationBar } from "../navigation-bar/navigation-bar";



export const ProfileView = ({ user, movies, token, updateUsername }) => {
    
    const [username, setUsername] = useState(user.username);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(user.email);
    const [birthday, setBirthday] = useState(user.birthday);
    const [show, setShow] = useState(false);
    const [deregister, setDeregister] = useState(false);
    const favorite_movies = movies.filter((movie) => user.favorite_movies.includes(movie.id));

    handleShow = () => setShow(true);
    handleClose = () => setClose(false);
    update = () => {

        const data = {
            user: username,
            password: password,
            email: email,
            birthday: birthday
        };
        fetch("https://moviesapionrender.onrender.com/users/" + user.username,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json", Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
        .then((response) => (response.json())
        .then((res) => {
            console.log("Login response: ", data);
        if (res.username) {
            localStorage.setItem("user", JSON.stinginfy(res.username));
            localStorage.setItem("userObject", JSON.stringify(res));
            updateUsername(res);
                    alert("Account updated");
        } else {
            alert("Failed to Update");
        }
    }));
    setShow(false);
    }};

    deleteUser = () => {
        fetch("https://moviesapionrender.onrender.com/users/" + username,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json", Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .then((data) => {
            console.log(data);
            alert("Account Deleted");
            updateUsername(null);
            localStorage.clear();
            window.location.reload();
        });
    };
    handleDeregister = () => setDeregister(true);
    handleCloseDeregister = () => setDeregister(false);

    if (username !== null) {
        return(
            <>
            <Row>
                <Col md={6} className="mx-auto">
                    <Card border="primary" className="movieCard">
                        <Card.Img className="card-image" src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png?20170328184010" />
                        <Card.Body>
                            <Card.Title className="text-center fs-4">Profile<br /> </Card.Title>
                            <Card.Text>
                                Username: {username}<br />
                                Email: {email}<br />
                                Birthday: {birthday}<br />
                            </Card.Text>
                            
                            <Button variant="primary" data-inline="true" className="m=4 float-end" onClick={handleShow}>Update profile</Button>
                            <Button variant="primary" data-inline="true" className="m=4 float-end" onClick={handleDeregister}> Delete account</Button>


                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <h2 className="text-center mb-5">Favorite Movies</h2>
                    {favorite_movies.map((movie) => (
                        <Col className="mb-5 d-flex" key={movie.id} xs={12} sm={6} md={4} lg={3}>
                            <MovieCard movie={movie} user={user} token={token} setUser={(user) => updateUsername(user)} />
                            </Col>
                    ))}
                </Row>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title className="ms-auto">Update Profile</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="username" placeholder={username} value={username} onChange={(e) => setUsername(e.target.value)} required />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter your new password" onChange={(e) => setPassword(e.target.value)} required />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder={email} value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicBirthday">
                            <Form.Label>Birthday</Form.Label>
                            <Form.Control type="date" placeholder={birthday} value={birthday} onChange={(e) => setBirthday(e.target.value)} required />
                            </Form.Group>

                        </Form>
                    </Modal.Body>
                    <ModalFooter>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        <Button variant="primary" onClick={updateUser}>Update User</Button>
                    </ModalFooter>
                </Modal>

                <Modal show={deregister} onHide={handleCloseDeregister}>
                    <Modal.Header closeButton>
                        <Modal.Title className="ms-auto">Deregister</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Do you want to delete your account?</p>
                    </Modal.Body>
                    <ModalFooter>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        <Button variant="primary" onClick={deleteUser}>Delete Account</Button>
                    </ModalFooter>
                </Modal>
                </>
        );
    }