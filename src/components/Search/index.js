import { useState } from "react"
import { Link } from "react-router-dom"
import "./search.css"

function Search() {

    const [searchTerm, setSearchTerm] = useState("")

    function handleSearch(e) {
        e.preventDefault()

    }

    return(
        <form className="form-search" onSubmit={handleSearch}>
            <input id="input-search"
            type="text"
            placeholder="Busque um filme"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">
                <Link to={`/search/${searchTerm}`}><i class="bi bi-search"></i></Link>
            </button>
        </form>
    )
}

export default Search;