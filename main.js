async function fetchData() {
  const res = await fetch("https://api.sheetbest.com/sheets/1f8a7655-ea7e-4052-8041-e0c9daba7bc8");
  const data = await res.json();
  return data;
}

function createProductCard(item) {
  const expiredDate = new Date(item.HSD);
  const now = new Date();
  const timeDiff = expiredDate - now;
  const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  const expiredText = daysLeft < 0 ? "Đã hết hạn" : `Còn ${daysLeft} ngày`;

  return `
    <div class="product" data-name="${item.Ten.toLowerCase()}">
      <strong>${item.Ten}</strong><br>
      Hạn sử dụng: ${item.HSD} <br>
      <span class="${daysLeft < 0 ? 'expired' : ''}">${expiredText}</span>
    </div>
  `;
}

function renderProducts(products) {
  const container = document.getElementById("products");
  container.innerHTML = products.map(createProductCard).join("");
}

function setupSearch(data) {
  const input = document.getElementById("searchInput");
  input.addEventListener("input", () => {
    const keyword = input.value.toLowerCase();
    const filtered = data.filter(item => item.Ten.toLowerCase().includes(keyword));
    renderProducts(filtered);
  });
}

fetchData().then(data => {
  renderProducts(data);
  setupSearch(data);
});
