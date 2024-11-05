import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./favorites.css"
import { toast } from "react-toastify";

function Favorites() {

    const [movies, setMovies] = useState([])

    useEffect(() => {
        
        const userMovieList = localStorage.getItem("@henriqueflix");
        setMovies(JSON.parse(userMovieList) || [])

    },[])

    function removeMovie(id) {
        let filterMovies = movies.filter((movie) => {
            return (movie.id != id)
        })
        
        setMovies(filterMovies)
        localStorage.setItem("@henriqueflix", JSON.stringify(filterMovies))
        toast.success("Filme removido com sucesso!")
    }

    return(
        <div className="userListMovies">
            <h1>Minha lista de filmes</h1>

            {movies.length === 0 && <span>Você não possui nenhum filme cadastrado :( </span>}

            <ul>
                {movies.map((movie) => {
                    return(
                        <li key={movie.id}>
                            <span>{movie.title}</span>
                            <div>
                                <Link to={`/filme/${movie.id}`}>Ver detalhes</Link>
                                <button onClick={() => removeMovie(movie.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}   
            </ul>
        </div>
    )
}

export default Favorites;