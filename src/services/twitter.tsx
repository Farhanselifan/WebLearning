import axios from "axios";

const TwitApi = axios.create ({
    baseURL: 'http://localhost:599',
    headers: {
    'Content-Type': 'application/json'
    }

})

export default TwitApi;