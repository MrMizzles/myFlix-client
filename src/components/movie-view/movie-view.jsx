import PropTypes from "prop-types";


export const MovieView = ({ movieData, onBackClick }) => { 
    return ( 
        <div>
            <div>
                <img src={movie.ImagePath} />
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
            <button onClick={onBackClick}>Back</button>
        </div>
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