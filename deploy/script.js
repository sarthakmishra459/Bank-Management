class BankAccount {
    constructor(accountHolder, accountType) {
        this.accountHolder = accountHolder;
        this.accountType = accountType;
        this.balance = 0; // Initial balance
    }

    deposit(amount) {
        if (isNaN(amount) || amount <= 0) {
            throw new Error("Invalid amount");
        }
        this.balance += amount;
    }

    withdraw(amount) {
        if (isNaN(amount) || amount <= 0) {
            throw new Error("Invalid amount");
        }
        if (amount > this.balance) {
            throw new Error("Insufficient funds");
        }
        this.balance -= amount;
    }

    checkBalance() {
        return this.balance;
    }
}

// Create a Map to store account information
const accountsMap = new Map();

// DOM elements
const accountSelect = document.getElementById('account-select');
const addAccountBtn = document.getElementById('add-account-btn');
const balanceElement = document.getElementById('balance');
const accountTypeElement = document.getElementById('account-type');
const depositButton = document.getElementById('deposit-btn');
const withdrawButton = document.getElementById('withdraw-btn');
const amountInput = document.getElementById('amount');
const resultElement = document.getElementById('result');

// Add Account button click event listener
addAccountBtn.addEventListener('click', () => {
    const newAccountName = prompt('Enter the account holder\'s name:');
    if (newAccountName) {
        const newAccountId = newAccountName.toLowerCase().replace(' ', '-');
        const accountType = prompt('Enter the account type:');
        const initialBalance = parseFloat(prompt('Enter initial balance:'));
        if (isNaN(initialBalance) || initialBalance < 0) {
            alert('Invalid initial balance. Account not created.');
            return;
        }

        const newAccount = new BankAccount(newAccountName, accountType);
        newAccount.deposit(initialBalance);
        accountsMap.set(newAccountId, newAccount);

        // Add the new account to the dropdown
        const newOption = document.createElement('option');
        newOption.value = newAccountId;
        newOption.text = newAccountName;
        accountSelect.appendChild(newOption);

        alert(`Account "${newAccountName}" added successfully.`);
        updateAccountInfo(newAccount);
    }
});

// Handle account selection change
accountSelect.addEventListener('change', () => {
    const selectedAccountId = accountSelect.value;
    const selectedAccount = accountsMap.get(selectedAccountId);
    updateAccountInfo(selectedAccount);
});

// Update account information
function updateAccountInfo(account) {
    if (account) {
        balanceElement.textContent = account.checkBalance();
        accountTypeElement.textContent = account.accountType;
        resultElement.textContent = "";
    } else {
        // Clear account info if the selected account does not exist
        balanceElement.textContent = '';
        accountTypeElement.textContent = '';
        resultElement.textContent = '';
    }
}

// Deposit money
depositButton.addEventListener("click", () => {
    const amount = parseFloat(amountInput.value);
    const selectedAccountId = accountSelect.value;
    const selectedAccount = accountsMap.get(selectedAccountId);
    if (selectedAccount) {
        try {
            selectedAccount.deposit(amount);
            updateAccountInfo(selectedAccount);
        } catch (error) {
            resultElement.textContent = error.message;
        } finally {
            amountInput.value = "";
        }
    } else {
        alert('Please select an account.');
    }
});

// Withdraw money
withdrawButton.addEventListener("click", () => {
    const amount = parseFloat(amountInput.value);
    const selectedAccountId = accountSelect.value;
    const selectedAccount = accountsMap.get(selectedAccountId);
    if (selectedAccount) {
        try {
            selectedAccount.withdraw(amount);
            updateAccountInfo(selectedAccount);
        } catch (error) {
            resultElement.textContent = error.message;
        } finally {
            amountInput.value = "";
        }
    } else {
        alert('Please select an account.');
    }
});

// Initialize account information
updateAccountInfo(accountsMap.get(accountSelect.value));
