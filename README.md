# Best Quality Store

## Student Information

**Student Name:** [Magagane Masesohlo Hosea]  
**Student Number:** [ST10511877]  
**Course/Programme:** [Web Development]  
**Institution:** [DIS1]  
**Project:** Best Quality Store Website  
**Date:** October 2026  

---

## Project Overview

**Best Quality Store** is an e-commerce website designed for a retail store that sells a variety of quality products, including **shoes and iPhones**.

The purpose of the website is to provide customers with an easy and convenient way to view the products offered by the store, select options, manage a shopping cart, and submit orders or enquiries.

The website is built using HTML, CSS, and JavaScript. It contains multiple pages that allow users to navigate through the store, learn more about the business, view products and services, manage their shopping cart, submit enquiries, and find the physical location of the store.

---

## Website Goals and Objectives

The main goal of the Best Quality Store website is to create a professional, interactive e-commerce web presence for the business.

### Objectives

1. Create a professional website for Best Quality Store.
2. Provide customers with information about the business.
3. Display the different products sold by the store.
4. Allow customers to view product categories such as:
   - Shoes
   - iPhones (Standard, Pro, Pro Max)
5. Provide product selection options where applicable.
6. Allow customers to select shoe sizes.
7. Allow customers to select different iPhone models (Standard, Pro, Pro Max) and storage options with dynamic pricing.
8. Implement an interactive shopping cart with LocalStorage persistence.
9. Implement real-time product search functionality.
10. Provide contact information and store locations.
11. Allow customers to submit validated enquiries and orders.

---

## Key Features and Functionality

### 1. Home Page
Introduces customers to Best Quality Store and provides navigation to other sections.

### 2. About Page
Provides information about Best Quality Store, its purpose, and product offerings.

### 3. Products and Services
Displays product categories:
- Shoes (with size selection)
- iPhones (with Model: Standard, Pro, Pro Max & Storage selection with dynamic pricing)

### 4. Interactive Shopping Cart (JavaScript)
- Add products with customized options (sizes, models, storage) to cart.
- Persistent cart storage using browser `localStorage`.
- Live quantity updates and item removal.
- Clear Cart functionality.
- Real-time total calculation.

### 5. Product Search
Real-time filtering of products as the user types in the search bar.

### 6. Enquiry & Order Form
Form validation and order summary generation upon submission.

---

## Timeline and Milestones

| Stage  | Milestone                                | Status    |
| ------ | ---------------------------------------- | --------- |
| Part 1 | Project planning and website structure   | Completed |
| Part 1 | Create HTML pages                        | Completed |
| Part 1 | Create navigation between pages          | Completed |
| Part 1 | Add business and product information     | Completed |
| Part 1 | Create README.md                         | Completed |
| Part 2 | Improve website design and functionality | Completed |
| Part 2 | Add CSS styling                          | Completed |
| Part 3 | Add JavaScript interactivity & Cart      | Completed |
| Part 3 | Final testing and documentation          | Completed |

---

## Part 1 Details
Part 1 established the basic HTML structure and content of the Best Quality Store website (`index.html`, `about.html`, `services.html`, `contact.html`, `enquiry.html`).

# Part 2 – CSS and Website Design
Part 2 introduced CSS styling (`css/style.css`) to enhance layout, colors, typography, and visual presentation.

# Part 3 – JavaScript Functionality
Part 3 added full client-side interactivity using `js/script.js`:
- **Shopping Cart Management:** Add items, adjust quantities, remove items, clear cart, and calculate totals with `localStorage` persistence.
- **Dynamic Pricing & Variants:** Real-time price updates when selecting iPhone models (Standard, Pro, Pro Max) and storage options.
- **Product Search:** Instant search filter across all products.
- **Form Validation:** Client-side validation for customer enquiries and order submissions.
- **UI Notifications:** Toast alerts for cart actions.

---

## Project Structure

```text
Best-Quality-Store/
│
├── index.html
├── about.html
├── services.html
├── contact.html
├── enquiry.html
├── README.md
│
├── images/
│   └── product-images
│
├── css/
│   └── style.css
│
└── js/
    └── script.js
```

---

## Changelog

### Version 2.0 — October 2026 (Part 3 Update)
- Added full JavaScript interactivity in `js/script.js`.
- Implemented `localStorage` shopping cart with add, remove, quantity update, and clear cart features.
- Added iPhone Model selection (Standard, Pro, Pro Max) from iPhone 11 to 17 with dynamic pricing.
- Added real-time product search filter.
- Added enquiry form validation and order summary alerts.

### Version 1.0 — August 2026 (Parts 1 & 2)
- Initial HTML structure and CSS styling.

---

## Conclusion
The Best Quality Store website provides a complete e-commerce experience with responsive design, product customization (sizes, models, storage), dynamic pricing, live search, and shopping cart management powered by JavaScript.
