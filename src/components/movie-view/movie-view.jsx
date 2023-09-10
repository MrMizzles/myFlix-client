import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";

export const MovieView = ({ movieData, onBackClick }) => { 
    return ( 
        <Row className="justify-content-md-center">
        <Col md={8} style={{ border: "1px solid black" }}>
        <BookView movieData >
            <div>
                <img src={movie.ImagePath} w-100 />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.Title}</span>
            </div>
            <div>
                <span>Year: </span>
                <span>{movie.Year}</span>
            </div> 
            <div>
                <span>Genre: </span>
                <span>{movie.Genre.Name}</span>
            </div> 
            <div>
                <span>Description: </span>
                <span>{movie.Description}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.Director.Name}</span> 
            </div>
            <div>
                <span>Featured: </span>
                <span>{movie.Featured}</span>
            </div> 
            <div>
                <span>Genre: </span>
                <span>{movieData.genre}</span>
            </div>
            <button onClick={onBackClick} className="back-button" style={{ cursor: "pointer" }}>Back</button>
        </BookView>
        return (
    </Col>
  );
    </Row>
    );
};

MovieView.PropTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        ImagePathh: PropTypes.string.isRequired,
        Year: PropTypes.string,
        Description: PropTypes.string,
           Director: PropTypes.string,
           Genre: PropTypes.shape({
             Name: PropTypes.string,
             Description: PropTypes.string
        })
        }).isRequired,
        onMovieClick: PropTypes.func.isRequired
    };

