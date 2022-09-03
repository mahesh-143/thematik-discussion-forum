import client from "./AxiosClient";

export function getFeed() {
    return client.get('/post/all')

}

export function getPost(id) {
    return client.get(`/post/${id}`)
}

export function loginUser(data) {
    return client.post('/auth/login', data)
}

export function registerUser(data) {
    return client.post('auth/register', data)
}
export function createPost(data) {
    return client.post('/post/makePost', data)
}

export function createComment(data, id) {
    return client.post(`/post/${id}/comments`, data)
}
export function getThemes() {
    return client.get('/theme/all')
}