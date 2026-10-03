function cartOnLoadFunc() {
    const cartItemsAdded = cartGetAddedItems();
    // localStorage.clear();
    cartDisplayAddedItems(cartItemsAdded);
}

function cartGetAddedItems() {
    const cartItemsAdded = Object.keys(localStorage)
        .filter(key => key.startsWith(global_localStorageCartKeyPrefix))
        .map(key => ({
            key: key,
            value: localStorage.getItem(key)
        }));
    return cartItemsAdded;
}

function cartDisplayAddedItems(cartItemsAdded) {
    const cartItemsDiv = document.getElementById("cartItems");

    cartItemsAdded.forEach(cartItemAdded => {
        const cartItemData = JSON.parse(cartItemAdded.value);

        const cartItemDivOut = document.createElement("div");
        cartItemDivOut.className = "cartItemDivOut";

        const cartItemDivIn = document.createElement("div");
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
                <button class="cart_wishlistBtn" onclick="cart_wishlistBtnClicked(this)"></button>
                <button class="removeFromCartBtn" onclick="removeCartItem(this)">Remove</button>
            </div>
        `;

        cartItemDivOut.appendChild(cartItemDivIn);
        cartItemsDiv.appendChild(cartItemDivOut);
    });
}

function cart_wishlistBtnClicked(clickedWishlistBtn) {
    const item_title_toWishlist = clickedWishlistBtn.parentElement.previousElementSibling.querySelector(".cartItemTitle").textContent;
    const item_imgSrc_toWishlist = clickedWishlistBtn.parentElement.previousElementSibling.querySelector(".cartItemHeroImg").src;

    const itemData_toWishlist = {
        title: item_title_toWishlist,
        imgSrc: item_imgSrc_toWishlist
    };

    clickedWishlistBtn.textContent = wishlistedItemBtn_textContent;

    wishlistItem(itemData_toWishlist);
}

function removeCartItem(cartItemToRemove) {
    const cartItemTitleToRemove = cartItemToRemove.parentElement.previousElementSibling.querySelector('.cartItemTitle').textContent;
    const cartItemKeyToRemove = global_localStorageCartKeyPrefix + cartItemTitleToRemove;
    if (localStorage.getItem(cartItemKeyToRemove)) {
        localStorage.removeItem(cartItemKeyToRemove);

        const cartItemDivToRemove = cartItemToRemove.parentElement.parentElement.parentElement;
        cartItemDivToRemove.remove();
    }
}