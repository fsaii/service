// ================= GLOBAL SEARCH =================
let searchTimeout;

function handleGlobalSearch() {
  clearTimeout(searchTimeout);

  searchTimeout = setTimeout(() => {
    const input = document.getElementById("searchInput");
    if (!input) return;

    const keyword = input.value.toLowerCase().trim();

    // ===== SELECT TARGET BASED ON PAGE =====
    let targets = [];
    let displayType = "";

    if (document.querySelector(".promo-card")) {
      targets = document.querySelectorAll(".promo-card");
    }

    if (document.querySelector(".service-item")) {
      targets = document.querySelectorAll(".service-item");
    }

    if (document.querySelector(".info-item")) {
      targets = document.querySelectorAll(".info-item");
    }

    // ===== HISTORY TABLE =====
    if (document.querySelector("#bookingTable")) {
      const rows = document.querySelectorAll("#bookingTable tr");

      rows.forEach(row => {
        const rowText = row.innerText.toLowerCase();

        // 👉 ดึงข้อมูลเพิ่ม
        const name = (row.dataset.name || "").toLowerCase();
        const phone = (row.dataset.phone || "").toLowerCase();

        const fullText = rowText + " " + name + " " + phone;

        row.style.display =
          !keyword || fullText.includes(keyword) ? "" : "none";
      });
    }

    // ===== HISTORY MOBILE CARD =====
    if (document.querySelector(".booking-card")) {
      const cards = document.querySelectorAll(".booking-card");
    
      cards.forEach(card => {
        const text = card.innerText.toLowerCase();
    
        const name = (card.dataset.name || "").toLowerCase();
        const phone = (card.dataset.phone || "").toLowerCase();
    
        const fullText = text + " " + name + " " + phone;
    
        card.style.display =
          !keyword || fullText.includes(keyword) ? "block" : "none";
      });
    }

    // ===== NORMAL ELEMENTS (HOME / PROFILE / SERVICE) =====
    if (targets.length > 0) {
      targets.forEach(el => {
        const text = el.innerText.toLowerCase();
        el.style.display =
          !keyword || text.includes(keyword) ? "" : "none";
      });
    }

  }, 250); // debounce 250ms
}