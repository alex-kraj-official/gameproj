function wishlistOnLoadFunc() {
    const wishlistItemsAdded = wishlistGetAddedItems();
    wishlistDisplayAddedItems(wishlistItemsAdded);
}

function wishlistGetAddedItems() {
    const wishlistItemsAdded = Object.keys(localStorage)
        .filter(key => key.startsWith(global_localStorageWishlistKeyPrefix))
        .map(key => ({
            key: key,
            value: localStorage.getItem(key)
        }));
    return wishlistItemsAdded;
}

function wishlistDisplayAddedItems(wishlistItemsAdded) {
    const wishlistItemsDiv = document.getElementById("wishlistItems");

    wishlistItemsAdded.forEach(wishlistItemAdded => {
        const wishlistItemData = JSON.parse(wishlistItemAdded.value);

        const wishlistItemDivOut = document.createElement("div");
        wishlistItemDivOut.className = "wishlistItemDivOut";

        const wishlistItemDivIn = document.createElement("div");
        wishlistItemDivIn.className = "wishlistItemDivIn";
        wishlistItemDivIn.id = wishlistItemAdded.key;

        wishlistItemDivIn.innerHTML = `
            <div class="wishlistItemDataDiv">
                <img class="wishlistItemHeroImg" src="${wishlistItemData.img}" alt="${wishlistItemData.title}-hero">
                <div class="wishlistItemText">
                    <h3 class="wishlistItemTitle">${wishlistItemData.title}</h3>
                </div>
            </div>
            <div class="wishlistItemBtnDiv">
                <button class="wishlist_addToCartBtn" onclick="wishlist_addToCartBtnClicked(this)"></button>
                <button class="removeFromWishlistBtn" onclick="removeWishlistItem(this)">Remove</button>
            </div>
        `;

        wishlistItemDivOut.appendChild(wishlistItemDivIn);
        wishlistItemsDiv.appendChild(wishlistItemDivOut);
    });
}

function wishlist_addToCartBtnClicked(clickedAddToCartBtn) {
    const item_title_toAddToCart = clickedAddToCartBtn.parentElement.previousElementSibling.querySelector('.wishlistItemTitle').textContent;
    const item_imgSrc_toAddToCart = clickedAddToCartBtn.parentElement.previousElementSibling.querySelector(".wishlistItemHeroImg").src;

    const item_quantity_toAddToCart = getQuantityAddedToCartItem(item_title_toAddToCart);

    const itemData_toAddToCart = {
        title: item_title_toAddToCart,
        imgSrc: item_imgSrc_toAddToCart,
        quantity: item_quantity_toAddToCart
    };

    clickedAddToCartBtn.textContent = AddedToCartItemBtn_textContent;

    addToCartItem(itemData_toAddToCart);
}

function removeWishlistItem(wishlistItemToRemove) {
    const wishlistItemTitleToRemove = wishlistItemToRemove.parentElement.previousElementSibling.querySelector('.wishlistItemTitle').textContent;
    const wishlistItemKeyToRemove = global_localStorageWishlistKeyPrefix + wishlistItemTitleToRemove;
    if (localStorage.getItem(wishlistItemKeyToRemove)) {
        localStorage.removeItem(wishlistItemKeyToRemove);

        const wishlistItemDivToRemove = wishlistItemToRemove.parentElement.parentElement.parentElement;
        wishlistItemDivToRemove.remove();
    }
}