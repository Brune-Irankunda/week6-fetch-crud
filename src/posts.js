
import { api } from "./http.js";

// Store posts
let posts = [];

// Select HTML elements
const postsContainer = document.querySelector("#posts-container");
const statusMessage = document.querySelector("#status-message");

// Display posts
export function renderPosts() {
  postsContainer.innerHTML = "";

  if (posts.length === 0) {
    statusMessage.textContent = "No posts found.";
    return;
  }

  statusMessage.textContent = `${posts.length} posts found.`;

  posts.forEach((post) => {
    const card = document.createElement("article");

    card.className =
      "bg-white p-6 rounded-xl shadow-md border border-gray-200";

    const title = document.createElement("h3");
    title.className = "text-xl font-bold text-blue-700 mb-3";
    title.textContent = post.title;

    const body = document.createElement("p");
    body.className = "text-gray-600 mb-4";
    body.textContent = post.body;

    const user = document.createElement("p");
    user.className = "text-sm text-gray-400";
    user.textContent = `User ID: ${post.userId}`;

    card.append(title, body, user);
    postsContainer.appendChild(card);
  });
}

// Fetch posts from API
export async function loadPosts(userId = "") {
  statusMessage.textContent = "Loading posts...";
  postsContainer.innerHTML = "";

  try {
    posts = await api.getPosts(userId);
    renderPosts();
  } catch (error) {
    statusMessage.textContent =
      "Failed to load posts. Please try again.";

    console.error("Error loading posts:", error);
  }
}
