const global_localStorageCartKeyPrefix = "cart-";
const global_localStorageWishlistKeyPrefix = "wishlist-";

function set_checkIfWishlisted_textcontent(singleGames) {
    singleGames.forEach(singleGame => {
        const wishlistBtn = singleGame.nextElementSibling.querySelector('.wishlistBtn');
        if (checkItemStatus(singleGame.textContent, global_localStorageWishlistKeyPrefix)) {
            if (wishlistBtn) {
                wishlistBtn.textContent = "Wishlisted";
            }
        }
        else {
            if (wishlistBtn) {
                wishlistBtn.textContent = "Wishlist";
            }
        }
    });
}

function set_checkIfInCart_textcontent(singleGames) {
    singleGames.forEach(singleGame => {
        const purchaseBtn = singleGame.nextElementSibling.querySelector('.purchaseBtn');
        if (checkItemStatus(singleGame.textContent, global_localStorageCartKeyPrefix)) {
            if (purchaseBtn) {
                purchaseBtn.textContent = "In Cart";
            }
        }
        else {
            if (purchaseBtn) {
                purchaseBtn.textContent = "Add to Cart";
            }
        }
    });
}

function checkItemStatus(itemToCheck, statusToCheck) {
    let storageKey = statusToCheck + itemToCheck;
    if (localStorage.getItem(storageKey)) {
        return true;
    }
    else {
        return false;
    }
}














function wishlistItem(clickedWishlistItemBtn) {
    let storageKey = global_localStorageWishlistKeyPrefix + clickedWishlistItemBtn.title;
    localStorage.setItem(storageKey, JSON.stringify(clickedWishlistItemBtn));
    console.log(`"${clickedWishlistItemBtn.title}" wishlisted!`)
}

function addItemToCart(itemAdded) {
    let storageKey = global_localStorageCartKeyPrefix + itemAdded.title;
    localStorage.setItem(storageKey, JSON.stringify(itemAdded));
    console.log(`"${itemAdded.title}" is already added to cart!`);
}

function getItemQuantityAddedToCart(ItemTitleAddToCart) {
    const ItemQuantityToGet = global_localStorageCartKeyPrefix + ItemTitleAddToCart;

    if (checkItemStatus(ItemTitleAddToCart, global_localStorageCartKeyPrefix)) {
        const ItemQuantityToAddToCartQuantity = JSON.parse(localStorage.getItem(ItemQuantityToGet)).quantity;
        return ItemQuantityToAddToCartQuantity + 1;
    }
    else {
        return 1;
    }
}