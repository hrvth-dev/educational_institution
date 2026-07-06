const express = require("express");

const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const prisma = require("../backend/config/prisma.js");
const authRouter = require("../backend/routes/authRoutes.js");
const userRouter = require("../backend/routes/userRouters.js");
const coursesRouter = require("../backend/routes/courseRoutes.js");

dotenv.config();


app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api", coursesRouter);



app.get("/", (req, res) => {
    res.status(200).json({message: "Course API is running."})
})


app.listen(process.env.PORT, () => {
    console.log("Szerver elindult!")
} );