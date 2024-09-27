document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("transactionForm");
    const transactionList = document.getElementById("transactionList");
  
    // Fetch all transactions
    async function fetchTransactions() {
      try {
        const response = await fetch("http://localhost:5500/index");
        const transactions = await response.json();
  
        transactions.forEach(transaction => addTransactionToList(transaction));
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    }
  
    // Add a transaction to the list
    function addTransactionToList(transaction) {
      const li = document.createElement("li");
      li.textContent = `${transaction.name} - $${transaction.amount} on ${new Date(transaction.date).toLocaleDateString()}`;
      transactionList.appendChild(li);
    }
  
    // Handle form submission
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const name = form.name.value;
      const amount = form.amount.value;
      const date = form.date.value;
      const type = form.type.checked ? "Income" : "Expense";
  
      const data = {
        name,
        amount,
        date,
        type
      };
  
      try {
        const response = await fetch("http://localhost:5500/index", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });
  
        if (response.ok) {
          const newTransaction = await response.json();
          addTransactionToList(newTransaction);
          form.reset();
        } else {
          alert("Failed to add transaction.");
        }
      } catch (error) {
        console.error("Error adding transaction:", error);
      }
    });
  
    // Load existing transactions on page load
    fetchTransactions();
  });
  