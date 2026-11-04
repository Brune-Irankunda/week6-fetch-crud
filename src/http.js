
const BASE_URL = "https://jsonplaceholder.typicode.com";

// General request helper
async function request(endpoint, options = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

// API methods
export const api = {
  // Get posts
  getPosts(userId = "") {
    const params = new URLSearchParams({
      _limit: "10",
    });

    if (userId) {
      params.append("userId", userId);
    }

    return request(`/posts?${params}`);
  },

  // Create post
  createPost(post) {
    return request("/posts", {
      method: "POST",
      body: JSON.stringify(post),
    });
  },

  // Update post title
  updatePost(id, title) {
    return request(`/posts/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ title }),
    });
  },

  // Delete post
  deletePost(id) {
    return request(`/posts/${id}`, {
      method: "DELETE",
    });
  },
};
