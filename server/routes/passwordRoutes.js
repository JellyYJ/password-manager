const express = require("express");
const router = express.Router();
const db = require("../db");
const { encrypt, decrypt } = require("../utils/encryption");

// Add new password
router.post("/addpassword", (req, res) => {
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
        return res.status(500).send("Error inserting password");
      }
      res.send("Success");
    }
  );
});

// Get all passwords
router.get("/getpasswords", (req, res) => {
  const query = "SELECT * FROM passwords";
  db.query(query, (err, result) => {
    if (err) {
      console.error("Error retrieving passwords:", err);
      return res.status(500).send("Error retrieving passwords");
    }
    res.send(result);
  });
});

// Edit a password
router.put("/updatepassword/:id", (req, res) => {
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
        return res.status(500).send("Error updating password");
      }
      res.send("Password updated successfully");
    }
  );
});

// Delete a password
router.delete("/deletepassword/:id", (req, res) => {
  const passwordId = req.params.id;
  const query = "DELETE FROM passwords WHERE id = ?";
  db.query(query, [passwordId], (err) => {
    if (err) {
      console.error("Error deleting password:", err);
      return res.status(500).send("Error deleting password");
    }
    res.send("Password deleted successfully");
  });
});

// Decrypt password
router.post("/decryptpassword", (req, res) => {
  try {
    const decryptedPassword = decrypt(req.body);
    res.send(decryptedPassword);
  } catch (err) {
    console.error("Error in decryptpassword route: ", err);
    res.status(500).send("Error decrypting password");
  }
});

module.exports = router;
