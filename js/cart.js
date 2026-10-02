function cartOnLoadFunc() {
    const cartItemsAdded = cartGetAddedItems();

    cartDisplayAddedItems(cartItemsAdded);
}

function cartGetAddedItems() {
    // Using a prefix filter so Cart and Wishlist don't mix up in localStorage
    const cartItemsAdded = Object.keys(localStorage)
        .filter(key => key.startsWith("cart-"))
        .map(key => ({
            key: key,
            value: localStorage.getItem(key)
        }));
    return cartItemsAdded;
}

function cartDisplayAddedItems(cartItemsAdded) {
    const cartItemsDiv = document.getElementById("cartItems");

    cartItemsAdded.forEach(cartItemAdded => {
        let cartItemData = JSON.parse(cartItemAdded.value);

        let cartItemDivOut = document.createElement("div");
        cartItemDivOut.className = "cartItemDivOut";

        let cartItemDivIn = document.createElement("div");
        cartItemDivIn.className = "cartItemDivIn";
        cartItemDivIn.id = cartItemAdded.key;

        cartItemDivIn.innerHTML = `
            <div class="cartItemDataDiv">
                <img class="cartItemHeroImg" src="${cartItemData.img}" alt="${cartItemData.title}-hero">
                <div class="cartItemText">
                    <h3 class="cartItemTitle">${cartItemData.title}</h3>
                    <h4 class="cartItemAddedQuantity">Quantity: ${cartItemData.quantity}</h4>
                </div>
            </div>
            <div class="cartItemBtnDiv">
                <button class="wishlistBtn">Wishlist</button>
                <button class="removeFromCartBtn" onclick="removeCartItem(this)">Remove</button>
            </div>
        `;

        cartItemDivOut.appendChild(cartItemDivIn);
        cartItemsDiv.appendChild(cartItemDivOut);
    });
}

function removeCartItem(cartItemToRemove) {
    const cartItemTitleToRemove = cartItemToRemove.parentElement.previousElementSibling.querySelector('.cartItemTitle').textContent;
    const localStorageCartKey = "cart-";
    const cartItemKeyToRemove = localStorageCartKey + cartItemTitleToRemove;
    if (localStorage.getItem(cartItemKeyToRemove)) {
        localStorage.removeItem(cartItemKeyToRemove);
        
        const cartItemDivToRemove = cartItemToRemove.parentElement.parentElement.parentElement
        cartItemDivToRemove.remove();
    }
}