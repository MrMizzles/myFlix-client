import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-bootstrap-dom";

export const MovieCard = ({ movie }) => {
    return (
        <Card className="h-100">
            <Card.Img variant="top" src={movie.image} />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.director}</Card.Text>
                <Link to={`/movies/${encodeURIComponent(movie.id)}`}></Link>
                <Button variant="link">Open</Button>
            </Card.Body>
        </Card>
  );
};

//PropTypes conditions for return MovieCard statement in main-view.jsx
MovieCard.PropTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        director: PropTypes.string.isRequired,
        }).isRequired,
        onMovieClick: PropTypes.func.isRequired
    };