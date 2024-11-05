import api from "../../services/api";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Search() {

    const { search } = useParams() 
    const [ searchResults, setSearchResults] = useState([])

    useEffect(() => {
        async function getSearch() {

            if(!search) return

            try {
                const response = await api.get(`/search/movie?query=${search}`, {
                    params: {
                        api_key: "f1218bbba2ce7ad9688ef79714582bab",
                        query: search,
                        language: "pt-BR",
                        include_adult: false,
                    }
                });
                
                setSearchResults(response.data.results)
    
            } catch(error) {
                console.log('error ao buscar o filme', error);
            }
        }

        getSearch()

    },[search])

    return(
        <div>
            <h1>{`${searchResults.length}: resultados para ${search}`}</h1>
            <div>
                {searchResults.map((movie) => {
                    return (
                        <article key={movie.id}>
                            <strong>{movie.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title}/>
                            <Link to={`/filme/${movie.id}`}>Acessar</Link>
                        </article>
                    )
                })}
            </div>
        </div>
    )
}

export default Search;