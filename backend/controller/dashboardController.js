const FriendRequest = require("../model/FriendRequestModel");

const sendRequest = async (req, res) => {
  const { toUserId } = req.body;

  const existingRequest = await FriendRequest.findOne({
    from: req.user.id,
    to: toUserId,
  });
  if (existingRequest)
    return res.status(400).json({ message: "Request already exists" });

  const request = await FriendRequest.create({
    from: req.user.id,
    to: toUserId,
  });
  res.status(201).json(request);
};

module.exports = sendRequest;
