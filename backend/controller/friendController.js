// controllers/friendController.js
const FriendRequest = require("../model/friendRequestModel");
const User = require("../model/userModel");

const sendFriendRequest = async (req, res) => {
  const { to } = req.body;
  const from = req.user.id;

  try {
    // Check if a request already exists
    const existingRequest = await FriendRequest.findOne({ from, to });
    if (existingRequest) {
      return res.status(400).json({ message: "Friend request already sent" });
    }

    // Create a new friend request
    const friendRequest = new FriendRequest({ from, to });
    await friendRequest.save();

    res.status(201).json({ message: "Friend request sent", friendRequest });
  } catch (error) {
    res.status(500).json({ message: "Error sending friend request", error });
  }
};

const getFriendRequests = async (req, res) => {
  const userId = req.user.id;

  try {
    const requests = await FriendRequest.find({ to: userId, status: "pending" })
      .populate("from", "name email") // Populate sender details
      .select("-to");

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: "Error fetching friend requests", error });
  }
};

const respondToFriendRequest = async (req, res) => {
  const { requestId } = req.params;
  const { status } = req.body;

  try {
    const request = await FriendRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    if (status === "accepted") {
      // Add each user to the other's friends list
      await User.findByIdAndUpdate(request.from, {
        $addToSet: { friends: request.to },
      });
      await User.findByIdAndUpdate(request.to, {
        $addToSet: { friends: request.from },
      });
    }

    // Update the request status
    request.status = status;
    await request.save();

    res.status(200).json({ message: `Friend request ${status}`, request });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error responding to friend request", error });
  }
};

module.exports = {
  sendFriendRequest,
  getFriendRequests,
  respondToFriendRequest,
};
