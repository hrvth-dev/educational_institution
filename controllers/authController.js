const prisma = require("../config/prisma.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {

    try {

        const { username, email, password, firstName, lastName, phone } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const users = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                firstName,
                lastName,
                phone
            }
        })

        res.json({ message: "Sikeresen létrehoztál egy fiókot!" });

    }

    catch (err) {
        res.status(500).json({ message: "Hiba történt a lekérdezés során!" });
    }

}


const login = async (req, res) => {

    try {

        const { email, password } = req.body

        const user = await prisma.user.findUnique({
            where: { email },
        })

        if (!user) {
            res.status(404).json({ message: "Nem található ilyen felhasználó!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Hibás jelszó!" });
        }

        const token = jwt.sign({
            userId: user.id,
            email: user.email,
        },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )

        res.json({
            message: "Sikeres bejelentkezés!",
            token
        })


    }

    catch (err) {
        res.status(500).json({ message: "Hiba történt a lekérdezés során!" });
    }

}


module.exports = { register, login };