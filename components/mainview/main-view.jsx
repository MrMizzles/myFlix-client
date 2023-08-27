import { identity } from "lodash";
import  React  from "react"
import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
    
export const MainView = () => {
    const [movies, setBooks] = useState([       
            { id: 1, title: "Raiders of the Lost Ark", year: '1981', description: "A globetrotting archaeologist and college professor vying with Nazi German forces to recover the long-lost Ark of the Covenant which is said to make an army invincible. Teaming up with his tough former romantic interest Marion Ravenwood (Karen Allen), Indiana Jones races to stop rival archaeologist Dr. René Belloq (Paul Freeman) from guiding the Nazis to the Ark and its power.", genre: "Action", image:
            "https://upload.wikimedia.org/wikipedia/en/a/a6/Raiders_of_the_Lost_Ark_Theatrical_Poster.jpg",
          director: "Steven Spielberg" },
            { id: 2, title: "Platoon", year: '1986', description: "The film, based on Stone's experience from the war, follows a U.S. Army volunteer (Sheen) serving in Vietnam while his Platoon Sergeant and his Squad Leader (Berenger and Dafoe) argue over the morality in the platoon and of the war itself.", genre: "War",
            image:
              "https://upload.wikimedia.org/wikipedia/en/a/a9/Platoon_posters_86.jpg",
            director: "Oliver Stone" },
            { id: 3, title: "Escape From New York", year: "1981", description: "Set in the near-future world of 1997, concerns a crime-ridden United States, which has converted Manhattan Island in New York City into the country's sole maximum security prison. Air Force One is hijacked by anti-government insurgents who deliberately crash it into the walled borough. Ex-soldier and current federal prisoner Snake Plissken (Russell) is given just 24 hours to go in and rescue the President of the United States, after which, if successful, he will be pardoned.",
            image:
              "https://upload.wikimedia.org/wikipedia/en/4/4b/EscapefromNYposter.jpg",
            director: "John Carpenter" }
    ]);

    const [selectedMovieData, setSelectedMovieData] = useState(null);

    if (selectedMovieData) {
        return ( 
            <MovieView movieData={selectedMovieData} onBackClick={() => setSelectedMovieData(null)} />
        );
    }

    if (movies.length === 0) {
        return <div>The list is empty :/</div>
    }

    return (
        <div>
            {movies.map((movie) => ( 
                < MovieCard 
                key={movie.id} 
                movieData={movie}
                onMovieClick={(newSelectedMovieData) => {
                    setSelectedMovieData(newSelectedMovieData);
                }}
                />
            ))}
        </div>
    );
}


