import { Link } from "react-router-dom"
import './error.css'

function Error() {
    return(
        <div className="not-found">
            <h1>404</h1>
            <h3>Pagina nao encontrada</h3>
            <Link to='/'>Volte para a home</Link>
        </div>
    )
}

export default Error;