// Financial Data
let capital = 0;
let expenses = 0;
let netBalance = 0;
let transactionLog = [];

// Login Function
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginError = document.getElementById('login-error');

    // Hardcoded user credentials
    if (username === 'admin' && password === 'Atipoka') {
        displayDashboard('Atipoka', 'admin');
    } else if (username === 'barManager' && password === 'barPass') {
        displayDashboard('Bar Manager', 'barManager');
    } else {
        loginError.textContent = 'Invalid credentials. Please try again.';
    }
}

// Display Dashboard based on User Role
function displayDashboard(role, userType) {
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('dashboard-page').style.display = 'block';
    document.getElementById('role-welcome').textContent = `Welcome, ${role}!`;

    if (userType === 'admin') {
        document.getElementById('atipoka-section').style.display = 'block';
    } else if (userType === 'barManager') {
        document.getElementById('bar-manager-section').style.display = 'block';
    }
}

// Manage Deposits and Withdrawals (Atipoka)
function manageTransaction() {
    const transactionType = document.getElementById('transaction-type').value;
    const amount = parseFloat(document.getElementById('transaction-amount').value);

    if (!isNaN(amount) && amount > 0) {
        if (transactionType === 'deposit') {
            capital += amount;
        } else if (transactionType === 'withdrawal') {
            netBalance -= amount;
        }
        updateFinancialSummary();
        logTransaction(transactionType, amount);
    }
}

// Manage Expenses and Payments (Bar Manager)
function manageExpense() {
    const expenseType = document.getElementById('expense-type').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);

    if (!isNaN(amount) && amount > 0) {
        if (expenseType === 'expense') {
            expenses += amount;
        } else if (expenseType === 'payment') {
            netBalance -= amount;
        }
        updateFinancialSummary();
        logTransaction(expenseType, amount);
    }
}

// Update Financial Summary
function updateFinancialSummary() {
    netBalance = capital - expenses;
    document.getElementById('capital').textContent = capital.toFixed(2);
    document.getElementById('expenses').textContent = expenses.toFixed(2);
    document.getElementById('net-balance').textContent = netBalance.toFixed(2);
}

// Log Transactions
function logTransaction(type, amount) {
    const logEntry = `${capitalizeFirstLetter(type)} of $${amount.toFixed(2)}`;
    transactionLog.push(logEntry);

    const logElement = document.createElement('li');
    logElement.textContent = logEntry;
    document.getElementById('transaction-log').appendChild(logElement);
}

// Capitalize first letter of transaction type for display
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
