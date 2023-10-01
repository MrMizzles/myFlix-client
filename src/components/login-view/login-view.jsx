import React, { useState } from "react";
import { Form, Card, Col, Button } from "react-bootstrap";



export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password
        };

        fetch("https://moviesapionrender.onrender.com/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            .then((response) => { return response.json() })
            .then((data) => {
                if (data.user) {
                    localStorage.setItem("user", JSON.stringify(data.user));
                    localStorage.setItem("token", data.token);
                    onLoggedIn(data.user, data.token);
                } else {
                    alert("No such user");
                }
            })
            .catch((e) => {
                alert("Something went wrong");
            });
    };
    return (
        <Col xl={8} className="mx-auto">
            <Card className="mx-auto my-5 bg-light">
                <Card.Title className="mx-auto pt-4">Sign In</Card.Title>
                <Card.Body>
                    <Form onSubmit={handleSubmit} className="bg-light">
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username* </Form.Label>
                            <Form.Control className="bg-light" type="text"
                                value={username} onChange={(e) => { setUsername(e.target.value); }} required minLength="5" />
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                            <Form.Label>Password* </Form.Label>
                            <Form.Control
                                className="bg-light"
                                type="password"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value); }} required
                            />
                        </Form.Group>
                        <Col className="mb-3 d-flex justify-content-center pt-4">
                            <Button variant="submit" type="submit">Submit</Button>
                        </Col>
                    </Form>
                </Card.Body>
            </Card>
        </Col>
    );
};