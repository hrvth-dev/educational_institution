const prisma = require("../config/prisma.js");

const getAllProfile = async (req, res) => {

    try {

        const users = await prisma.user.findMany({
            include: {
                enrollments: {
                    include: {
                        course: true
                    }
                }
            }
        });


        if (!users) {
            res.status(404).json({ message: "Nincs egy felhasználó sem!" });
        }

        return res.status(200).json({ message: "Sikeresen lekérdezted a profilokat!", data: users });


    }

    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Hiba történt a lekérdezés során!", err: err.message });
    }

}


const getProfile = async (req, res) => {

    try {

        const id = req.user.userId;

        const getUser = await prisma.user.findUnique({
            where: {
                id: id
            },

            include: {
                enrollments: {
                    include: {
                        course: true
                    }
                }
            }

        })


        return res.status(200).json({ message: "Sikeresen lekérdeztél egy profilt!", data: getUser });
    }

    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Hiba történt a lekérdezés során!", err: err.message });
    }

}


const updatedProfile = async (req, res) => {

    try {

        const id = req.user.userId;


        const user = await prisma.user.findUnique({
            where: {
                id: id,
            }
        })

        if (!user) {
            return res.status(404).json({ message: "Nincs ilyen felhasználó!" });
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: id
            },

            data: req.body

        })

        return res.status(200).json({ message: "Sikeresen frissíteted a felhasználó adatait!", user: updatedUser });

    }

    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Hiba történt a modosítás során!", err: err.message });
    }
};


const deletedProfile = async (req, res) => {
    try {

        const id = req.user.userId;

        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        })

        if (!user) {
            return res.status(404).json({ message: "Nincs ilyen felhasználó!" });
        }

        const deletedUser = await prisma.user.delete(
            {
                where: {
                    id: id
                }
            }
        );

        return res.status(200).json({ message: "Sikeresen törölted a felhasználót!" });

    }

    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Hiba történt a törlés során!", err: err.message });
    }

};



module.exports = { getProfile, updatedProfile, deletedProfile, getAllProfile };