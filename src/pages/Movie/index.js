import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../../services/api"

function Movie() {

    const { id } = useParams();
    const [ movie, setMovie ] = useState({})
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        async function getMovie() {
            try {
                const response = await api.get(`/movie/${id}`, {
                    params: {
                        api_key: "f1218bbba2ce7ad9688ef79714582bab",
                        language: "pt-BR",
                    }
                });
                console.log(response.data);
                setMovie(response.data);
                setLoading(false);
            } catch (error) {
                console.log("Filme não encontrado");
                setLoading(false);
            }
        }

        getMovie();

        return () => {
            console.log('Componente desmontado');
        };
    }, [id]);

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
        </div>
    )
}

export default Movie;