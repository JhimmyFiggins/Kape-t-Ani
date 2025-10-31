
function renderProducts(id, products, color = "#442808") {
  document.getElementById(id).innerHTML = products
    .map(([id, name, desc, price, img, type]) => `
      <div class="col-md-3 col-sm-6">
        <div class="card border-0 shadow-sm h-100">
          <img src="data:${type};base64,${img}" class="card-img-top" alt="${name}">
          <div class="card-body text-center">
            <h6 class="fw-bold">${name}</h6>
            <p class="small text-muted mb-1">${desc}</p>
            <p class="fw-semibold mb-2" style="color:${color};">${price}</p>
            <button class="btn btn-sm w-100 text-light add-to-cart"
              style="background-color:${color};"
              data-name="${name}"
              data-price="${price}"
              data-img="${img}">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    `)
    .join("");
}

renderProducts("coffee-products", coffeeProducts);
renderProducts("kit-products", kitProducts);
renderProducts("autumn-products", autumnProducts, "#b66d2f");


let cart = [];

function updateCartUI() {
  const cartItemsContainer = document.getElementById("cartItems");
  const cartTotalElement = document.getElementById("cartTotal");

  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    total += item.price;

    const li = document.createElement("li");
    li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
    li.innerHTML = `
      <span>${item.name}</span>
      <span>₱${item.price}</span>
    `;
    cartItemsContainer.appendChild(li);
  });

  cartTotalElement.textContent = `₱${total}`;
}

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("add-to-cart")) {
    const name = e.target.getAttribute("data-name");
    const price = Number(e.target.getAttribute("data-price"));

    cart.push({ name, price });
    updateCartUI();
  }
});


window.addEventListener("scroll", () => {
  document.querySelector(".navbar").classList
    .toggle("shrink", window.scrollY > 50);
});
