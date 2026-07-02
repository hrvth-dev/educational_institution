const express = require("express");

const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const prisma = require("../backend/config/prisma.js");
const authRouter = require("../backend/routes/authRoutes.js");


dotenv.config();


app.use(express.json());
app.use(cors());
app.use("/api", authRouter);


app.get("/", (req, res) => {
    res.status(200).json({message: "Course API is running."})
})


app.listen(process.env.PORT, () => {
    console.log("Szerver elindult!")
} );