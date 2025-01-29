// src/components/FriendList.jsx
import React, { useEffect, useState } from "react";
import { getFriendRequests } from "../services/api";

const FriendList = () => {
  const [friends, setFriends] = useState([]);

  const fetchFriends = async () => {
    try {
      const data = await getFriendRequests(); // Replace with an API to fetch friends
      setFriends(data.filter((request) => request.status === "accepted"));
    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  return (
    <div>
      <h2>Friend List</h2>
      <ul>
        {friends.map((friend) => (
          <li key={friend._id}>
            {friend.from.name} ({friend.from.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendList;
