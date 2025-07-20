const sheetAPI = "https://api.sheetbest.com/sheets/1f8a7655-ea7e-4052-8041-e0c9daba7bc8";
const productList = document.getElementById("product-list");

function daysLeft(expireDateStr) {
  const today = new Date();
  const expireDate = new Date(expireDateStr);
  const diffTime = expireDate - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function createProductCard(product) {
  const days = daysLeft(product.HSD);
  const totalDays = 60; // giả định 60 ngày là tối đa
  const percent = Math.max(0, Math.min(100, (days / totalDays) * 100));
  const expired = days <= 0;

  const wrapper = document.createElement("div");
  wrapper.className = `product ${expired ? 'expired' : ''}`;
  wrapper.innerHTML = `
    <img src="${product.image}" alt="img">
    <div class="product-info">
      <div><strong>${product.name}</strong></div>
      <div>HSD: ${product.HSD} (${days} ngày)</div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${percent}%; background-color: ${expired ? '#f87171' : '#22c55e'};"></div>
      </div>
    </div>
  `;
  return wrapper;
}

fetch(sheetAPI)
  .then(res => res.json())
  .then(data => {
    const sorted = data.sort((a, b) => new Date(a.HSD) - new Date(b.HSD));
    sorted.forEach(product => {
      const card = createProductCard(product);
      productList.appendChild(card);
    });
  });
