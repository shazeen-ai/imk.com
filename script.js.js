document.addEventListener("DOMContentLoaded", () => {
    const cart = {};
    const cartItemsContainer = document.getElementById("cart-items");

    // Add to Cart
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", () => {
            const product = button.parentElement;
            const id = product.getAttribute("data-id");
            const name = product.getAttribute("data-name");
            const price = parseFloat(product.getAttribute("data-price"));

            if (!cart[id]) {
                cart[id] = { name, price, quantity: 1 };
            } else {
                cart[id].quantity += 1;
            }

            updateCart();
        });
    });

    // Update Cart Display
    function updateCart() {
        cartItemsContainer.innerHTML = "";

        if (Object.keys(cart).length === 0) {
            cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
            return;
        }

        for (const id in cart) {
            const item = cart[id];
            const cartItem = document.createElement("div");
            cartItem.className = "cart-item";
            cartItem.innerHTML = `
                <p>${item.name} - $${item.price}</p>
                <input type="number" min="1" value="${item.quantity}" data-id="${id}">
                <button class="remove-item" data-id="${id}">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        }

        // Add Event Listeners for Quantity Change
        cartItemsContainer.querySelectorAll("input").forEach(input => {
            input.addEventListener("change", (event) => {
                const id = event.target.getAttribute("data-id");
                const newQuantity = parseInt(event.target.value);
                if (newQuantity > 0) {
                    cart[id].quantity = newQuantity;
                } else {
                    delete cart[id];
                }
                updateCart();
            });
        });

        // Add Event Listeners for Remove Item
        cartItemsContainer.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", (event) => {
                const id = event.target.getAttribute("data-id");
                delete cart[id];
                updateCart();
            });
        });
    }
});
// Handle Checkout Form Submission
document.getElementById('checkout-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent page reload

    // Collect form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const payment = document.querySelector('input[name="payment"]:checked').value;

    // Simulate sending order details
    alert(`Order Placed!\n\nName: ${name}\nEmail: ${email}\nAddress: ${address}\nPayment: ${payment}`);

    // Clear form after submission
    this.reset();
});window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    loader.style.display = 'none'; // Hide the loader once the page is fully loaded
});