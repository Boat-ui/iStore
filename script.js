// CONFIG
const PAYSTACK_KEY = 'pk_test_YOUR_PAYSTACK_PUBLIC_KEY_HERE';

// PRODUCTS (with images)
const PRODUCTS = [
  { id:1, cat:'iPhone', name:'iPhone 15 Pro Max', price:1599000, stock:12, badge:'pro', storage:'256GB', img:'images/iphone-15-pro-max.png', specs:['6.7" Super Retina XDR','A17 Pro chip','48MP camera system','Titanium design'] },
  { id:2, cat:'iPhone', name:'iPhone 15 Pro', price:1399000, stock:8, badge:'pro', storage:'128GB', img:'images/iphone-15-pro.png', specs:['6.1" Super Retina XDR','A17 Pro chip','USB-C connector','Action Button'] },
  { id:3, cat:'iPhone', name:'iPhone 15', price:999000, stock:20, badge:null, storage:'128GB', img:'images/iphone-15.png', specs:['6.1" Super Retina XDR','A16 Bionic chip','Dynamic Island','48MP main camera'] },
  { id:4, cat:'iPhone', name:'iPhone 14', price:799000, stock:15, badge:'deal', storage:'128GB', img:'images/iphone-14.png', specs:['6.1" Super Retina XDR','A15 Bionic chip','Crash Detection','Emergency SOS'] },
  { id:5, cat:'iPhone', name:'iPhone 13', price:599000, stock:10, badge:'deal', storage:'128GB', img:'images/iphone-13.png', specs:['6.1" Super Retina XDR','A15 Bionic chip','Cinematic mode','5G capable'] },

  { id:6, cat:'iPad', name:'iPad Pro 12.9"', price:1799000, stock:6, badge:'pro', storage:'256GB', img:'images/ipad-pro.png', specs:['12.9" Liquid Retina XDR','M2 chip'] },

  { id:7, cat:'MacBook', name:'MacBook Pro 16"', price:3999000, stock:4, badge:'pro', storage:'512GB SSD', img:'images/macbook-pro.png', specs:['16.2" Liquid Retina XDR','M3 Pro chip'] },

  { id:8, cat:'Accessories', name:'AirPods Pro', price:249000, stock:30, badge:null, storage:null, img:'images/airpods.png', specs:['Noise Cancellation','MagSafe'] }
];

const CATEGORIES = ['All','iPhone','iPad','MacBook','Accessories'];
let activeCategory = 'All';
let cart = {};

const fmt = n => '₦' + n.toLocaleString();

// PAGE SWITCH
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (name === 'cart') renderCart();
}

// FILTER
function filterCat(cat) {
  activeCategory = cat;
  renderProducts();
}

// CATEGORY BUTTONS
(function(){
  const strip = document.getElementById('cat-strip');
  CATEGORIES.forEach(cat=>{
    const btn=document.createElement('button');
    btn.className='cat-pill'+(cat==='All'?' active':'');
    btn.textContent=cat;
    btn.onclick=()=>filterCat(cat);
    strip.appendChild(btn);
  });
})();

// RENDER PRODUCTS (UPDATED WITH IMAGES)
function renderProducts() {
  const grid = document.getElementById('products-grid');
  grid.innerHTML = '';

  const filtered = PRODUCTS.filter(p =>
    (activeCategory==='All'||p.cat===activeCategory)
  );

  filtered.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';

    card.innerHTML = `
      <div class="product-img-box">
        <img src="${p.img}" alt="${p.name}" class="product-img">
      </div>

      <div class="card-cat">${p.cat}</div>
      <div class="card-name">${p.name}</div>
      ${p.storage ? `<div class="card-storage">${p.storage}</div>` : ''}

      <ul class="card-specs">
        ${p.specs.map(s=>`<li>${s}</li>`).join('')}
      </ul>

      <div class="card-footer">
        <div class="card-price">${fmt(p.price)}</div>
        <button onclick="addToCart(${p.id})" class="add-btn">Add</button>
      </div>
    `;

    grid.appendChild(card);
  });
}
renderProducts();

// ADD TO CART
function addToCart(id){
  const p = PRODUCTS.find(x=>x.id===id);
  if(!cart[id]) cart[id]={...p,qty:0};
  cart[id].qty++;
  updateCart();
}

// UPDATE CART BADGE
function updateCart(){
  const total=Object.values(cart).reduce((s,i)=>s+i.qty,0);
  document.getElementById('cart-badge').textContent=total;
}

// RENDER CART
function renderCart(){
  const el=document.getElementById('cart-content');
  const items=Object.values(cart);

  if(!items.length){
    el.innerHTML="Cart empty";
    return;
  }

  el.innerHTML=items.map(i=>`
    <div>${i.name} x${i.qty} = ${fmt(i.price*i.qty)}</div>
  `).join('');
}