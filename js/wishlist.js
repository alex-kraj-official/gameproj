function wishlistOnLoadFunc() {
    const wishlistItemsAdded = wishlistGetAddedItems();

    wishlistDisplayAddedItems(wishlistItemsAdded);
}

function wishlistGetAddedItems() {
    const wishlistItemsAdded = Object.keys(localStorage)
        .filter(key => key.startsWith("wishlist-"))
        .map(key => ({
            key: key,
            value: localStorage.getItem(key)
        }));
    return wishlistItemsAdded;
}

function wishlistDisplayAddedItems(wishlistItemsAdded) {
    const wishlistItemsDiv = document.getElementById("wishlistItems");

    wishlistItemsAdded.forEach(wishlistItemAdded => {
        let wishlistItemData = JSON.parse(wishlistItemAdded.value);

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
                <button class="addToCartBtn">Add to Cart</button>
                <button class="removeFromWishlistBtn" onclick="removeWishlistItem(this)">Remove</button>
            </div>
        `;

        wishlistItemDivOut.appendChild(wishlistItemDivIn);
        wishlistItemsDiv.appendChild(wishlistItemDivOut);
    });
}

function removeWishlistItem(wishlistItemToRemove) {
    const wishlistItemTitleToRemove = wishlistItemToRemove.parentElement.previousElementSibling.querySelector('.wishlistItemTitle').textContent;
    const localStorageWishlistKey = "wishlist-";
    const wishlistItemKeyToRemove = localStorageWishlistKey + wishlistItemTitleToRemove;
    if (localStorage.getItem(wishlistItemKeyToRemove)) {
        localStorage.removeItem(wishlistItemKeyToRemove);

        const wishlistItemDivToRemove = wishlistItemToRemove.parentElement.parentElement.parentElement
        wishlistItemDivToRemove.remove();
    }
}