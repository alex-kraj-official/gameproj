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

function wishlistItem(itemData_toWishlist) {
    if (checkItemStatus(itemData_toWishlist.title, global_localStorageWishlistKeyPrefix)) {
        console.log(`"${itemData_toWishlist.title}" is already wishlisted!`);
    }
    else {
        let storageKey = global_localStorageWishlistKeyPrefix + itemData_toWishlist.title;
        localStorage.setItem(storageKey, JSON.stringify(itemData_toWishlist));
        console.log(`"${itemData_toWishlist.title}" wishlisted!`);
    }
}

function addToCartItem(itemData_toAddToCart) {
    if (checkItemStatus(itemData_toAddToCart.title, global_localStorageCartKeyPrefix)) {
        console.log(`${itemData_toAddToCart.title} is already added to the cart!`);
    }

    let storageKey = global_localStorageCartKeyPrefix + itemData_toAddToCart.title;
    localStorage.setItem(storageKey, JSON.stringify(itemData_toAddToCart));

    console.log(`${itemData_toAddToCart.title} added to the cart!`);
    console.log("quantity", itemData_toAddToCart.quantity);
}

function getQuantityAddedToCartItem(item_title_ToAddToCart) {
    const item_quantity_ToGet = global_localStorageCartKeyPrefix + item_title_ToAddToCart;

    if (checkItemStatus(item_title_ToAddToCart, global_localStorageCartKeyPrefix)) {
        const item_quantity_ToAddToCart = JSON.parse(localStorage.getItem(item_quantity_ToGet)).quantity;
        return item_quantity_ToAddToCart + 1;
    }
    else {
        return 1;
    }
}