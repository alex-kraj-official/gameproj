class IndexPage:
    def __init__(self, page, index_url):
        # page: the browser tab from pytest-playwright
        # index_url: the file:/// address from the fixture in conftest.py
        self.page = page
        self.index_url = index_url

        # Locators: they only describe WHERE the elements are.
        # Playwright looks for them when they are used, not here.
        self.game_titles = page.locator(".homepageItemTitle")
        self.game_imgs = page.locator(".homepageItemHeroImg")

    def open(self):
        self.page.goto(self.index_url)

    def get_img_natural_width(self, index):
        # Returns the loaded width of the index-th image.
        # It is 0 if the image is missing or broken.
        return self.game_imgs.nth(index).evaluate("element => element.naturalWidth")
