const foods = [
    { name: "MARGHERITA", description: "Tomatsås, mozzarella, basilika, oregano, valfri sås ingår.", price: 85, image: "images/p1.jpeg" },
    { name: "VESUVIO", description: "Tomatsås, mozzarella, skinka, oregano, valfri sås ingår.", price: 95, image: "images/p2.jpeg" },
    { name: "CAPRICCIOSA", description: "Tomatsås, mozzarella, skinka, färska champinjoner, valfri sås ingår.", price: 105, image: "images/p3.jpeg" },
    { name: "HAWAII", description: "Tomatsås, mozzarella, skinka, färsk ananas, valfri sås ingår.", price: 95, image: "images/p4.jpeg" },
    { name: "KEBAB PIZZA", description: "Tomatsås, mozzarella, kebabkött, kebabsås, feferoni.", price: 110, image: "images/p5.jpeg" },
    { name: "OXFILE", description: "Tomatsås, mozzarella, oxfilé, färska champinjoner, bearnaisesås.", price: 125, image: "images/p6.jpeg" },
    { name: "POSEIDON", description: "Crème fraiche, mozzarella, handskalade räkor, kräftstjärtar.", price: 145, image: "images/p7.jpeg" },
    { name: "PEPPERONI PIZZA", description: "Tomatsås, mozzarella, champinjoner, pepperonikorv, valfri sås ingår.", price: 110, image: "images/p8.jpeg" },
    { name: "VEGETARIANA", description: "Tomatsås, ost, färska champinjoner, cocktailtomater, lök, kronärtskocka, oliver", price: 100, image: "images/p9.jpeg" },
];

const cart = [];

function displayFoods() {
    const container = document.getElementById("food-list");
    container.innerHTML = "";

    foods.forEach((food) => {
        const col = document.createElement("div");
        col.classList.add("col-sm-6", "col-md-4", "mb-4", "product-card");

        col.innerHTML = 
        "<div class=\"card\">" +
            "<img src=\"" + food.image + "\" class=\"card-img-top pizza-img\" alt=\"" + food.name + "\">" +
            "<div class=\"card-body text-center\">" +
                "<h5 class=\"card-title\">" + food.name + "</h5>" +
                "<p class=\"card-text\">" + food.description + "</p>" +
                "<p><strong>Pris: " + food.price + " kr</strong></p>" +
                "<button class=\"btn btn-sm custom-btn\" onclick=\"addToCart('" + food.name + "')\">Lägg till</button>" +
            "</div>" +
        "</div>";
        
        container.appendChild(col);
    });

    updateCart();
}

function addToCart(itemName) {
    const item = cart.find(cartItem => cartItem.name === itemName);
    if (item) {
        item.quantity++;
    } else {
        const food = foods.find(food => food.name === itemName);
        cart.push({ name: food.name, price: food.price, quantity: 1 });
    }
    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function clearCart() {
    cart.length = 0;
    updateCart();
}

function updateCart() {
    const cartDiv = document.getElementById("cart");
    cartDiv.innerHTML = "<h5>Kundkorg</h5>";
    cartDiv.classList.add("border", "rounded", "p-3", "mb-4");

    if (cart.length === 0) {
        cartDiv.innerHTML += "<p><i>Kundkorgen är tom... handla snabbt.</i></p>";
        return;
    }

    let totalPrice = 0;

    cart.forEach((item, index) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("d-flex", "justify-content-between", "align-items-center", "mb-2");

        cartItem.innerHTML = 
        "<span>" + item.name + " x" + item.quantity + " (" + item.price + " kr/st)</span>" +
        "<button class='btn btn-danger btn-sm' onclick='removeFromCart(" + index + ")'>x</button>";

        cartDiv.appendChild(cartItem);
        totalPrice += item.price * item.quantity;
    });

    const totalPriceElement = document.createElement("p");
    totalPriceElement.textContent = "Totalt pris: " + totalPrice + " kr";
    totalPriceElement.classList.add("mt-3", "fw-bold");
    cartDiv.appendChild(totalPriceElement);

    const clearCartButton = document.createElement("button");
    clearCartButton.textContent = "Töm kundkorg";
    clearCartButton.classList.add("btn-black", "btn-black", "btn-sm", "mt-3");

    clearCartButton.onclick = clearCart;
    cartDiv.appendChild(clearCartButton);
}

window.onload = displayFoods;