// https://api.themoviedb.org/3/movie/now_playing?api_key=f1218bbba2ce7ad9688ef79714582bab&language=pt-BR
// https://api.themoviedb.org/3/

import axios from "axios";

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api;