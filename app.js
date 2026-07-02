const express = require("express");

const app = express();
const cors = require("cors");
const dotenv = require("dotenv");


dotenv.config();


app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
    res.status(200).json({message: "Course API is running."})
})


app.listen(process.env.PORT, () => {
    console.log("Szerver elindult!")
} );