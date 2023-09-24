import React, { useState } from "react";
import { Form, Button, Card, Col, } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");


    const navigate = useNavigate();

    const handleSignUp = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        fetch("https://moviesapionrender.onrender.com/users",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
            })
            .then((response) => {
                if (response.ok) {
                    alert("Signup succesful");
                    navigate("/login");
                } else {
                    alert("Signup failed");
                }
            });
    };

    return (
        <>
            <Col xl={8} className="mx-auto">
                <Card className="mx-auto my-5 bg-light">
                    <Card.Title className="mx-auto pt-4">Register</Card.Title>
                    <Card.Body>
                        <Form className="bg-light" onSubmit={handleSignUp}>
                            <Form.Group controlId="formUsername" className="mb-3">
                                <Form.Label>Username*</Form.Label>
                                <Form.Control
                                    type="text"
                                    className="bg-light"
                                    minLength="6"
                                    value={username}
                                    required
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                    }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Label>Password*</Form.Label>

                                <Form.Control
                                    type="password"
                                    className="bg-light"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>Email*</Form.Label>

                                <Form.Control
                                    type="email"
                                    className="bg-light"
                                    value={email}
                                    required
                                    minLength="6"
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBirthday">
                                <Form.Label>Birthday*</Form.Label>

                                <Form.Control
                                    type="date"
                                    className="bg-light"
                                    value={birthday}
                                    required
                                    onChange={(e) => setBirthday(e.target.value)}
                                />
                            </Form.Group>
                            <Col className="mb-3 d-flex justify-content-center pt-4">
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Col>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </>
    );
};