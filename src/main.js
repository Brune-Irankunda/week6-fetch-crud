
import "./style.css";
import { loadPosts } from "./posts.js";

// Select the user filter
const userFilter = document.querySelector("#user-filter");

// Load posts when the application starts
loadPosts();

// Filter posts when the user changes
userFilter.addEventListener("change", () => {
  const selectedUser = userFilter.value;

  loadPosts(selectedUser);
});
