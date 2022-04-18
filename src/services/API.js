import http from "../http.js";

const API = {
    getHello: () => http.get('/hello'),
    
}

export default API;