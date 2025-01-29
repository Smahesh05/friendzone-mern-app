// src/pages/Home.jsx
import React from "react";
import FriendList from "../components/FriendList";
import FriendRequests from "../components/FriendRequests";
import SearchUsers from "../components/SearchUsers";

const ProfileScreen = () => {
  return (
    <div>
      <h1>Welcome to the Friend App</h1>
      <SearchUsers />
      <FriendRequests />
      <FriendList />
    </div>
  );
};

export default ProfileScreen;
