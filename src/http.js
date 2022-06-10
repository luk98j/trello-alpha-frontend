import axios from "axios";
import authHeader from "../src/services/auth-header.js"

const http = axios.create({
    baseURL: `https://trello-alpha-backend-dev.herokuapp.com/`,
    headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": authHeader().Authorization
    }
});


export default http;