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

exports.deleteUser = (req, res) => {
	// get the id from the params
	const { id } = req.params
	// run the query
	db.run("DELETE FROM users WHERE id = ?", [id], function (err) {
		if (err) {
			res.status(500).json({ error: err.message })
		} else if (this.changes === 0) {
			// if nothing found
			res.status(404).json({ message: "User not found" })
		} else {
			// is successful
			res.status(200).json({ message: "User deleted !" })
		}
	})
}

// POST mise à jour d'un utilisateur en fonction de son ID
exports.updateUser = (req, res) => {
	const { firstName, lastName } = req.body

	// Récupérer l'id des paramètres
	const userId = req.params.id

	// Vérifier les champs envoyés
	let updateFields = []
	let queryParams = []

	if (firstName) {
		updateFields.push("firstName = ?")
		queryParams.push(firstName)
	}

	if (lastName) {
		updateFields.push("lastName = ?")
		queryParams.push(lastName)
	}

	if (updateFields.length > 0) {
		// Ajouter userId aux paramètres de la requête
		queryParams.push(userId)

		// Construire la requête dynamiquement
		const query = `UPDATE users SET ${updateFields.join(", ")} WHERE id = ?`

		db.run(query, queryParams, function (err) {
			if (err) {
				res.status(500).json({ error: err.message })
			} else if (this.changes === 0) {
				res.status(404).json({ message: "Utilisateur non trouvé" })
			} else {
				res.json({ msg: "Utilisateur mis à jour", userId, firstName, lastName })
			}
		})
	} else {
		res.status(400).json({ message: "Aucun champ à mettre à jour" })
	}
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