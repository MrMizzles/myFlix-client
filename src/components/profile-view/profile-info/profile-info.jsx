import { useState } from "react";
import { Button, Card, Col, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

export const ProfileInformation = ({ user, token, onLoggedOut }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = () => {
        fetch(
            `https://moviesapionrender.onrender.com/users/${user._id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then((response) => {
                if (response.ok) {
                    onLoggedOut();
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <>
            <Card className="m-5 bg-light w-100 mh-40">
                <Card.Title className="pt-4 d-flex justify-content-center">
                    <h3>Your information</h3>
                </Card.Title>
                <Card.Body className="px-4 mx-auto d-flex flex-column bg-light">
                    <p>Username: {user.Username}</p>
                    <p>Email: {user.Email}</p>
                    <p>Birthday: {user.Birthday}</p>
                    <Button variant="danger" onClick={handleShow} className="my-4">
                        Delete account
                    </Button>
                </Card.Body>
            </Card>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className="bg-light">
                    <Modal.Title className="mx-auto">
                        Delete your account?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Footer className="bg-light">
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Go back
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};