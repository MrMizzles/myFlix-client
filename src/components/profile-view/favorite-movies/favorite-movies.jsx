import { Container, Button, Row, Col, Card } from "react-bootstrap";
import { MovieCard } from "../../movie-card/movie-card";
import { Col, Row, Button, Card } from "react-bootstrap";

export const FavoriteMovies = ({ user, movies, token, setUser }) => {
    //get favoriteMovies array
    const fav = user.Favorites;
    // let favoriteMovies = movies.filter(m => fav.includes(m._id));
    let favoriteMovies = (movies && fav) ? movies.filter(m => fav.includes(m._id)) : [];

    return (
        <>
            <Col className="d-flex align-items-center">
                <h2 className="text-light mx-auto mt-5 mb-4">Your favorite movies</h2>
            </Col>
            <Row>
                {favoriteMovies.map((movie) => {
                    return (
                        <Col xs={12} s={8} md={4} className="mt-4" key={movie._id}>
                            <MovieCard movie={movie} user={user} token={token} setUser={setUser} className="mb-5" />
                        </Col>
                    )
                })
                }
                {!favoriteMovies && (
                    <Col>No favorite movies yet</Col>
                )}
            </Row>
        </>
    );
};