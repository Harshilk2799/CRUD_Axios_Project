import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// GET Method
export function getPost() {
  return api.get("/posts");
}

// DELETE Method
export function deletePost(id) {
  return api.delete(`/posts/${id}`);
}

// POST Method
export function PostData(post) {
  return api.post("/posts", post);
}

// PUT Method
export function updateData(id, post) {
  return api.put(`/posts/${id}`, post);
}
