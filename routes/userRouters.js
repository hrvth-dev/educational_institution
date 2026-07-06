
const express = require("express");
const router = express.Router();
const { getProfile, updatedProfile, deletedProfile, getAllProfile} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/profiles", getAllProfile )
router.get("/profile",  authMiddleware, getProfile);
router.put("/profile", authMiddleware, updatedProfile);
router.delete("/profile", authMiddleware, deletedProfile);




module.exports = router;

