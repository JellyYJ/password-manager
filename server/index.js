const express = require("express");
const app = express();
const port = 3000;
const mysql = require("mysql");
const cors = require("cors");

const { encrypt, decrypt } = require("./utils/encryption");

app.use(cors());
app.use(express.json());

// MySQL Connection Configuration
let dbConfig = {
  user: process.env.DB_USER || "root",
  host: process.env.DB_HOST || "localhost",
  password: process.env.DB_PASSWORD || "sqlpassword",
  database: process.env.DB_DATABASE || "password_manager",
};
const db = mysql.createConnection(dbConfig);

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to MySQL database");
  createDatabaseIfNotExists();
});

// Create db if not existing
function createDatabaseIfNotExists() {
  db.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`, (err) => {
    if (err) {
      console.error("Error creating database:", err);
      return;
    }
    console.log(`Database ${dbConfig.database} ready.`);

    // Use the created database
    db.query(`USE ${dbConfig.database}`, (err) => {
      if (err) {
        console.error("Error using database:", err);
        return;
      }
      console.log(`Using database ${dbConfig.database}`);
      createTables();
    });
  });
}
// Function to create tables if they do not exist
function createTables() {
  const query = `
    CREATE TABLE IF NOT EXISTS passwords (
      id INT AUTO_INCREMENT PRIMARY KEY,
      password VARCHAR(255) NOT NULL,
      username VARCHAR(255) NOT NULL,
      website VARCHAR(255) NOT NULL,
      iv VARCHAR(255) NOT NULL,
      \`key\` VARCHAR(255) NOT NULL
    )
  `;
  db.query(query, (err) => {
    if (err) {
      console.error("Error creating table:", err);
      return;
    }
    console.log("Table 'passwords' created or already exists");
  });
}

/* Routing */
// Add new password
app.post("/addpassword", (req, res) => {
  const { password, username, website } = req.body;
  const encryption = encrypt(password);
  const query =
    "INSERT INTO passwords (password, username, website, iv, `key`) VALUES (?, ?, ?, ?, ?)";
  db.query(
    query,
    [encryption.password, username, website, encryption.iv, encryption.key],
    (err, result) => {
      if (err) {
        console.error("Error inserting password:", err);
        res.status(500).send("Error inserting password");
      } else {
        res.send("Success");
      }
    }
  );
});

// Add all password
app.get("/getpasswords", (req, res) => {
  const query = "SELECT * FROM passwords";
  db.query(query, (err, result) => {
    if (err) {
      console.error("Error retrieving passwords:", err);
      res.status(500).send("Error retrieving passwords");
    } else {
      res.send(result);
    }
  });
});

// Edit a password
app.put("/updatepassword/:id", (req, res) => {
  const passwordId = req.params.id;
  const { password, username, website } = req.body;
  const encryption = encrypt(password);
  const query =
    "UPDATE passwords SET password = ?, username = ?, website = ?, iv = ?, `key` = ? WHERE id = ?";
  db.query(
    query,
    [
      encryption.password,
      username,
      website,
      encryption.iv,
      encryption.key,
      passwordId,
    ],
    (err, result) => {
      if (err) {
        console.error("Error updating password:", err);
        res.status(500).send("Error updating password");
      } else {
        res.send("Password updated successfully");
      }
    }
  );
});

// Delete a password
app.delete("/deletepassword/:id", (req, res) => {
  const passwordId = req.params.id;
  const query = "DELETE FROM passwords WHERE id = ?";
  db.query(query, [passwordId], (err) => {
    if (err) {
      console.error("Error deleting password:", err);
      res.status(500).send("Error deleting password");
    } else {
      res.send("Password deleted successfully");
    }
  });
});

// Get a password by website

// Decrypt password
app.post("/decryptpassword", (req, res) => {
  try {
    const decryptedPassword = decrypt(req.body);
    res.send(decryptedPassword);
  } catch (err) {
    console.error("Error in decryptpassword route: ", err);
    res.status(500).send("Error decrypting password");
  }
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
