const CATEGORY_COLORS = {
  Food: "#f97316",
  Transport: "#3b82f6",
  Shopping: "#a855f7",
  Health: "#22c55e",
  Entertainment: "#ec4899",
  Bills: "#ef4444",
  Other: "#6b7280",
};

const ExpenseList = ({ expenses, onDelete, filterCategory, onFilterChange }) => {
  const filtered =
    filterCategory === "All"
      ? expenses
      : expenses.filter((exp) => exp.category === filterCategory);

  const categories = ["All", ...new Set(expenses.map((e) => e.category))];

  return (
    <div className="card">
      <div className="list-header">
        <h2>My Expenses</h2>
        <select
          value={filterCategory}
          onChange={(e) => onFilterChange(e.target.value)}
          className="filter-select"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="empty-msg">No expenses yet. Add one above! 👆</p>
      ) : (
        <ul className="expense-list">
          {filtered.map((expense) => (
            <li key={expense.id} className="expense-item">
              <div className="expense-info">
                <span
                  className="category-badge"
                  style={{ backgroundColor: CATEGORY_COLORS[expense.category] || "#6b7280" }}
                >
                  {expense.category}
                </span>
                <div>
                  <p className="expense-title">{expense.title}</p>
                  <p className="expense-date">{expense.date}</p>
                </div>
              </div>

              <div className="expense-right">
                <span className="expense-amount">${Number(expense.amount).toFixed(2)}</span>
                <button className="btn-delete" onClick={() => onDelete(expense.id)}>🗑</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpenseList;
