import axios from 'axios'

const api = axios.create({

    baseURL: 'https://apsweb-s70i.onrender.com/'
})

export default api