// 1. Standard-Werte festlegen
const defaultState = {
    // Banking
    bank_account: 100,
    bank_account_zins: 1.25,
    bank_account_savings: 200,
    bank_account_savings_zins: 1.50,

    taxe_rate: 18,

    // social
    workers: 2,
    worker_satisfaction: 85,

    ads: [],
    reputation: 50,
};

function createAdObject(name, price, views) {
    return {
        company_name: name,
        price: price,
        views: views,
        active: true
    };
}

// 2. State aus dem LocalStorage laden ODER Standard-Werte nutzen
// Wir nutzen JSON.parse, weil LocalStorage nur Text speichern kann
const savedData = localStorage.getItem("myGameData");
export const state = savedData ? JSON.parse(savedData) : defaultState;

// 3. Hilfsfunktion: Immer wenn du etwas änderst, ruf saveState() auf
export function saveState() {
    localStorage.setItem("myGameData", JSON.stringify(state));
}