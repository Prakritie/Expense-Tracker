const Summary = ({ expenses }) => {
  const total = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);

  const byCategory = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + Number(exp.amount);
    return acc;
  }, {});

  const sorted = Object.entries(byCategory).sort((a, b) => b[1] - a[1]);

  return (
    <div className="card summary-card">
      <h2>Summary</h2>

      <div className="total-box">
        <p className="total-label">Total Spent</p>
        <p className="total-amount">Rs {total.toFixed(2)}</p>
        <p className="total-count">{expenses.length} expense{expenses.length !== 1 ? "s" : ""}</p>
      </div>

      {sorted.length > 0 && (
        <div className="category-breakdown">
          <h3>By Category</h3>
          {sorted.map(([category, amount]) => {
            const percentage = total > 0 ? (amount / total) * 100 : 0;
            return (
              <div key={category} className="category-row">
                <div className="category-row-top">
                  <span className="cat-name">{category}</span>
                  <span className="cat-amount">${amount.toFixed(2)}</span>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: `${percentage}%` }} />
                </div>
                <p className="cat-percent">{percentage.toFixed(1)}%</p>
              </div>
            );
          })}
        </div>
      )}

      {expenses.length === 0 && (
        <p className="empty-msg">Add expenses to see your summary.</p>
      )}
    </div>
  );
};

export default Summary;
