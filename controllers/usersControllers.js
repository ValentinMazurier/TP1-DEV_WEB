const db = require("../database")


exports.getAllUsers = function (req, res) {
	db.all("SELECT * FROM users", [], (err, rows) => {
		if (err) {
			res.status(500).json({ error: err.message })
		} else {
			res.json(rows)
		}
	})
}



exports.createnewUser = (req, res) => {
	const { firstName, lastName } = req.body



    // regex pour alphanumérique seulement
function isAlphanumeric(str) {
    const regex = /^[a-zA-Z0-9]+$/
    return regex.test(str)
}

    if(!firstName) return res.status(400).json({error: "The first name is required !"})

    if (typeof firstName!=="string")
        return res.status(400).json({error: "That's a weird name !"})

    if (!isAlphanumeric(firstName))
		return res.status(400).json({ error: "Ce nom n'est pas autorisé !" })

    if (!firstName || !lastName)
		return res
			.status(400)
			.json({ error: "Le prénom et le nom de famille sont requis !" })



        //run SQL query here
        db.run(
            "INSERT INTO users (firstName, lastName) VALUES (?, ?)",
            [firstName, lastName],
            function (err){
                if (err){
                    res.status(500).json({error: err.message})
                } else {
                    res.status(201).json({id :this.lastID, firstName})
                }
            }
        )
}