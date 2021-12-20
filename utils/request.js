import axios from 'axios'

let http = axios.create({
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json'
    }
})

http.defaults.headers.post['Content-Type'] = 'application/json';
http.defaults.headers.put['Content-Type'] = 'application/json';

http.interceptors.request.use(config => {
    return config
}, error => {
    return Promise.reject(error)
})

http.interceptors.response.use(config => {
        let {data} = response
        return data
    }, error => {
        let info = {}
    }
)