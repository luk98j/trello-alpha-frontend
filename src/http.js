import axios from "axios";
import authHeader from "../src/services/auth-header.js"

const http = axios.create({
    baseURL: `${process.env.REACT_APP_ROOT_PATH}`,
    headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": authHeader().Authorization
    }
});


export default http;