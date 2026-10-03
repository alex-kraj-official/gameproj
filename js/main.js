function mainOnLoadFunc() {
    // localStorage.clear();
    const homepage_allGameTitle_elements =
        [...document.getElementsByClassName('homepageItemTitle')];
    const wishlist_allGameTitle_elements =
        [...document.getElementsByClassName('wishlistItemTitle')];
    const cart_allGameTitles_elements =
        [...document.getElementsByClassName('cartItemTitle')];

    const allGameTitleElementsToCheck = [
        ...homepage_allGameTitle_elements,
        ...wishlist_allGameTitle_elements,
        ...cart_allGameTitles_elements
    ];

    setBtntextcontent_checkIfWishlisted(allGameTitleElementsToCheck);
    setBtntextcontent_checkIfInCart(allGameTitleElementsToCheck);
}

const global_localStorageCartKeyPrefix = "cart-";
const global_localStorageWishlistKeyPrefix = "wishlist-";

function setBtntextcontent_checkIfWishlisted(allGameTitleElementsToCheck) {
    allGameTitleElementsToCheck.forEach(singleGameTitleElementToCheck => {
        let wishlistBtnToSet;
        switch (singleGameTitleElementToCheck.className) {
            case "homepageItemTitle":
                wishlistBtnToSet = singleGameTitleElementToCheck.nextElementSibling.querySelector('.homepage_wishlistBtn');
                break;
            case "cartItemTitle":
                wishlistBtnToSet = singleGameTitleElementToCheck.parentElement.parentElement.nextElementSibling.querySelector('.cart_wishlistBtn');
                break;
            default:
                break;
        }
        if (checkItemStatus(singleGameTitleElementToCheck.textContent, global_localStorageWishlistKeyPrefix)) {
            if (wishlistBtnToSet != undefined) {
                wishlistBtnToSet.textContent = "Wishlisted";
            }
        }
        else {
            if (wishlistBtnToSet != undefined) {
                wishlistBtnToSet.textContent = "Wishlist";
            }
        }
    });
}

function setBtntextcontent_checkIfInCart(allGameTitleElementsToCheck) {
    allGameTitleElementsToCheck.forEach(singleGameTitleElementToCheck => {
        let addToCartBtnToSet;
        switch (singleGameTitleElementToCheck.className) {
            case "homepageItemTitle":
                addToCartBtnToSet = singleGameTitleElementToCheck.nextElementSibling.querySelector('.homepage_addToCartBtn');
                break;
            case "wishlistItemTitle":
                addToCartBtnToSet = singleGameTitleElementToCheck.parentElement.parentElement.nextElementSibling.querySelector('.wishlist_addToCartBtn');
                break;
            default:
                break;
        }
        if (checkItemStatus(singleGameTitleElementToCheck.textContent, global_localStorageCartKeyPrefix)) {
            if (addToCartBtnToSet != undefined) {
                addToCartBtnToSet.textContent = "In cart";
            }
        }
        else {
            if (addToCartBtnToSet != undefined) {
                addToCartBtnToSet.textContent = "Add to cart";
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
    console.log(`"${clickedWishlistItemBtn.title}" wishlisted!`);
}

function addToCartItem(clickedAddToCartItemBtn) {
    let storageKey = global_localStorageCartKeyPrefix + clickedAddToCartItemBtn.title;
    localStorage.setItem(storageKey, JSON.stringify(clickedAddToCartItemBtn));

    console.log(`${wishlistedItemValueAddToCart.title} added to the cart!`);
    if (checkItemStatus(wishlistedItemTitleAddToCart, global_localStorageCartKeyPrefix)) {
        console.log(`This item has been added to the cart already! (${wishlistedItemValueAddToCart.title})`);
    }
    console.log("quantity", wishlistedItemValueAddToCart.quantity);
}

function getQuantityAddedToCartItem(ItemTitleAddedToCart) {
    const ItemQuantityToGet = global_localStorageCartKeyPrefix + ItemTitleAddedToCart;

    if (checkItemStatus(ItemTitleAddedToCart, global_localStorageCartKeyPrefix)) {
        const ItemQuantityToAddToCartQuantity = JSON.parse(localStorage.getItem(ItemQuantityToGet)).quantity;
        return ItemQuantityToAddToCartQuantity + 1;
    }
    else {
        return 1;
    }
}