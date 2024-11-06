import { useEffect, useState } from "react";
import { json, useParams } from "react-router-dom";
import "./movie-info.css"
import { toast } from "react-toastify";
import api from "../../services/api"

function Movie() {

    const { id } = useParams();
    const [ movie, setMovie ] = useState({})
    const [ loading, setLoading ] = useState(true)
    const [ findMovie, setFindMovie] = useState(false)

    useEffect(() => {
        async function getMovie() {
            try {
                const response = await api.get(`/movie/${id}`, {
                    params: {
                        api_key: "f1218bbba2ce7ad9688ef79714582bab",
                        language: "pt-BR",
                        include_adult: false,
                    }
                });
                console.log(response.data);
                setMovie(response.data);
                setLoading(false);
            } catch (error) {
                setFindMovie(true)
            }
        }

        getMovie();

        return () => {
            console.log('Componente desmontado');
        };
    }, [id]);

    function saveMovie() {
        const moviesLocalStorage = localStorage.getItem("@henriqueflix")

        let listSaveMovies = JSON.parse(moviesLocalStorage) || []

        const hasMovie = listSaveMovies.some((saveMovie) => saveMovie.id === movie.id)

        if(hasMovie) {
            toast.warn("Esse filme já está na lista!")
            return
        }

        listSaveMovies.push(movie)
        localStorage.setItem("@henriqueflix", JSON.stringify(listSaveMovies))
        toast.success("Filme adicionado na lista!")

    }

    if(findMovie) {
        return(
            <div className="movie-info">
                <h2>Filme nao encontrado</h2>
            </div>
        )
    }

    if(loading) {
        return(
            <div className="movie-info">
                <h2>Carregando detalhes...</h2>
            </div>
        )
    }

    return(
        <div className="movie-info">
            <h1>{movie.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title}/>
            <h3>Sinopse</h3>
            <span>{movie.overview}</span>
            <strong>Avaliação: {movie.vote_average} / 10</strong>
        
            <div className="buttons-area">
                <button onClick={saveMovie}>Salvar</button>
                <button>
                    <a target="blank" rel="external" href={`https://www.youtube.com/results?search_query=${movie.title} Trailer`}>Trailer</a>
                </button>
            </div>
        </div>
    )
}

export default Movie;