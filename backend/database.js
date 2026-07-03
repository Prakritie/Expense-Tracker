const sqlite3 = require("sqlite3").verbose();
 
const db = new sqlite3.Database("expenses.db", (err) => {
  if (err) console.error("DB Error:", err.message);
  else console.log("Database connected!");
});
 
db.run(`
  CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    amount REAL NOT NULL,
    category TEXT NOT NULL,
    date TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);
 
module.exports = db;