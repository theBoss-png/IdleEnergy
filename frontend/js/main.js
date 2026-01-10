// Game State
let gameState = {
    energy: 0,
    gold: 600,
    workers: 2,
    coal: 0,
    shopItems: [
        { name: "Coal Mine", basePrice: 10000, price: 500, energyPerSecond: 0, workerCost: 1, owned: 0, coalPerSecond: 1, image: "assets/pictures/coalfarm.png" },
        { name: "Human Power", basePrice: 100, price: 100, energyPerSecond: 1, workerCost: 1, owned: 0, image: "assets/pictures/Menschenkraft.png"},
        { name: "Wasserrad", basePrice: 1000, price: 500, energyPerSecond: 50, workerCost: 2, owned: 0, image: "assets/pictures/wasserrad.png" },
        { name: "Windmühle", basePrice: 5000, price: 1000, energyPerSecond: 50, workerCost: 1, owned: 0, image: "assets/pictures/windmühle.png" },
        { name: "Solar Panel", basePrice: 100, price: 100, energyPerSecond: 10, workerCost: 1, owned: 0, image: "assets/pictures/Solar.png"},
        { name: "Wind Turbine", basePrice: 500, price: 500, energyPerSecond: 50, workerCost: 3, owned: 0, image: "assets/pictures/wind.png"},
        { name: "Wave Energy", basePrice: 1000, price: 1000, energyPerSecond: 100, workerCost: 5, owned: 0, image: "assets/pictures/wave.png"},
        { name: "Biogas", basePrice: 2000, price: 2000, energyPerSecond: 200, workerCost: 5, owned: 0, image: "assets/pictures/BIOGAS.png"},
        { name: "Wasserwerk", basePrice: 2000, price: 2000, energyPerSecond: 200, workerCost: 5, owned: 0, image: "assets/pictures/Wasserkraft.png"},
        { name: "Lightning-farm", basePrice: 30000, price: 30000, energyPerSecond: 3000, workerCost: 2, owned: 0, image: "assets/pictures/blitz.png"},
        { name: "AKW", basePrice: 10000, price: 500, energyPerSecond: 1000, workerCost: 20, owned: 0, image: "assets/pictures/akw.png"},
        { name: "Fusions Reaktor", basePrice: 10000, price: 10000, energyPerSecond: 10000, workerCost: 25, owned: 0, image: "assets/pictures/fusion.png"},
        { name: "Pyramide Energy", basePrice: 200000, price: 200000, energyPerSecond: 20000, workerCost: 5, owned: 0, image: "assets/pictures/pyramide.png"},
        { name: "Earth Rotation", basePrice: 10000, price: 10000, energyPerSecond: 10000, workerCost: 50, owned: 0, image: "assets/pictures/earth.png"},
        { name: "Black Hole", basePrice: 100000, price: 5000000, energyPerSecond: 500000, workerCost: 100, owned: 0, image: "assets/pictures/blackhole.png"},
        { name: "Golden Hole", basePrice: 30000000, price: 50000000, energyPerSecond: 500000000, workerCost: 1000, owned: 0, image: "assets/pictures/blackhole2.png"}
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

        // Shop item content
        const contentDiv = document.createElement('div');
        contentDiv.className = 'shop-item-content';

        // Icon
        const iconDiv = document.createElement('div');
        iconDiv.className = 'shop-item-icon';

        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.name;
        img.width = 48;
        img.height = 48;

        // Fallback Emoji
        const fallback = document.createElement('span');
        fallback.className = 'fallback-icon';
        fallback.textContent = item.icon;
        fallback.style.display = 'none'; // STANDARD: versteckt

        // Bild laden
        img.onload = () => {
            fallback.style.display = 'none'; // falls Bild da → Emoji bleibt versteckt
        }
        img.onerror = () => {
            img.style.display = 'none';     // Bild weg
            fallback.style.display = 'inline-block'; // Emoji sichtbar
        }

        iconDiv.appendChild(img);
        iconDiv.appendChild(fallback);

        // Details
        const detailsDiv = document.createElement('div');
        detailsDiv.className = 'shop-item-details';
        detailsDiv.innerHTML = `
            <div class="shop-item-name">${item.name}</div>
            <div class="shop-item-stats">${productionText} • Owned: <span class="owned">${item.owned}</span></div>
            <div class="shop-item-base">${baseText}</div>
        `;

        // Buy Button
        const buyBtn = document.createElement('button');
        buyBtn.className = 'buy-button';
        buyBtn.innerHTML = `
            <div class="buy-button-price">💰 ${formatNumber(item.price)}</div>
            <div class="buy-button-workers">🧑‍🏭 ${item.workerCost}</div>
        `;
        buyBtn.disabled = !canAfford;
        buyBtn.addEventListener('click', () => buyItem(index));

        // Zusammenfügen
        const infoDiv = document.createElement('div');
        infoDiv.className = 'shop-item-info';
        infoDiv.appendChild(iconDiv);
        infoDiv.appendChild(detailsDiv);

        contentDiv.appendChild(infoDiv);
        contentDiv.appendChild(buyBtn);

        itemDiv.appendChild(contentDiv);
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