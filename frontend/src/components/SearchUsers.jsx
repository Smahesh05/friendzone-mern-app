// src/components/SearchUsers.jsx
import React, { useState } from "react";
import { searchUsers, sendFriendRequest } from "../services/api";

const SearchUsers = () => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);

  const handleSearch = async () => {
    if (!query) return;
    try {
      const data = await searchUsers(query);
      setUsers(data);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  const handleSendRequest = async (userId) => {
    try {
      await sendFriendRequest(userId);
      alert("Friend request sent!");
    } catch (error) {
      console.error("Error sending friend request:", error);
    }
  };

  return (
    <div>
      <h2>Search Users</h2>
      <input
        type="text"
        placeholder="Search by name or email"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} ({user.email})
            <button onClick={() => handleSendRequest(user._id)}>
              Send Request
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchUsers;
