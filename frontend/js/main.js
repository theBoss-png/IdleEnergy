import { state, saveState } from "/state.js";

function updateUI() {
    const moneyDisplay = document.getElementById("stat-value-money");
    const workersDisplay = document.getElementById("stat-value-workers");

    if (moneyDisplay) {
        moneyDisplay.textContent = (state.bank_account + state.bank_account_savings).toLocaleString() + " $";
    }
    if (workersDisplay) {
        workersDisplay.textContent = state.workers;
    }
}

// Beispiel: Wenn ein Arbeiter gekauft wird
function buyWorker() {
    if (state.bank_account >= 50) {
        state.bank_account -= 50;
        state.workers += 1;
        saveState(); // WICHTIG: Speichern, bevor die Seite gewechselt wird!
        updateUI();
    }
}

function gameLoop() {}

function initGame() {
    updateUI(); // Wird beim Laden jeder neuen HTML-Seite sofort ausgeführt
    setInterval(gameLoop, 60000);
}

// Start beim Laden
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGame);
} else {
    initGame();
}