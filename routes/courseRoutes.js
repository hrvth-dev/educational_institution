const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware.js")
const {craeteCourses, getAllCourses, getCourse} = require("../controllers/coursesController.js");



router.post("/courses", authMiddleware, craeteCourses);
router.get("/courses", authMiddleware, getAllCourses );
router.get("/course", authMiddleware, getCourse )


module.exports = router;