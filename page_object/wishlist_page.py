class WishlistPage:
    def __init__(self, page, wishlist_url):
        self.page = page
        self.wishlist_url = wishlist_url

        self.wishlistItem_titles = page.locator(".wishlistItemTitle")
        self.wishlistItem_imgs = page.locator(".wishlistItemHeroImg")
        self.wishlistItem_addToCartBtns = page.locator(".wishlist_addToCartBtn")
        self.wishlistItem_removeFromWishlistBtns = page.locator(
            ".removeFromWishlistBtn"
        )

    def open(self):
        self.page.goto(self.wishlist_url)