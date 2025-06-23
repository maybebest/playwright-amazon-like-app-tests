export class TestData {
  // URLs
  static readonly BASE_URL = '/';
  static readonly PRODUCTS_URL = '/products';
  static readonly PRODUCT_DETAILS_URL = '/product_details/1';

  // Test Messages
  static readonly PRODUCT_NAME_NOT_FOUND = 'Product name not found';
  static readonly PRODUCT_DETAILS_NOT_LOADED =
    'Product details page not loaded';
  static readonly SEARCH_RESULTS_NOT_FOUND = 'Search results not found';
  static readonly CART_EMPTY_MESSAGE = 'Cart is empty';

  // Expected Text
  static readonly ALL_PRODUCTS_HEADING = 'All Products';
  static readonly VIEW_PRODUCT_BUTTON = 'View Product';
  static readonly SEARCHED_PRODUCTS_HEADING = 'Searched Products';
  static readonly NEW_USER_SIGNUP_HEADING = 'New User Signup!';
  static readonly LOGIN_ACCOUNT_HEADING = 'Login to your account';
  static readonly ACCOUNT_CREATED_MESSAGE = 'Account Created!';
  static readonly ENTER_ACCOUNT_INFORMATION_MESSAGE =
    'Enter Account Information';
  static readonly ACCOUNT_DELETED_MESSAGE = 'ACCOUNT DELETED!';
  static readonly WOMEN_DRESS_PRODUCTS = 'Women - Dress Products';
  static readonly MEN_TSHIRTS_PRODUCTS = 'Men - Tshirts Products';
  static readonly ORDER_PLACED_MESSAGE = 'Order Placed!';
  static readonly INCORRECT_CREENTIALS = 'Your email or password is incorrect!';

  // Search Data
  static readonly SEARCH_KEYWORD = 'Top';
  static readonly SEARCH_ITEMS = ['Dress', 'Shirt', 'Jeans'];
  static readonly SEARCH_INPUT_ID = 'search_product';
  static readonly SEARCH_SUBMIT_ID = 'submit_search';

  // Cart Data
  static readonly CART_QUANTITY = '4';
  static readonly CART_ITEM_COUNT = 2;

  // User Data
  static readonly TEST_USER_NAME = 'TestUser';
  static readonly EXISTING_USER_NAME = 'ExistingUser';
  static readonly TEST_USER_PASSWORD = 'test123';
  static readonly TEST_USER_FIRST_NAME = 'Test';
  static readonly TEST_USER_LAST_NAME = 'User';
  static readonly TEST_USER_COMPANY = 'TestCompany';
  static readonly TEST_USER_ADDRESS1 = '123 Test St';
  static readonly TEST_USER_ADDRESS2 = 'Suite 1';
  static readonly TEST_USER_STATE = 'TestState';
  static readonly TEST_USER_CITY = 'TestCity';
  static readonly TEST_USER_ZIPCODE = '12345';
  static readonly TEST_USER_MOBILE = '1234567890';

  // Checkout Data
  static readonly CHECKOUT_USER_NAME = 'CheckoutUser';
  static readonly CHECKOUT_USER_EMAIL = 'checkout_user@example.com';
  static readonly CHECKOUT_USER_PASSWORD = 'test123';
  static readonly CHECKOUT_USER_FIRST_NAME = 'Checkout';
  static readonly CHECKOUT_USER_LAST_NAME = 'User';
  static readonly CHECKOUT_USER_COMPANY = 'TestCo';
  static readonly CHECKOUT_USER_ADDRESS1 = '12 Checkout Ave';
  static readonly CHECKOUT_USER_ZIPCODE = '22222';
  static readonly CHECKOUT_USER_MOBILE = '2222222222';
  static readonly ORDER_MESSAGE = 'Please deliver between 9am-5pm.';
  static readonly PAYMENT_NAME_ON_CARD = 'Checkout User';
  static readonly PAYMENT_CARD_NUMBER = '4111111111111111';
  static readonly PAYMENT_CVC = '123';
  static readonly PAYMENT_EXPIRY_MONTH = '12';
  static readonly PAYMENT_EXPIRY_YEAR = '2025';

  // Navigation Data
  static readonly CATEGORY_WOMEN = 'Women';
  static readonly CATEGORY_MEN = 'Men';
  static readonly SUB_CATEGORY_DRESS = 'Dress';
  static readonly SUB_CATEGORY_TSHIRTS = 'Tshirts';

  // Timeouts
  static readonly DEFAULT_TIMEOUT = 5000;
  static readonly PAGE_LOAD_TIMEOUT = 10000;
  static readonly ELEMENT_WAIT_TIMEOUT = 3000;

  // API Endpoints
  static readonly CREATE_ACCOUNT_API = '/api/createAccount';
}
