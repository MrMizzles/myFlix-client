//import prop-types module
import PropTypes from "prop-types";
import { Col, Row, Button, Card } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { SimilarMovies } from "./similar-movies/similar-movies";
import "./movie-view.scss";
import movieImage from '../../assets/denise-jans-9lTUAlNB87M-unsplash-2.jpg';

//display movie data 
export const MovieView = ({ movies, user, favorites, token, setUser }) => {
    //returning /movies/:title object through useParams
    const { title } = useParams();
    const movie = movies.find((movie) => movie.Title === title);

    return (
        <>
            <Card className="mb-4 d-flex flex-row bg-light mt-5 align-items-center movieView_component">
                <Col xl={5} lg={12} className="d-flex align-items-center justify-content-center mx-auto">
                    <Card.Img src={movieImage} className="movieView_component--image p-4" alt="movie poster" style={{ minWidth: "400px" }} />
                </Col>
                <Col xl={7} lg={12}>
                    <Card.Body className="my-4 bg-light text-xs-center">
                        <div className="d-flex align-items-center justify-content-center">
                            <Card.Title className="mb-4 font-weight-bold mx-auto">{movie.Title}</Card.Title>
                        </div>
                        <Card.Text>{movie.Description}</Card.Text>
                        <Card.Text>Director: {movie.Director.Name}</Card.Text>
                        <Card.Text>{movie.Director.Bio}</Card.Text>
                        <Card.Text>Genre: {movie.Genre.Name}</Card.Text>
                        <Card.Text>{movie.Genre.Description}</Card.Text>
                    </Card.Body>
                    <Card.Footer className="mt-4 bg-light d-flex justify-content-center">
                        <Link to={'/'} className="mt-4">
                            <Button className="mb-3">Back</Button>
                        </Link>
                    </Card.Footer>
                </Col>
            </Card>
            <SimilarMovies movie={movie} movies={movies} user={user} favorites={favorites} token={token} setUser={setUser} />
        </>
    );
};