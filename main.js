const SHEET_API = 'https://api.sheetbest.com/sheets/1f8a7655-ea7e-4052-8041-e0c9daba7bc8';

const searchInput = document.getElementById('searchInput');
const nameInput = document.getElementById('nameInput');
const expInput = document.getElementById('expInput');
const submitBtn = document.getElementById('submitBtn');
const addBtn = document.getElementById('addBtn');
const formContainer = document.getElementById('formContainer');
const productList = document.getElementById('productList');

// Lấy và hiển thị dữ liệu
async function fetchData() {
  const res = await fetch(SHEET_API);
  const data = await res.json();
  showData(data);
}

// Hiển thị sản phẩm
function showData(data) {
  productList.innerHTML = '';
  const keyword = searchInput.value.toLowerCase();
  data.filter(item => item.name.toLowerCase().includes(keyword)).forEach(item => {
    const div = document.createElement('div');
    div.className = 'product';
    const days = getDaysLeft(item.exp);
    div.innerHTML = `
      <span>${item.name}</span>
      <span class="countdown">${days} ngày</span>
    `;
    productList.appendChild(div);
  });
}

// Tính ngày còn lại
function getDaysLeft(exp) {
  const now = new Date();
  const expDate = new Date(exp);
  const diff = Math.ceil((expDate - now) / (1000 * 60 * 60 * 24));
  return diff >= 0 ? diff : 'Hết hạn';
}

// Gửi dữ liệu mới lên sheet
submitBtn.onclick = async () => {
  const name = nameInput.value.trim();
  const exp = expInput.value;
  if (!name || !exp) return alert('Vui lòng điền đủ thông tin');

  const res = await fetch(SHEET_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify([{ name, exp }])
  });

  nameInput.value = '';
  expInput.value = '';
  formContainer.classList.add('hidden');
  fetchData(); // refresh dữ liệu
};

searchInput.oninput = fetchData;
addBtn.onclick = () => formContainer.classList.toggle('hidden');

// Lần đầu load
fetchData();
