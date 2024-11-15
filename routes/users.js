const express = require("express");
const router = express.Router();
const db = require("../database")
const { getAllUsers, createnewUser, updateUser, deleteUser } = require("../controllers/usersControllers")



// MÉTHODE GET
router.get("/users", getAllUsers)

// POST : créer un nouvel utilisateur
router.post("/users", createnewUser);

// PUT : modifier un utilisateur par ID
router.put("/:id", updateUser);

// DELETE : supprimer un utilisateur par ID
router.delete("/:id", deleteUser);

// GET : lire un utilisateur par ID
router.get("/:id", (req, res) => {
	const id = parseInt(req.params.id);
	const userIndex = users.findIndex((user) => user.id === id);

	// Vérifie si l'utilisateur existe
	if (userIndex < 0) {
		return res.status(404).json({ msg: "utilisateur non trouvé" });
	}

	// Renvoie l'utilisateur trouvé
	res.json(users[userIndex]);
});


module.exports = router;
