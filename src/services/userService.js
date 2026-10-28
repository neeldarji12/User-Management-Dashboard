const API_URL = "https://jsonplaceholder.typicode.com/users";

// Get all users
export async function getUsers() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch users. Please try again.");
  }

  const users = await response.json();

  return users;
}

// Get one user by ID
export async function getUserById(id) {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch user details.");
  }

  const user = await response.json();

  // A missing user can return an empty object from some APIs.
  if (!user || !user.id) {
    throw new Error("User not found.");
  }

  return user;
}