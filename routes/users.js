const express = require("express");
const router = express.Router();


const UsersArray = [
	{ id: 1, firstName: "John", lastName: "Doe", role: "admin" },
	{ id: 2, firstName: "Jane", lastName: "Smith", role: "user" },
	{ id: 3, firstName: "Alice", lastName: "Johnson", role: "moderator" },
	{ id: 4, firstName: "Bob", lastName: "Brown", role: "user" },
	{ id: 5, firstName: "Charlie", lastName: "Davis", role: "admin" },
];
router.get("/users", (req, res) => {
    res.json(UsersArray);
});

// POST : créer un nouvel utilisateur
router.post("/", (req, res) => {
	const { firstName, lastName } = req.body;

	const lastId = users[users.length - 1].id;
	const newId = lastId + 1;

	const newUser = {
		id: newId,
		firstName,
		lastName,
		role: "user",  // Optionnel, si vous souhaitez assigner un rôle par défaut
	};

	users.push(newUser);
	res.status(201).json(newUser);
});

// PUT : modifier un utilisateur par ID
router.put("/:id", (req, res) => {
	const id = parseInt(req.params.id);
	const userIndex = users.findIndex((user) => user.id === id);

	// Vérifie si l'utilisateur existe
	if (userIndex < 0) {
		return res.status(404).json({ msg: "utilisateur non trouvé" });
	}

	// Met à jour les informations de l'utilisateur si elles sont fournies
	const { firstName, lastName } = req.body;

	if (firstName) users[userIndex].firstName = firstName;
	if (lastName) users[userIndex].lastName = lastName;

	res.json({
		msg: "utilisateur mis à jour",
		user: users[userIndex],
	});
});

// DELETE : supprimer un utilisateur par ID
router.delete("/:id", (req, res) => {
	const id = parseInt(req.params.id);
	const userIndex = users.findIndex((user) => user.id === id);

	// Vérifie si l'utilisateur existe
	if (userIndex < 0) {
		return res.status(404).json({ msg: "utilisateur non trouvé" });
	}

	// Supprime l'utilisateur de la liste
	users.splice(userIndex, 1);

	res.json({
		msg: "utilisateur supprimé",
	});
});

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