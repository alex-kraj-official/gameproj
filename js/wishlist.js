function wishlistOnLoadFunc() {
    const wishlistItemsAdded = wishlistGetAddedItems();
    // localStorage.clear();
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
                <button class="addToCartBtn" onclick="wishlist_addToCartBtnClicked(this)">Add to Cart</button>
                <button class="removeFromWishlistBtn" onclick="removeWishlistItem(this)">Remove</button>
            </div>
        `;

        wishlistItemDivOut.appendChild(wishlistItemDivIn);
        wishlistItemsDiv.appendChild(wishlistItemDivOut);
    });
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























function wishlist_addToCartBtnClicked(wishlistedItemAddToCart) {
    const wishlistedItemTitleAddToCart = wishlistedItemAddToCart.parentElement.previousElementSibling.querySelector('.wishlistItemTitle').textContent;
    const wishlistedItemKeyAddToCart = global_localStorageCartKeyPrefix + wishlistedItemTitleAddToCart;

    const wishlistedItemValueAddToCart = {
        title: wishlistedItemTitleAddToCart,
        img: wishlistedItemAddToCart.parentElement.previousElementSibling.querySelector(".wishlistItemHeroImg").getAttribute("src"),
        quantity: 0
    };

    if (checkItemStatus(wishlistedItemTitleAddToCart, global_localStorageCartKeyPrefix)) {
        console.log("This item has been added to the cart already!");
    }
    else {
        console.log("title", wishlistedItemValueAddToCart.title);
        console.log("img", wishlistedItemValueAddToCart.img);
        console.log("quantity", wishlistedItemValueAddToCart.quantity);
    }

    wishlistedItemValueAddToCart.quantity = getItemQuantityAddedToCart(wishlistedItemTitleAddToCart);

    localStorage.setItem(wishlistedItemKeyAddToCart, JSON.stringify(wishlistedItemValueAddToCart));
    wishlistedItemAddToCart.textContent = "In Cart";
}