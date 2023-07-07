import axios from 'axios'
//  Url da api
const api = axios.create({
    baseURL:"http://localhost:5000/"
})

export default api