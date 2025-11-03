import axios from 'axios'

const api = axios.create({

    baseURL: 'https://apsweb-04lz.onrender.com/'
})

export default api