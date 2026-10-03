function indexOnloadFunc() {

}

function homepage_wishlistBtnClicked(clickedWishlistBtn) {
    const item_title_toWishlist = clickedWishlistBtn.parentElement.previousElementSibling.textContent;
    const item_imgSrc_toWishlist = clickedWishlistBtn.parentElement.parentElement.previousElementSibling.querySelector(".homepageItemHeroImg").src

    const itemData_toWishlist = {
        title: item_title_toWishlist,
        imgSrc: item_imgSrc_toWishlist
    };

    clickedWishlistBtn.textContent = wishlistedItemBtn_textContent;

    wishlistItem(itemData_toWishlist);
}

function homepage_addToCartBtnClicked(clickedAddToCartBtn) {
    const item_title_toAddToCart = clickedAddToCartBtn.parentElement.previousElementSibling.textContent;
    const item_imgSrc_toAddToCart = clickedAddToCartBtn.parentElement.parentElement.previousElementSibling.querySelector(".homepageItemHeroImg").src;

    const item_quantity_toAddToCart = getQuantityAddedToCartItem(item_title_toAddToCart);

    const itemData_toAddToCart = {
        title: item_title_toAddToCart,
        imgSrc: item_imgSrc_toAddToCart,
        quantity: item_quantity_toAddToCart
    };

    console.log(itemData_toAddToCart.imgSrc);

    clickedAddToCartBtn.textContent = AddedToCartItemBtn_textContent;

    addToCartItem(itemData_toAddToCart);
}