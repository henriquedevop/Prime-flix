import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import './home.css'

//https://api.themoviedb.org/3/movie/now_playing?api_key=f1218bbba2ce7ad9688ef79714582bab&language=pt-BR

function Home() {

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true)
    const weekMovie = 4

    useEffect(() => {
        async function loadMovies() {
            try {
                const response = await api.get("movie/now_playing", {
                    params: {
                        api_key: "f1218bbba2ce7ad9688ef79714582bab",
                        language: "pt-BR",
                        include_adult: false,
                        page: 1,
                    }
                });

                setMovies(response.data.results.slice(0, 20));
                console.log(response.data.results);
                
                setLoading(false);
            } catch (error) {
                console.log("Erro ao carregar filmes:", error);
            }
        }

        loadMovies();
    }, []);

    if(loading) {
        return(
            <div className="loading">
                <h1>Carregando filmes...</h1>
            </div>
        )
    }

    return(
        <main className="container">      
            <div className="container-week">
            <img className="week-poster" src={`https://image.tmdb.org/t/p/original/${movies[weekMovie].backdrop_path}`} alt={movies[weekMovie].title}/>
            <h2 className="week-title">{movies[weekMovie].title}</h2>
            <h2 className="week-vote"> Nota: {movies[weekMovie].vote_average.toFixed(1)} / 10</h2>
            <span className="week-desc">{movies[weekMovie].overview}</span>
            <a className="week-trailer" target="blank" rel="external" href={`https://www.youtube.com/results?search_query=${movies[weekMovie].title} Trailer`}> <i class="bi bi-play-fill"></i> Trailer</a>
            <Link className="week-details" to={`/filme/${movies[weekMovie].id}`}> <i class="bi bi-info-circle"></i> Ver detalhes</Link>
            </div>
            <div className="movies-list">
                {movies.map((movie) => {
                    return(
                        <article className="movie-body" key={movie.id}>
                            <Link to={`/filme/${movie.id}`  }><img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title}/></Link>
                            <strong className="movie-title">{movie.title}</strong>
                            <Link className="movie-detalis" to={`/filme/${movie.id}`}>Acessar</Link>
                        </article>
                    )
                })}
            </div>
        </main>
    )
}

export default Home;