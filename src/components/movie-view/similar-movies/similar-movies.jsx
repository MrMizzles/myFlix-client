import React from "react";
import { Col, Row, Button, Card } from "react-bootstrap";
import { MovieCard } from "../../movie-card/movie-card";

export const SimilarMovies = ({ movie, movies, user, favorites, token, setUser }) => {

    let similarMovies = movies.filter((m) => {
        if (m.Genre.Name == movie.Genre.Name && m.Title != movie.Title) {
            return movie;
        }
    });

    return (
        <>
            <div className="d-flex justify-content-center">
                <h2 className="text-light mt-5 mb-4">Other great movies</h2>
            </div>
            <Row>
                {similarMovies.map((movie) => {
                    return (
                        <Col xs={12} s={8} md={4} className="mt-4" key={movie._id}>
                            <MovieCard
                                movie={movie} user={user} favorites={favorites} token={token} setUser={setUser}
                            />
                        </Col>
                    );
                })}
            </Row>
        </>
    );
};