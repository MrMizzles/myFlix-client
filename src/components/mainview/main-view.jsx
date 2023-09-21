import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Row, Col } from "react-bootstrap";



export const MainView = () => {
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);


  useEffect(() => {
    if (!token) { // If there's no token, the following doesnt execute.
      return;
    }
    fetch(`https://moviesapionrender.onrender.com/movies`,
      {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => response.json())
      .then((data) => {

        const moviesFromApi = data.map((movie) => {
          return {
            _id: movie._id,
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
  }, [token]);//add token to dependency array so data only re-renders on token change

  const onLoggedOut = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  let favorites = ["test"];

  return (
    <BrowserRouter>
      <NavigationBar
        user={user} movies={movies} favorites={favorites} token={token} setUser={setUser}
        onLoggedOut={onLoggedOut}
      />
      <Row className="justify-content-md-content">
        <Routes>
          <Route
            path="/users"
            element={
              <>
                {user ? (
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
            path="/movies/:title"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col>
                    <MovieView movies={movies} user={user} favorites={favorites} token={token} setUser={setUser} />
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
                      <Col xs={12} s={8} md={4} className="mb-5" key={movie._id}>
                        <MovieCard
                          movie={movie} user={user} token={token} setUser={setUser} favorites={favorites} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
          <Route
            path="/users/:username/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" />
                ) : (
                  <Col>
                    <ProfileView user={user} movies={movies} token={token} favorites={favorites} setUser={setUser} onLoggedOut={onLoggedOut} />
                  </Col>
                )}
              </>
            }
          />
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

