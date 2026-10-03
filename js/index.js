function indexOnloadFunc() {

}

function homepage_wishlistBtnClicked(clickedWishlistItemBtn) {
    const wishlistedItemTitle = clickedWishlistItemBtn.parentElement.previousElementSibling.textContent;
    const wishlistedItemHeroImgSrc = clickedWishlistItemBtn.parentElement.parentElement.previousElementSibling.querySelector(".homepageItemHeroImg").src

    const itemWishlisted = {
        title: wishlistedItemTitle,
        img: wishlistedItemHeroImgSrc
    };

    clickedWishlistItemBtn.textContent = "Wishlisted";

    wishlistItem(itemWishlisted);
}

function homepage_addToCartBtnClicked(clickedPurchaseBtn) {
    const gamePurchased = clickedPurchaseBtn.closest('.homepageItemDivIn');

    const itemAdded = {
        title: null,
        img: null,
        quantity: 0
    };

    itemAdded.img = gamePurchased.querySelector(".homepageItemHeroImg").src;
    itemAdded.title = gamePurchased.querySelector(".homepageItemTitle").textContent;

    itemAdded.quantity = getQuantityAddedToCartItem(itemAdded.title);

    clickedPurchaseBtn.textContent = "In Cart";

    if (checkItemStatus(itemAdded.title, global_localStorageCartKeyPrefix)) {
        console.log("This item has been added to the cart already!");
    }
    else {
        console.log("title", itemAdded.title);
        console.log("img", itemAdded.img);
        console.log("quantity", itemAdded.quantity);
    }

    addToCartItem(itemAdded);
}