import { state, saveState } from "./state.js";


function updateUI() {
    const moneyDisplay = document.getElementById("stat-value-money");
    const workersDisplay = document.getElementById("stat-value-workers");
    const bankBalance = document.getElementById("info-value-positive");

    if (moneyDisplay) {
        moneyDisplay.textContent = (state.bank_account + state.bank_account_savings).toLocaleString() + " $";
    }
    if (workersDisplay) {
        workersDisplay.textContent = state.workers;
    }
    if (bankBalance) {
        bankBalance.textContent = state.bank_account;
    }
}


if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateUI);
} else {
    updateUI();
}