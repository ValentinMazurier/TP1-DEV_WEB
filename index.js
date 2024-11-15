const express = require('express');
const app = express();
const port = 3000;
const usersRouter = require("./routes/users.js")

//MIDDLEWARE
app.use(express.json())
//users endpoint
app.use("/api/", usersRouter)

// GET : lire tous les utilisateurs
app.get("/", (req, res) => {
	res.json({
		msg: "welcome to my users API !!!"
	});
});

// Démarre le serveur
app.listen(port, () => {
	console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
