import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import movieImage from '../../assets/gr-stocks-q8P8YoR6erg-unsplash-2.jpg';


export const MovieCard = ({ movie, user, token, setUser }) => {
    const [isFavorite, setFavorite] = useState(user?.Favorites);


    const addToFavorites = () => {
        fetch(
            `https://moviesapionrender.onrender.com/users/${user.Username}/movies/${movie._id}`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        ).then((response) =>
            response
                .json()
                .then((data) => {
                    localStorage.setItem("user", JSON.stringify(data));
                    setUser(data);
                    setFavorite(true);
                })
                .catch((error) => {
                    console.error(error);
                })
        );
    };

    const deleteFromFavorites = () => {
        fetch(
            `https://moviesapionrender.onrender.com/users/${user.Username}/movies/${movie._id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        )
            .then((response) => response.json())
            .then((data) => {
                localStorage.setItem("user", JSON.stringify(data));
                setUser(data);
                setFavorite(false);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <Card className="h-100 m-auto bg-light mh-90 ">
            <div className="position-relative" style={{ minHeight: "80%" }}>
                <Card.Img className="fluid h-100" variant="top" src={movieImage} />
                <div
                    style={{ bottom: "80%", left: "75%" }}
                    className="ms-0 p-0 mw-10 position-absolute bg-transparent"
                >
                    {!isFavorite ? (
                        <Button variant="primary" type="submit"
                            onClick={() => {
                                addToFavorites();
                            }}
                        >Like</Button>
                    ) : (
                        <Button variant="secondary" type="submit"
                            onClick={() => {
                                deleteFromFavorites();
                            }}
                        >Unlike</Button>
                    )}
                </div>
            </div>
            <Card.Body className="mh-10 d-flex justify-content-center bg-light">
                <div className="d-flex flex-column align-items-center">
                    <Card.Title className="font-weight-bold my-3" style={{ fontFamily: "'Victor Mono', monospace" }}>
                        {movie.Title}
                    </Card.Title>
                    <Link to={`/movies/${encodeURIComponent(movie.Title)}`}>
                        <Button variant="primary">Movie Details</Button>
                    </Link>
                </div>
            </Card.Body>
        </Card>
    );
};

//define props constraints
MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string,
    }).isRequired,
};