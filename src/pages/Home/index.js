import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import Search from "../../components/Search";
import './home.css'

//https://api.themoviedb.org/3/movie/now_playing?api_key=f1218bbba2ce7ad9688ef79714582bab&language=pt-BR

function Home() {

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        async function loadMovies() {
            try {
                const response = await api.get("movie/now_playing", {
                    params: {
                        api_key: "f1218bbba2ce7ad9688ef79714582bab",
                        language: "pt-BR",
                        page: 1,
                    }
                });

                setMovies(response.data.results.slice(0, 10));
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
            <Search/>
            <div className="movies-list">
                {movies.map((movie) => {
                    return(
                        <article key={movie.id}>
                            <strong>{movie.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title}/>
                            <Link to={`/filme/${movie.id}`}>Acessar</Link>
                        </article>
                    )
                })}
            </div>
        </main>
    )
}

export default Home;