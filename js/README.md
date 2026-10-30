# JavaScript

`script.js` contains all client-side logic for BQS Web.

## Functions

- `getCart()` / `saveCart()` - load/save cart from localStorage
- `addToCart(id, name, price)` - add or increment product
- `removeFromCart(id)` - remove product
- `changeQty(id, qty)` - update quantity
- `clearCart()` - empty cart
- `cartTotals(cart)` - count and total
- `updateCartUI()` - refresh cart count/total/items
- `showToast(msg)` - notification
- `setupEnquiryForm()` - form validation & submit
- `setupSearch()` - product filter
- `markActiveNav()` - highlight current page
