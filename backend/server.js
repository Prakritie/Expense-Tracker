
const express = require("express");
const cors = require("cors");
const db = require("./database");
 
const app = express();
const PORT = 3001;
 
app.use(cors());
app.use(express.json());
 
// Get all expenses
app.get("/api/expenses", (req, res) => {
  db.all("SELECT * FROM expenses ORDER BY date DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});
 
// Add a new expense
app.post("/api/expenses", (req, res) => {
  const { title, amount, category, date } = req.body;
 
  if (!title || !amount || !category || !date) {
    return res.status(400).json({ error: "All fields are required" });
  }
 
  db.run(
    "INSERT INTO expenses (title, amount, category, date) VALUES (?, ?, ?, ?)",
    [title, Number(amount), category, date],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      db.get("SELECT * FROM expenses WHERE id = ?", [this.lastID], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json(row);
      });
    }
  );
});
 
// Delete an expense
app.delete("/api/expenses/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM expenses WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "Expense not found" });
    res.json({ message: "Deleted", id: Number(id) });
  });
});
 
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});