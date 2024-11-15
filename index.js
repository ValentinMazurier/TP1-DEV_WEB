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

const sqlite3 = require("sqlite3").verbose()

// Open the database connection
const db = new sqlite3.Database("./users.db", (err) => {
	if (err) {
		console.error("Error opening database:", err.message)
	} else {
		console.log("Connected to the SQLite database.")

		// Create the items table if it doesn't exist
		db.run(
			`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL
      )`,
			(err) => {
				if (err) {
					console.error("Error creating table:", err.message)
				}
			}
		)
	}
})

module.exports = db

// Démarre le serveur
app.listen(port, () => {
	console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
