let services = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const servicesContainer = document.getElementById("services-container");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");

fetch("data/services.json")
    .then(res => res.json())
    .then(data => {
        services = data;
        renderServices();
        renderCart();
    });

function renderServices() {
    servicesContainer.innerHTML = "";

    services.forEach(service => {
        const card = document.createElement("div");
        card.classList.add("service-card");

        card.innerHTML = `
        <img src="${service.image}" alt="${service.name}" class="service-img">
        <h3 class="service-title">${service.name}</h3>
        <p class="service-desc">${service.description}</p>
        <p class="service-price">$${service.price}</p>
        <button class="service-btn">Agregar al carrito</button>
        `;

        card.querySelector(".service-btn").addEventListener("click", () => {
            addToCart(service.id);
        });

        servicesContainer.appendChild(card);
    });
}

function addToCart(serviceId) {
    const service = services.find(s => s.id === serviceId);
    const existingItem = cart.find(item => item.id === serviceId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: service.id,
            name: service.name,
            price: service.price,
            quantity: 1
        });
    }

    saveCart();
    renderCart();
}

function removeFromCart(serviceId) {
    cart = cart
        .map(item => {
            if (item.id === serviceId) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        })
        .filter(item => item.quantity > 0);

    saveCart();
    renderCart();
}

function renderCart() {
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;

        const li = document.createElement("li");
        li.classList.add("cart-item");

        li.innerHTML = `
        <span>
            ${item.name} (${item.quantity})
            - $${item.price * item.quantity}
        </span>
        <button class="remove-btn" data-id="${item.id}">✕</button>
        `;

        cartItems.appendChild(li);
    });

    document.querySelectorAll(".remove-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            removeFromCart(Number(btn.dataset.id));
        });
    });

    cartTotal.textContent = `Total: $${total}`;
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
        showAlert("El carrito está vacío");
        return;
    }

    showAlert("Compra realizada con éxito");
    cart = [];
    localStorage.removeItem("cart");
    renderCart();
});

const alertBox = document.getElementById("custom-alert");
const alertMessage = document.getElementById("alert-message");
const alertIcon = document.getElementById("alert-icon");

let alertTimeout;

function showAlert(message, type = "success") {
    clearTimeout(alertTimeout);

    alertBox.style.background = "#3ea3ae";
    alertIcon.className = "fa-solid fa-circle-info";

    alertMessage.textContent = message;

    alertBox.classList.remove("fade-out");
    alertBox.classList.add("show");

    alertTimeout = setTimeout(() => {
        alertBox.classList.remove("show");
        alertBox.classList.add("fade-out");
    }, 2500);
}

const backBtn = document.getElementById("back-btn");

if (backBtn) {
    backBtn.addEventListener("click", () => {
        window.location.href = "index.html";
    });
}
