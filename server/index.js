const express = require("express");
const app = express();
const port = 3000;
const mysql = require("mysql");
const cors = require("cors");

const { encrypt, decrypt } = require("./utils/encryption");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "sqlpassword",
  database: "password_manager",
});

// Routing
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
