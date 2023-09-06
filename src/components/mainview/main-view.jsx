import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";

import { PropTypes } from 'prop-types';
import { SignupView } from "../signup-view/signup-view";
    
export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);  
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        if (!token) { // If there's no token, dont execute the rest
            return;
        }
        fetch("https://moviesapionrender.onrender.com/movies",
        {
            headers: {  Authorization: `Bearer ${token}` }
        })
        .then((response) => response.json())
        .then((data) => {

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
    }, [setToken]);

    if(!user) {
        return (
        <>
          <LoginView 
            onLoggedIn={(user, token) => {
                setUser(user); // If login is successful set the user so useState isnt null
                setToken(token);
        }} 
      />
      or 
      <SignupView />
      </>
     );
    }
    
    if (selectedMovie) {
        return ( 
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }

    if (movies.length === 0) {
        return <div>The list is empty.</div>;
    }

    return (
        <div>
            {movies.map((movie) => ( 
                <MovieCard 
                key={movie.Title} 
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                }}
                />
            ))}
        <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
        </div>
    );
};


