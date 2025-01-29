// src/components/FriendRequests.jsx
import React, { useEffect, useState } from "react";
import { getFriendRequests, respondToFriendRequest } from "../services/api";

const FriendRequests = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const data = await getFriendRequests();
      setRequests(data);
    } catch (error) {
      console.error("Error fetching friend requests:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleRespond = async (requestId, status) => {
    try {
      await respondToFriendRequest(requestId, status);
      alert(`Friend request ${status}`);
      fetchRequests(); // Refresh the list
    } catch (error) {
      console.error("Error responding to friend request:", error);
    }
  };

  return (
    <div>
      <h2>Friend Requests</h2>
      <ul>
        {requests.map((request) => (
          <li key={request._id}>
            {request.from.name} ({request.from.email})
            <button onClick={() => handleRespond(request._id, "accepted")}>
              Accept
            </button>
            <button onClick={() => handleRespond(request._id, "rejected")}>
              Reject
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendRequests;
