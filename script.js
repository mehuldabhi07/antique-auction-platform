// --- Initial Data Array with Reliable Images ---
let antiques = [
    { 
        id: 1, 
        name: "Victorian Mahogany Cabinet", 
        category: "Furniture",
        era: "Victorian",
        origin: "England",
        condition: "Excellent",
        description: "A magnificent Victorian mahogany cabinet with intricate hand-carved floral motifs and original glass.",
        provenance: "Private Collection, London",
        current_price: 7200,
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80",
        certificate_no: "COA-2024-8841"
    },
    { 
        id: 2, 
        name: "18th Century Oil Painting", 
        category: "Art",
        era: "18th Century",
        origin: "France",
        condition: "Good",
        description: "A beautiful oil painting from the French Rococo period, depicting country landscapes.",
        provenance: "French Nobility Collection",
        current_price: 8500,
        image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80",
        certificate_no: "COA-2023-1092"
    },
    { 
        id: 3, 
        name: "Art Deco Emerald Ring", 
        category: "Jewelry",
        era: "Art Deco",
        origin: "France",
        condition: "Mint",
        description: "1920s Art Deco platinum ring featuring a 3.2 carat natural Colombian emerald.",
        provenance: "Parisian Estate Sale",
        current_price: 12400,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80",
        certificate_no: "COA-2024-9912"
    }
];

let watchlist = [];
let recentBids = [];
let activeActiveModalItemId = null;

// Initialize Page
document.addEventListener("DOMContentLoaded", () => {
    renderAntiques(antiques);
    updateWatchlistUI();
});

