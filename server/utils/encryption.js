const crypto = require("crypto");

const algorithm = "aes-256-cbc"; // Encryption algorithm
// Generate random key and iv for encryption
const generateKeyAndIV = () => {
  return {
    key: crypto.randomBytes(32),
    iv: crypto.randomBytes(16),
  };
};

const encrypt = (password) => {
  try {
    const { key, iv } = generateKeyAndIV();
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const encryptedPassword = Buffer.concat([
      cipher.update(password, "utf8"),
      cipher.final(),
    ]);

    return {
      iv: iv.toString("hex"),
      password: encryptedPassword.toString("hex"),
      key: key.toString("hex"),
    };
  } catch (error) {
    console.error("Error encrypting password:", error);
    return null;
  }
};

const decrypt = (hash) => {
  try {
    const iv = Buffer.from(hash.iv, "hex");
    const key = Buffer.from(hash.key, "hex");
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    const decryptedPassword = Buffer.concat([
      decipher.update(Buffer.from(hash.password, "hex")),
      decipher.final(),
    ]);

    return decryptedPassword.toString("utf8");
  } catch (error) {
    console.error("Error decrypting password:", error);
    return null;
  }
};

module.exports = { encrypt, decrypt };
