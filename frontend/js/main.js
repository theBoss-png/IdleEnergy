// Game State
let gameState = {
    energy: 0,
    gold: 600,
    workers: 2,
    coal: 0,
    shopItems: [
        { name: "Coal Mine", basePrice: 10000, price: 500, energyPerSecond: 0, workerCost: 1, owned: 0, coalPerSecond: 1, icon: "⛏️" },
        { name: "Human Power", basePrice: 100, price: 100, energyPerSecond: 1, workerCost: 1, owned: 0, icon: "💪" },
        { name: "Wasserrad", basePrice: 500, price: 500, energyPerSecond: 50, workerCost: 2, owned: 0, icon: "🎡" },
        { name: "Windmühle", basePrice: 1000, price: 1000, energyPerSecond: 50, workerCost: 1, owned: 0, icon: "🌾" },
        { name: "Solar Panel", basePrice: 100, price: 100, energyPerSecond: 10, workerCost: 1, owned: 0, icon: "☀️" },
        { name: "Wind Turbine", basePrice: 500, price: 500, energyPerSecond: 50, workerCost: 3, owned: 0, icon: "💨" },
        { name: "Wave Energy", basePrice: 1000, price: 1000, energyPerSecond: 100, workerCost: 5, owned: 0, icon: "🌊" },
        { name: "Biogas", basePrice: 2000, price: 2000, energyPerSecond: 200, workerCost: 5, owned: 0, icon: "🌱" },
        { name: "Wasserwerk", basePrice: 2000, price: 2000, energyPerSecond: 200, workerCost: 5, owned: 0, icon: "💧" },
        { name: "Blitze farmen", basePrice: 30000, price: 30000, energyPerSecond: 3000, workerCost: 2, owned: 0, icon: "⚡" },
        { name: "Pyramide Energy", basePrice: 200000, price: 200000, energyPerSecond: 20000, workerCost: 5, owned: 0, icon: "🔺" },
        { name: "AKW", basePrice: 10000, price: 500, energyPerSecond: 1000, workerCost: 20, owned: 0, icon: "☢️" },
        { name: "Fusions Reaktor", basePrice: 10000, price: 10000, energyPerSecond: 10000, workerCost: 25, owned: 0, icon: "🔬" },
        { name: "Earth Rotation", basePrice: 10000, price: 10000, energyPerSecond: 10000, workerCost: 50, owned: 0, icon: "🌍" },
        { name: "Black Hole", basePrice: 100000, price: 5000000, energyPerSecond: 500000, workerCost: 100, owned: 0, icon: "🕳️" },
        { name: "Golden Hole", basePrice: 30000000, price: 50000000, energyPerSecond: 500000000, workerCost: 1000, owned: 0, icon: "✨" }
    ]
};

// Utility Functions
function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return Math.floor(num).toString();
}

function getTotalEnergyPerSecond() {
    return gameState.shopItems.reduce((sum, item) => sum + item.energyPerSecond * item.owned, 0);
}

function getTotalCoalPerSecond() {
    return gameState.shopItems.reduce((sum, item) => sum + (item.coalPerSecond || 0) * item.owned, 0);
}

// UI Update Functions
function updateDisplay() {
    document.getElementById('energy-display').textContent = formatNumber(gameState.energy);
    document.getElementById('gold-display').textContent = formatNumber(gameState.gold);
    document.getElementById('workers-display').textContent = formatNumber(gameState.workers);
    document.getElementById('coal-display').textContent = formatNumber(gameState.coal);
    document.getElementById('production-display').textContent = `+${formatNumber(getTotalEnergyPerSecond())} ⚡/sec`;
}

function renderShop() {
    const shopContainer = document.getElementById('shop-items');
    shopContainer.innerHTML = '';

    gameState.shopItems.forEach((item, index) => {
        const canAfford = gameState.gold >= item.price && gameState.workers >= item.workerCost;

        const itemDiv = document.createElement('div');
        itemDiv.className = 'shop-item';

        const productionText = item.coalPerSecond > 0
            ? `🪨 ${item.coalPerSecond * item.owned}/sec`
            : `⚡ ${item.energyPerSecond * item.owned}/sec`;

        const baseText = item.coalPerSecond > 0
            ? `Base: 🪨${item.coalPerSecond}/sec`
            : `Base: ⚡${item.energyPerSecond}/sec`;

        itemDiv.innerHTML = `
            <div class="shop-item-content">
                <div class="shop-item-info">
                    <div class="shop-item-icon">${item.icon}</div>
                    <div class="shop-item-details">
                        <div class="shop-item-name">${item.name}</div>
                        <div class="shop-item-stats">
                            ${productionText} • Owned: <span class="owned">${item.owned}</span>
                        </div>
                        <div class="shop-item-base">${baseText}</div>
                    </div>
                </div>
                <button class="buy-button" onclick="buyItem(${index})" ${!canAfford ? 'disabled' : ''}>
                    <div class="buy-button-price">💰 ${formatNumber(item.price)}</div>
                    <div class="buy-button-workers">🧑‍🏭 ${item.workerCost}</div>
                </button>
            </div>
        `;

        shopContainer.appendChild(itemDiv);
    });
}

// Game Logic
function buyItem(index) {
    const item = gameState.shopItems[index];
    if (gameState.gold >= item.price && gameState.workers >= item.workerCost) {
        gameState.gold -= item.price;
        gameState.workers -= item.workerCost;
        item.owned += 1;
        item.price = Math.round(item.price * 1.1);

        updateDisplay();
        renderShop();
    }
}

function sellEnergy() {
    if (gameState.energy >= 100) {
        gameState.energy -= 100;
        gameState.gold += 1000;
        updateDisplay();
    }
}

function switchTab(tab) {
    const energyTab = document.getElementById('energy-tab');
    const marketTab = document.getElementById('market-tab');
    const energyContent = document.getElementById('energy-content');
    const marketContent = document.getElementById('market-content');

    if (tab === 'energy') {
        energyTab.classList.add('active');
        marketTab.classList.remove('active');
        energyContent.classList.add('hidden');
        marketContent.classList.remove('hidden');
    } else {
        energyTab.classList.remove('active');
        marketTab.classList.add('active');
        energyContent.classList.remove('hidden');
        marketContent.classList.add('hidden');
    }
}

// Game Loop
function gameLoop() {
    gameState.energy += getTotalEnergyPerSecond();
    gameState.coal += getTotalCoalPerSecond();
    updateDisplay();
}

// Initialize Game
function initGame() {
    updateDisplay();
    renderShop();
    setInterval(gameLoop, 1000);
}

// Start game when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGame);
} else {
    initGame();
}