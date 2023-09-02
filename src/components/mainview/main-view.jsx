import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import PropTypes from "prop-types";
    
export const MainView = () => {
    const [movies, setMovies] = useState([]);
    
    //creates state changes for selected movies
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        fetch("https://moviesapionrender.onrender.com/movies")
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            const moviesFromApi = data.map((movie) => {
                return {
                    _id: movie.id,
                    Title: movie.Title,
                    ImagePath: movie.ImagePath,
                    Description: movie.Description,
                    Genre: {
                        Name: movie.Genre.Name,
                        Description: movie.Genre.Description
                },  
                    Director: {
                        Name: movie.Director.Name
                },
                    Featured: movie.Featured.toString()
                   };
                });
                
                setMovies(moviesFromApi);
            });
    }, []);

    if (selectedMovie) {
        return ( 
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }

    if (movies.length === 0) {
        return <div>The list is empty :/</div>
    }

    return (
        <div>
            {movies.map((movie) => ( 
                < MovieCard 
                key={movie.Title} 
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                }}
                />
            ))}
        </div>
    );
}