// Render Antique Cards
function renderAntiques(items) {
    const grid = document.getElementById("antiques-grid");
    if (!grid) return;
    grid.innerHTML = "";

    if (items.length === 0) {
        grid.innerHTML = `<p class="col-span-full text-center text-gray-500 py-8">No antiques found matching criteria.</p>`;
        return;
    }

    items.forEach(item => {
        const isWatchlisted = watchlist.includes(item.id);
        const card = document.createElement("div");
        card.className = "antique-card bg-white rounded-xl overflow-hidden shadow border border-[#8B6B4A]/20 flex flex-col justify-between";
        
        card.innerHTML = `
            <div>
                <div class="relative bg-[#2D1B12]/10 h-48">
                    <img src="${item.image}" 
                         alt="${item.name}" 
                         class="w-full h-48 object-cover"
                         onerror="this.onerror=null; this.src='https://picsum.photos/600/400?antique';">
                    
                    <button onclick="toggleWatchlistItem(${item.id})" class="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full text-red-500 hover:bg-white transition z-10">
                        <i class="${isWatchlisted ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
                    </button>
                    <span class="absolute bottom-3 left-3 bg-[#2D1B12]/80 text-[#D4A574] text-xs px-2 py-1 rounded z-10">
                        ${item.era}
                    </span>
                </div>
                <div class="p-5 space-y-2">
                    <span class="text-xs font-semibold uppercase tracking-wider text-[#8B6B4A]">${item.category} · ${item.origin}</span>
                    <h3 class="font-serif font-bold text-lg text-[#2D1B12]">${item.name}</h3>
                    <p class="text-xs text-gray-600 line-clamp-2">${item.description}</p>
                </div>
            </div>
            <div class="p-5 border-t border-gray-100 bg-[#F5EDE6]/30 flex justify-between items-center">
                <div>
                    <span class="block text-xs text-gray-500">Current Bid</span>
                    <span class="font-serif font-bold text-lg text-[#2D1B12]">$${item.current_price.toLocaleString()}</span>
                </div>
                <button onclick="openBidModal(${item.id})" class="bg-[#8B6B4A] text-white px-4 py-2 rounded text-sm font-bold hover:bg-[#2D1B12] transition">
                    Place Bid
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Filter Functionality
function filterAntiques() {
    const searchVal = document.getElementById("search-input").value.toLowerCase();
    const eraVal = document.getElementById("era-filter").value;
    const categoryVal = document.getElementById("category-filter").value;
    const sortVal = document.getElementById("sort-filter").value;

    let filtered = antiques.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchVal) || item.origin.toLowerCase().includes(searchVal);
        const matchesEra = eraVal === "All" || item.era === eraVal;
        const matchesCategory = categoryVal === "All" || item.category === categoryVal;
        return matchesSearch && matchesEra && matchesCategory;
    });

    if (sortVal === "price-asc") {
        filtered.sort((a, b) => a.current_price - b.current_price);
    } else if (sortVal === "price-desc") {
        filtered.sort((a, b) => b.current_price - a.current_price);
    }

    renderAntiques(filtered);
}

// Watchlist Functionality
function toggleWatchlistItem(id) {
    if (watchlist.includes(id)) {
        watchlist = watchlist.filter(itemId => itemId !== id);
    } else {
        watchlist.push(id);
    }
    updateWatchlistUI();
    filterAntiques();
}

function updateWatchlistUI() {
    document.getElementById("watchlist-badge").innerText = watchlist.length;
    document.getElementById("watchlist-count").innerText = `${watchlist.length} items`;
    
    const container = document.getElementById("watchlist-items");
    container.innerHTML = "";

    if (watchlist.length === 0) {
        container.innerHTML = `<p class="text-gray-400 text-sm italic">No items in your watchlist yet.</p>`;
        return;
    }

    watchlist.forEach(id => {
        const item = antiques.find(a => a.id === id);
        if (item) {
            const div = document.createElement("div");
            div.className = "flex justify-between items-center text-sm p-2 bg-[#F5EDE6]/40 rounded";
            div.innerHTML = `
                <span class="font-medium truncate max-w-[150px]">${item.name}</span>
                <span class="font-bold text-[#8B6B4A]">$${item.current_price.toLocaleString()}</span>
            `;
            container.appendChild(div);
        }
    });
}

// Modal Handlers
function openModal(id) {
    document.getElementById(id).classList.remove("hidden");
}

function closeModal(id) {
    document.getElementById(id).classList.add("hidden");
}

// Open Bid Modal Function (Fixed Image Loading)
function openBidModal(id) {
    activeActiveModalItemId = id;
    const item = antiques.find(a => a.id === id);
    
    if (!item) return;

    document.getElementById("modal-item-title").innerText = item.name;
    document.getElementById("modal-item-era").innerText = item.era;
    document.getElementById("modal-item-provenance").innerText = item.provenance;
    document.getElementById("modal-item-price").innerText = `$${item.current_price.toLocaleString()}`;
    document.getElementById("bid-amount-input").value = item.current_price + 100;
    document.getElementById("bid-error").classList.add("hidden");

    // Modal Image Binding
    const modalImg = document.getElementById("modal-item-img");
    if (modalImg) {
        modalImg.src = item.image;
        modalImg.onerror = function() {
            this.onerror = null;
            this.src = "https://picsum.photos/600/400?antique";
        };
    }

    openModal("bid-modal");
}

// Submit Live Bid
function submitBid() {
    const input = document.getElementById("bid-amount-input");
    const amount = Number(input.value);
    const item = antiques.find(a => a.id === activeActiveModalItemId);
    const errorEl = document.getElementById("bid-error");

    if (amount <= item.current_price) {
        errorEl.innerText = `Bid must be greater than $${item.current_price.toLocaleString()}`;
        errorEl.classList.remove("hidden");
        return;
    }

    item.current_price = amount;
    
    recentBids.unshift({
        title: item.name,
        amount: amount,
        time: new Date().toLocaleTimeString()
    });

    renderRecentBids();
    filterAntiques();
    closeModal("bid-modal");
    alert("Bid successfully placed!");
}

function renderRecentBids() {
    const container = document.getElementById("recent-bids-list");
    container.innerHTML = "";

    if (recentBids.length === 0) {
        container.innerHTML = `<p class="text-gray-400 text-sm italic">No recent bids placed.</p>`;
        return;
    }

    recentBids.forEach(bid => {
        const div = document.createElement("div");
        div.className = "flex justify-between items-center text-sm p-2 border-b";
        div.innerHTML = `
            <div>
                <p class="font-bold">${bid.title}</p>
                <span class="text-xs text-gray-500">${bid.time}</span>
            </div>
            <span class="font-bold text-[#8B6B4A]">$${bid.amount.toLocaleString()}</span>
        `;
        container.appendChild(div);
    });
}

// Add New Antique (CRUD)
function addNewAntique(event) {
    event.preventDefault();
    
    const newItem = {
        id: antiques.length + 1,
        name: document.getElementById("new-name").value,
        category: document.getElementById("new-category").value,
        era: document.getElementById("new-era").value,
        origin: document.getElementById("new-origin").value,
        condition: "Good",
        description: document.getElementById("new-desc").value,
        provenance: "Collector Submission",
        current_price: Number(document.getElementById("new-price").value),
        image: document.getElementById("new-image").value || "https://picsum.photos/600/400?antique",
        certificate_no: `COA-2026-${Math.floor(1000 + Math.random() * 9000)}`
    };

    antiques.unshift(newItem);
    filterAntiques();
    closeModal("add-item-modal");
    document.getElementById("add-item-form").reset();
    alert("New antique listed successfully!");
}

// Valuation Calculator
function calculateValuation(event) {
    event.preventDefault();
    const age = Number(document.getElementById("val-age").value);
    const condition = Number(document.getElementById("val-condition").value);
    
    const baseValue = age * 40 * condition;
    const minVal = Math.round(baseValue * 0.85);
    const maxVal = Math.round(baseValue * 1.25);

    document.getElementById("val-amount").innerText = `$${minVal.toLocaleString()} - $${maxVal.toLocaleString()}`;
    document.getElementById("valuation-result").classList.remove("hidden");
}

// Authenticity Verification
function verifyCertificate() {
    const certNo = document.getElementById("cert-input").value.trim();
    const output = document.getElementById("cert-output");

    const item = antiques.find(a => a.certificate_no.toLowerCase() === certNo.toLowerCase());

    output.classList.remove("hidden");
    if (item) {
        output.innerHTML = `
            <p class="text-green-400 font-bold"><i class="fa-solid fa-circle-check mr-2"></i> Verified Certificate</p>
            <p><strong>Item:</strong> ${item.name}</p>
            <p><strong>Era/Origin:</strong> ${item.era} (${item.origin})</p>
            <p><strong>Provenance:</strong> ${item.provenance}</p>
            <p><strong>Serial Code:</strong> ${item.certificate_no}</p>
        `;
    } else {
        output.innerHTML = `
            <p class="text-red-400 font-bold"><i class="fa-solid fa-circle-xmark mr-2"></i> Invalid or Unverified Serial Number</p>
            <p class="text-xs text-gray-300">Please check the certificate ID and try again (e.g. COA-2024-8841).</p>
        `;
    }
}