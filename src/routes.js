import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Movie from "./pages/Movie";
import Header from "./components/Header";
import Favorites from "./pages/Favorites";
import Search from "./pages/Search";
import Footer from "./components/Footer";
import Error from "./pages/Error"

function RoutesApp() {
    return(
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={ <Home/>}/>
                <Route path="/filme/:id" element={ <Movie/>}/>
                <Route path="/favoritos" element={ <Favorites/>}/>
                <Route path="/search/:search" element={ <Search/>}/>

                <Route path="*" element={ <Error/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    )
}

export default RoutesApp;