const mysql = require("mysql");

const dbConfig = {
  user: process.env.DB_USER || "root",
  host: process.env.DB_HOST || "localhost",
  password: process.env.DB_PASSWORD || "sqlpassword",
  database: process.env.DB_DATABASE || "password_manager",
};

const db = mysql.createConnection(dbConfig);

db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  createDatabaseIfNotExists();
});

function createDatabaseIfNotExists() {
  db.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`, (err) => {
    if (err) {
      console.error("Error creating database:", err);
      return;
    }
    console.log(`Database ${dbConfig.database} ready.`);

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

module.exports = db;
