import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Row, Col } from "react-bootstrap/Row";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";

    
export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);  
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
              })
              .catch((err) => {
                console.error(err);
            });
    }, [token]);

    return (
        <BrowserRouter>
        <NavigationBar
          user={user}
          onLoggedOut={() => {
            setUser(null);
          }}
        />
        <Row className="justify-content-md-content">
          <Routes>
            <Route
              path="/signup"
              element={
                <>
                {!user ? ( 
                  <Navigate to="/" />
                ) : (
                   <Col md={5}>
                    <SignupView />
                    </Col>
                )}
                </>

                }
              />
              <Route
                path="/login"
                element={
                  <>
                    {user ? (
                      <Navigate to="/" />
                    ) : (
                      <Col md={5}>
                        <LoginView 
            onLoggedIn={(user, token) => {
                setUser(user); // If login is successful set the user so useState isnt null
                setToken(token);
          }} />
              </Col>
            )}
          </>

                }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
              {!user ? (
                <Navigate to="/login" replace />
              ) : movies.length === 0 ? (
                <Col>The list is empty!</Col>
              ) : (
                <Col md={8}>
                    <MovieView movies={movies} />
                </Col>
              )}
            </>
          }
        />
        <Route
          path="/"
          element={
            <>
            {!user ? (
              <Navigate to="/login" replace /> 
            ) : movies.length === 0 ? (
              <Col>The list is empty!</Col>
            ) : (
              <>
              {movies.map((movie) => ( 
              <Col className="mb-5" key={movie.id} md={3}>
                <MovieCard 
                  movie={movie} />
               </Col> 
            ))}
        </>
        )}
        </>
        }
        />
        <>
        <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
        </>
        </Routes>
      </Row>
      </BrowserRouter>
    );
};

                  
//           }         <LoginView 
//             onLoggedIn={(user, token) => {
//                 setUser(user); // If login is successful set the user so useState isnt null
//                 setToken(token);
//           }}
//       />
//           or 
//           <SignupView />
//          </Col>
//                 </>
//               }>
//           {!user ? ( 
//             <Col md={5}>
//               <LoginView 
//             onLoggedIn={(user, token) => {
//                 setUser(user); // If login is successful set the user so useState isnt null
//                 setToken(token);
//           }}
//       />
//           or 
//           <SignupView />
//          </Col>
//      ) : selectedMovie ? ( 
//             <Col md={5} className="application">
//               <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
//             </Col>
//         ) : movies.length === 0 ? (
//           <Col>The list is empty!</Col>
//         ) : (
//           <>
//             {movies.map((movie) => ( 
//               <Col className="mb-5" key={movie.id} md={3}>
//                 <MovieCard 
//                   movie={movie} />
//                </Col> 
//             ))}
//         </>
//         )}
//         <>
//         <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
//         </>
//         </Routes>
//       </Row>
//       </BrowserRouter>
//     );
// };

