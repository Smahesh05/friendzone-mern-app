const express = require("express");
const {
  registerUser,
  loginUser,
  getMe,
  searchUsers,
} = require("../controller/userController");
const { protect } = require("../middleware/authMiddleware");
const {
  sendFriendRequest,
  getFriendRequests,
  respondToFriendRequest,
} = require("../controller/friendController");

const router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);

router.get("/search", protect, searchUsers);

router.post("/friends/request", protect, sendFriendRequest);
router.get("/friends/requests", protect, getFriendRequests);
router.put("/friends/request/:requestId", protect, respondToFriendRequest);

module.exports = router;
