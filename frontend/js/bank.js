import { state, saveState } from "./state.js";

function updateUI() {
    // 1. Das Element im Header (Gesamtvermögen)
    const totalDisplay = document.getElementById("stat-value-money-finanzen");

    // 2. Die Elemente in den Cards
    const giroDisplay = document.getElementById("bank-balance");
    const savingsDisplay = document.getElementById("savings-balance");

    // Nur aktualisieren, wenn die Elemente auf der Seite existieren
    if (totalDisplay) {
        totalDisplay.textContent = (state.bank_account + state.bank_account_savings).toLocaleString() + " $";
    }
    if (giroDisplay) {
        giroDisplay.textContent = state.bank_account.toLocaleString() + " $";
    }
    if (savingsDisplay) {
        savingsDisplay.textContent = state.bank_account_savings.toLocaleString() + " $";
    }
}

// Event-Listener für die Buttons (Einzahlen/Auszahlen)
function setupBankListeners() {
    const depositBtn = document.getElementById("btn-deposit");
    const amountInput = document.getElementById("transfer-amount");

    if (depositBtn && amountInput) {
        depositBtn.addEventListener("click", () => {
            const amount = parseInt(amountInput.value);
            if (amount > 0 && state.bank_account >= amount) {
                state.bank_account -= amount;
                state.bank_account_savings += amount;
                saveState(); // Speichert in LocalStorage
                updateUI();  // Zeigt neue Werte an
                amountInput.value = ""; // Input leeren
            }
        });
    }
}

// Initialisierung beim Laden der Seite
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        updateUI();
        setupBankListeners();
    });
} else {
    updateUI();
    setupBankListeners();
}