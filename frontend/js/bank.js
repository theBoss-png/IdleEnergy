import { state, saveState } from "./state.js";


function updateUI() {
    const moneyDisplay = document.getElementById("stat-value-money-finanzen");

    if (moneyDisplay) {
        moneyDisplay.textContent = (state.bank_account + state.bank_account_savings).toLocaleString() + " $";
    }
}


if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateUI);
} else {
    updateUI();
}