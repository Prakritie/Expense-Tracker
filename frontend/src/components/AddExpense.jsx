import { useState } from "react";

const CATEGORIES = ["Food", "Transport", "Shopping", "Health", "Entertainment", "Bills", "Other"];

const AddExpense = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !amount || !date) {
      setError("Please fill in all fields.");
      return;
    }
    if (Number(amount) <= 0) {
      setError("Amount must be greater than 0.");
      return;
    }

    setError("");
    await onAdd({ title, amount, category, date });

    setTitle("");
    setAmount("");
    setCategory("Food");
    setDate(new Date().toISOString().split("T")[0]);
  };

  return (
    <div className="card">
      <h2>Add New Expense</h2>
      {error && <p className="error-msg">{error}</p>}

      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            placeholder="e.g. Grocery shopping"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Amount (Rs.)</label>
          <input
            type="number"
            placeholder="0.00"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <button type="submit" className="btn-primary">+ Add Expense</button>
      </form>
    </div>
  );
};

export default AddExpense;
