import { useState } from "react"
import { Link } from "react-router-dom"

function Search() {

    const [searchTerm, setSearchTerm] = useState("")

    function handleSearch(e) {
        e.preventDefault()
    }

    return(
        <form onSubmit={handleSearch}>
            <input
            type="text"
            placeholder="Busque um filme"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">
                <Link to={`/search/${searchTerm}`}>Pesquisar</Link>
            </button>
        </form>
    )
}

export default Search;