class CartPage:
    def __init__(self, page, cart_url):
        self.page = page
        self.cart_url = cart_url

        self.cartItem_titles = page.locator(".cartItemTitle")
        self.cartItem_imgs = page.locator(".cartItemHeroImg")
        self.cartItem_quantities_added = page.locator(".cartItemAddedQuantity")
        self.cartItem_wishlistBtns = page.locator(".cart_wishlistBtn")
        self.cartItem_removeFromCartBtns = page.locator(".removeFromCartBtn")

    def open(self):
        self.page.goto(self.cart_url)
