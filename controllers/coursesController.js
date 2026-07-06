const prisma = require("../config/prisma.js");


const craeteCourses = async (req, res) => {

    try {

        const { name, description, lessonCount, startDate, endDate, lessonLength, maxStudents } = req.body;

        const id = req.user.userId;


        const course = await prisma.course.create({
            data: {
                name,
                description,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                lessonCount,
                lessonLength,
                maxStudents,

                creatorId: id


            }
        });


        return res.json({ message: "Sikeresen létrehoztad a kurzust!", data: course })

    }

    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Hiba történt a létrehozás során!", err: err.message });
    }

}



const getCourse = async (req, res) => {

    try {

        const id = req.user.userId;

        const course = await prisma.course.findMany({
            where: {
                creatorId: id
            }
        })


        if (course.length === 0) {
            return res.status(404).json({
                message: "Nem található egy kurzus sem!"
            });
        }


        res.status(200).json({ message: "Sikeresen lekérted a kurzust!", data: course });
    }

    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Hiba történt a lekérdezés során!" })
    }

}


const getAllCourses = async (req, res) => {

    try {

        const courses = await prisma.course.findMany();

        if (courses.length == 0) {
            return res.status(404).json({ message: "Nem található egy kurzus sem!" });
        }


        return res.json({ message: "Sikeresen lekérdezted a kurzusokat!", data: courses });
    }

    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Hiba történt a lekérdezés során!", error: err.message });
    }

}

module.exports = { craeteCourses, getAllCourses, getCourse };