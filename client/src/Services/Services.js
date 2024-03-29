import client from "./AxiosClient"

export function getFeed() {
  return client.get("/post/all")
}

export function getPost(id) {
  return client.get(`/post/${id}`)
}
export function deletePost(id) {
  return client.delete(`/post/${id}`)
}

export function upvotePost(id){
  return client.post(`/post/${id}/upvote`)
}

export function downvotePost(id){
  return client.post(`/post/${id}/downvote`)
}

export function upvoteComment(id){
  return client.post(`/comment/${id}/upvote`)
}

export function downvoteComment(id){
  return client.post(`/comment/${id}/downvote`)
}

export function deleteComment(id){
  return client.delete(`/comment/${id}`)
}

export function getUser(username) {
  return client.get(`user/${username}`)
}
export function getCurrentUser() {
  return client.get("user/profile")
}
export function loginUser(data) {
  return client.post("/auth/login", data)
}

export function registerUser(data) {
  return client.post("auth/register", data)
}
export function createTheme(data) {
  return client.post("theme/createtheme", data)
}
export function createPost(data) {
  return client.post("/post/makePost", data)
}

export function createComment(data, id) {
  return client.post(`/post/${id}/comments`, data)
}
export function getThemes() {
  return client.get("/theme/all")
}

export function getTheme(id) {
  return client.get(`theme/${id}`)
}
