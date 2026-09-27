function cartOnLoadFunc() {
    // console.log('cartLoading');
    const cartItemsAdded = cartGetAddedItems();
    // console.log(cartItemsAdded);

    cartDisplayAddedItems(cartItemsAdded);
}

function cartGetAddedItems() {
    // Using a prefix filter so Cart and Wishlist don't mix up in localStorage
    const allItems = Object.keys(localStorage)
        .filter(key => key.startsWith("cart_"))
        .map(key => ({
            key: key,
            value: localStorage.getItem(key)
        }));
    return allItems;
}

function cartDisplayAddedItems(cartItemsAdded) {
    const cartItems = document.getElementById("cartItems");

    cartItemsAdded.forEach(cartItemAdded => {
        let itemData = JSON.parse(cartItemAdded.value);

        let divOut = document.createElement("div");
        divOut.className = "singleGameOut";

        let divIn = document.createElement("div");
        divIn.className = "singleGameIn";
        divIn.id = cartItemAdded.key;

        divIn.innerHTML = `
            <div class="cartItemDataDiv">
                <img class="singleGameHeroImg" src="${itemData.img}" alt="${itemData.title}-hero">
                <div class="cartItemText">
                    <h3 class="singleGameTitle">${itemData.title}</h3>
                    <h4 class="addedQuantity">Quantity: ${itemData.quantity}</h4>
                </div>
            </div>
            <div class="cartItemBtnDiv">
                <button class="wishlistBtn">Wishlist</button>
                <button class="removeFromCartBtn" onclick="removeCartItem(this)">Remove</button>
            </div>
        `;

        divOut.appendChild(divIn);
        cartItems.appendChild(divOut);
    });
}

function removeCartItem(itemToRemove) {
    const itemTitleToRemove = itemToRemove.parentElement.previousElementSibling.querySelector('.singleGameTitle').textContent;
    localStorage.removeItem('cart_' + itemTitleToRemove);
    // window.location.reload();

    const fullItemToRemove = itemToRemove.parentElement.parentElement.parentElement
    fullItemToRemove.remove();
}