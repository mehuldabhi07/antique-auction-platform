# 🏺 AntiqueAuction - Antique & Collectibles Auction Platform

> **Free Web Development Internship Online Task**  
> **Task ID:** WD-AUC-005  
> **Student Name:** Mehul Dabhi  
> **Domain:** Antique Auction / Vintage Marketplace  
> **Company:** Data Alcott Systems ([www.dataalcott.com](https://www.dataalcott.com))  

---

## 📌 Project Overview

**AntiqueAuction** is a modern, responsive, frontend-focused digital auction marketplace created for collectors, historians, and antique enthusiasts. The platform allows users to browse rare historical artifacts, filter items by eras and categories, simulate expert valuations, verify authenticity certificates, and participate in live bidding.

This project was developed as part of the **Free Web Development Internship Online** hosted by **Data Alcott Systems**.

---

## ✨ Key Features & Highlights

- **🏛️ Interactive Antique Catalog:** Browse antiques with multi-parameter filtering (Era, Category, Price Range) and real-time text search.
- **🔨 Live Bidding Engine (Simulated):** View current highest bids, place new incremental bids, and see instant bid validation and floor history updates.
- **⚖️ Simulated Expert Valuation Calculator:** Algorithmic appraisal estimator calculating potential auction value ranges based on age, category, and preservation condition.
- **📜 Authenticity Verification System:** Digital Certificate Serial Number lookup center validating provenance, era, origin, and curation authenticity (e.g., `COA-2024-8841`).
- **💖 Collector Dashboard:** Manage personal watchlists and track recent bidding activities dynamically.
- **➕ Seller Inventory Listing (CRUD):** Add and list new antique items with custom metadata, prices, and image URLs without requiring a backend database.
- **📱 Fully Responsive Design:** Optimized for seamless performance across desktops, tablets, and smartphones using CSS Grid and Flexbox.

---

## 🎨 Design Guidelines & Palette

| Element | Specification |
| :--- | :--- |
| **Color Scheme** | Warm Brown (`#8B6B4A`), Cream (`#F5EDE6`), Gold (`#D4A574`), Dark Charcoal (`#2D1B12`) |
| **Typography** | Playfair Display (Serif) & Plus Jakarta Sans (Clean Sans-Serif) |
| **Vibe** | Sophisticated, Timeless, Museum-Grade, Trustworthy |
| **Icons** | FontAwesome v6.4.0 |

---

## 🛠️ Technologies Used

- **HTML5:** Semantic site layout and structure.
- **CSS3 / Tailwind CSS:** Utility-first styling, color palettes, modal views, and responsive media queries.
- **JavaScript (ES6+):** Dynamic DOM manipulation, state management (Arrays/Objects), data filtering, sorting, and modal logic.
- **FontAwesome & Google Fonts:** Visual iconography and luxury serif typography.

> **Note:** No backend database is required. All application state, antiques, bids, and watchlists are managed completely in memory via JavaScript arrays and objects.

---

## 📂 Project Structure

```text
antique-auction-platform/
│
├── index.html          # Main Single-Page Application (SPA) structure
├── style.css           # Custom styling, fonts, scrollbars, and keyframes
├── script.js           # Core business logic, dataset, bidding, and filters
└── README.md           # Documentation & internship task report