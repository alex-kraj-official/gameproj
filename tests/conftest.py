import pytest
from pathlib import Path  # This pytest library need to handle file paths

# "__file__" variable stores the currently opened file's full path.
# "SITES_DIR" stores the "sites" dir where the html files are.
HTML_DIR = Path(__file__).parent.parent / "app" / "html"

index_html_filename = "index.html"
wishlist_html_filename = "wishlist.html"
cart_html_filename = "cart.html"

# These fixtures below make the full path for all html files, stored in the SITES_DIR (variable above)
# ".as_uri" command makes the full path recognizable for browsers:
# ( they need this format: file:///*full_path...* )
# URI: Uniform Resource Identifier:
# A character sequence which uniquely identifies a physical (file) or
# abstract resource (namespace, colorcode, version number, etc.).
# (Every URL is a URI btw)


# pytest calls this function automatically once, before any test runs.
# If an html file is missing, pytest.exit stops the whole run with one short message.
def pytest_sessionstart(session):
    for html_filename in [
        index_html_filename,
        wishlist_html_filename,
        cart_html_filename,
    ]:
        html_file = HTML_DIR / html_filename
        if not html_file.exists():
            pytest.exit(
                f"STOPPING: {html_filename} not found at: {html_file}", returncode=2
            )


@pytest.fixture
def index_url():
    index_file = HTML_DIR / index_html_filename
    return index_file.as_uri()


@pytest.fixture
def wishlist_url():
    wishlist_file = HTML_DIR / wishlist_html_filename
    return wishlist_file.as_uri()


@pytest.fixture
def cart_url():
    cart_file = HTML_DIR / cart_html_filename
    return cart_file.as_uri()


# autouse=True means run this fixture for every tests automatically
# page is defined automatically by pytest-playwright package. It stores the currently opened browser tab.
# yield is a "break" for the fixture. Before yield: runs before tests. After yield: runs after tests.
# page.evaluate: runs js code in the opened browser. It's important to run to not inherit the previous test's localstorage state.
@pytest.fixture(autouse=True)
def clear_storage(page):
    yield
    page.evaluate("localStorage.clear()")
