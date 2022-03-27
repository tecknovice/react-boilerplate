import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3001'

interface Response<T> {
    data?: T
    error?: string
}

export async function get<T>(url: string): Promise<Response<T>> {
    try {
        const response = await axios.get<T>(url)
        return response.data
    } catch (error) {
        return handleError<T>(error)
    }
}

export async function post<T>(url: string, params: any): Promise<Response<T>> {
    try {
        const { data } = await axios.post<T>(url, params)
        return { data }
    } catch (error) {
        return handleError<T>(error)
    }
}

function handleError<T>(error: any): Response<T> {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx

        // console.error(error.response.data)
        // console.error(error.response.status)
        // console.error(error.response.headers)
        return { error: error.response.data.message }
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js

        // console.error(error.request)
        return { error: 'Server is down' }
    } else {
        // Something happened in setting up the request that triggered an Error

        // console.error('Error', error.message)
        return { error: error.message }
    }
}
