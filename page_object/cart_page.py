class CartPage:
    def __init__(self, page, cart_url):
        self.page = page
        self.cart_url = cart_url

        self.cart_item_titles = page.locator(".cartItemTitle")
        self.cart_item_imgs = page.locator(".cartItemHeroImg")
        self.cart_item_quantity_added = page.locator(".cartItemAddedQuantity")

    def open(self):
        self.page.goto(self.cart_url)
