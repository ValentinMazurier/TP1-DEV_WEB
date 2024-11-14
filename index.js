const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Liste d'utilisateurs pour notre API
const users = [
	{ id: 1, firstName: "John", lastName: "Doe", role: "admin" },
	{ id: 2, firstName: "Jane", lastName: "Smith", role: "user" },
	{ id: 3, firstName: "Alice", lastName: "Johnson", role: "moderator" },
	{ id: 4, firstName: "Bob", lastName: "Brown", role: "user" },
	{ id: 5, firstName: "Charlie", lastName: "Davis", role: "admin" },
];

// GET : lire tous les utilisateurs
app.get("/", (req, res) => {
	res.json(users);
});

// POST : créer un nouvel utilisateur
app.post("/", (req, res) => {
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
app.put("/:id", (req, res) => {
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

// DELETE : supprimer un utilisateur (à définir plus tard, placeholder pour l'instant)
app.delete("/", (req, res) => {
	res.json({
		msg: "hello rest api ici le DELETE",
	});
});

// Démarre le serveur
app.listen(port, () => {
	console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
