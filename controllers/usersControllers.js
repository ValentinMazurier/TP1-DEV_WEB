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

    if(!firstName) return res.status(400).json({error: "The first name is required !"})

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