let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

const categorySelect = document.getElementById("category-select");
const amountInput = document.getElementById("amount-input");
const dateInput = document.getElementById("date-input");
const addBtn = document.getElementById("add-btn");

const tableBody = document.getElementById("expense-table-body");
const totalAmount = document.getElementById("total-amount");
const expenseCount = document.getElementById("expense-count");
const emptyMessage = document.getElementById("empty-message");
const message = document.getElementById("message");

const themeBtn = document.getElementById("theme-btn");



dateInput.value = new Date().toISOString().split("T")[0];



addBtn.addEventListener("click", function () {

    const category = categorySelect.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    if (category === "") {
        showMessage("Please select a category.", "red");
        return;
    }

    if (amount <= 0 || isNaN(amount)) {
        showMessage("Please enter a valid amount.", "red");
        return;
    }

    if (date === "") {
        showMessage("Please select a date.", "red");
        return;
    }

    const expense = {
        id: Date.now(),
        category: category,
        amount: amount,
        date: date
    };

    expenses.push(expense);

    saveExpenses();
    displayExpenses();

    amountInput.value = "";
    categorySelect.value = "";
    dateInput.value = new Date().toISOString().split("T")[0];

    showMessage("Expense added successfully!", "green");
});


function displayExpenses() {

    tableBody.innerHTML = "";

    if (expenses.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }

    expenses.forEach(function (expense) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${expense.category}</td>
            <td>₹${expense.amount.toLocaleString("en-IN")}</td>
            <td>${expense.date}</td>
            <td>
                <button class="delete-btn" onclick="deleteExpense(${expense.id})">
                    Delete
                </button>
            </td>
        `;

        tableBody.appendChild(row);
    });

    updateTotal();
    updateSummary();
    updateCount();
}


function deleteExpense(id) {

    expenses = expenses.filter(function (expense) {
        return expense.id !== id;
    });

    saveExpenses();
    displayExpenses();

    showMessage("Expense deleted.", "red");
}


function updateTotal() {

    let total = 0;

    expenses.forEach(function (expense) {
        total += expense.amount;
    });

    totalAmount.textContent = total.toLocaleString("en-IN");
}


function updateSummary() {

    let food = 0;
    let rent = 0;
    let transport = 0;
    let relaxing = 0;

    expenses.forEach(function (expense) {

        if (expense.category === "Food & Beverage") {
            food += expense.amount;
        }

        if (expense.category === "Rent") {
            rent += expense.amount;
        }

        if (expense.category === "Transport") {
            transport += expense.amount;
        }

        if (expense.category === "Relaxing") {
            relaxing += expense.amount;
        }
    });

    document.getElementById("food-total").textContent =
        "₹" + food.toLocaleString("en-IN");

    document.getElementById("rent-total").textContent =
        "₹" + rent.toLocaleString("en-IN");

    document.getElementById("transport-total").textContent =
        "₹" + transport.toLocaleString("en-IN");

    document.getElementById("relaxing-total").textContent =
        "₹" + relaxing.toLocaleString("en-IN");
}


function updateCount() {

    const count = expenses.length;

    if (count === 1) {
        expenseCount.textContent = "1 expense";
    } else {
        expenseCount.textContent = count + " expenses";
    }
}

function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}



function showMessage(text, color) {

    message.textContent = text;
    message.style.color = color;

    setTimeout(function () {
        message.textContent = "";
    }, 2500);
}



themeBtn.addEventListener("click", function () {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeBtn.textContent = "☀️";
    } else {
        themeBtn.textContent = "🌙";
    }
});


displayExpenses();
