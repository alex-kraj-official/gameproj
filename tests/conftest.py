import pytest
from pathlib import Path # To handle file paths

# __file__ var stores the currently running file's full path. SITES_DIR stores the sites dir where the html files are.
SITES_DIR = Path(__file__).parent.parent / "sites"

# makes the full path for all html files
# .as_uri makes the full path recognizable for browsers ( they need file:///full_path )
@pytest.fixture
def index_url():
    return (SITES_DIR / "index.html").as_uri()


@pytest.fixture
def wishlist_url():
    return (SITES_DIR / "wishlist.html").as_uri()


@pytest.fixture
def cart_url():
    return (SITES_DIR / "cart.html").as_uri()

# autouse=True means run this fixture for every tests automatically
# page is defined automatically by pytest-playwright package. It stores the currently opened browser tab.
# yield is a "break" for the fixture. Before yield: runs before tests. After yield: runs after tests.
# page.evaluate: runs js code in the opened browser. It's important to run to not inherit the previous test's state.
@pytest.fixture(autouse=True)
def clear_storage(page):
    yield
    page.evaluate("localStorage.clear()")