import { useState, useEffect } from "react";
import axios from "axios";
import AddExpense from "./components/AddExpense";
import ExpenseList from "./components/ExpenseList";
import Summary from "./components/Summary";
import "./App.css";

const API = "http://localhost:3001/api";

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState("All");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get(`${API}/expenses`);
      setExpenses(res.data);
    } catch (err) {
      setError("Could not load expenses. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (data) => {
    try {
      const res = await axios.post(`${API}/expenses`, data);
      setExpenses([res.data, ...expenses]);
      setError("");
    } catch (err) {
      setError("Failed to add expense.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this expense?")) return;
    try {
      await axios.delete(`${API}/expenses/${id}`);
      setExpenses(expenses.filter((e) => e.id !== id));
      setError("");
    } catch (err) {
      setError("Failed to delete expense.");
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Expense Tracker</h1>
        <p>Track your daily spending easily</p>
      </header>

      {error && (
        <div className="error-banner">
          ⚠️ {error}
          <button onClick={() => setError("")} className="dismiss-btn">✕</button>
        </div>
      )}

      <main className="app-content">
        <div className="left-column">
          <AddExpense onAdd={handleAdd} />
          {loading ? (
            <div className="card"><p className="empty-msg">Loading...</p></div>
          ) : (
            <ExpenseList
              expenses={expenses}
              onDelete={handleDelete}
              filterCategory={filterCategory}
              onFilterChange={setFilterCategory}
            />
          )}
        </div>
        <div className="right-column">
          <Summary expenses={expenses} />
        </div>
      </main>
    </div>
  );
};

export default App;
