// 1. Standard-Werte festlegen
const defaultState = {
    bank_account: 100,
    bank_account_savings: 0,
    workers: 2,
};

// 2. State aus dem LocalStorage laden ODER Standard-Werte nutzen
// Wir nutzen JSON.parse, weil LocalStorage nur Text speichern kann
const savedData = localStorage.getItem("myGameData");
export const state = savedData ? JSON.parse(savedData) : defaultState;

// 3. Hilfsfunktion: Immer wenn du etwas änderst, ruf saveState() auf
export function saveState() {
    localStorage.setItem("myGameData", JSON.stringify(state));
}