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


        if(!users){
            res.status(404).json({message: "Nincs egy felhasználó sem!"});
        }

        res.json(users);


    }

    catch (err) {
        res.status(500).json({ message: "Hiba történt a lekérdezés során!" });
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


        res.json({ data: getUser });
    }

    catch (err) {
        res.status(500).json({ message: "Hiba történt a lekérdezés során!" });
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

        res.json({ message: "Sikeresen frissíteted a felhasználó adatait!", user: updatedUser });

    }

    catch (err) {
        res.status(500).json({ message: "Hiba történt a lekérdezés során!" });
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

        res.json({ message: "Sikeresen törölted a felhasználót!" });

    }

    catch (err) {
        res.status(500).json({ message: "Hiba történt a lekérdezés során!" });
    }

};



module.exports = { getProfile, updatedProfile, deletedProfile, getAllProfile};