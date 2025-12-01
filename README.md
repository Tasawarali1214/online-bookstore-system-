<<<<<<< HEAD
# online-bookstore-system
=======
# BookVerse - Premium Online Bookstore

A fully responsive, modern, and clean website for an online bookstore with a premium design featuring smooth animations, balanced colors, and a professional layout suitable for desktop, tablet, and mobile devices.

## Features

### Pages
- **Home Page** - Hero section, featured books, categories, testimonials, newsletter, and footer
- **Shop Page** - Responsive grid of books with filters (genre, price, rating), search bar, and pagination
- **Book Detail Page** - Large book cover, title, author, rating, description, price, Add to Cart button, and related books
- **Cart Page** - Book list with quantity controls, total price calculation, and checkout button
- **About Page** - Mission, story, team members, and company values
- **Contact Page** - Contact form with validation, Google Maps placeholder, and contact information
- **Login/Sign Up Pages** - Clean form UI with validation

### Design Features
- 100% responsive design for all screen sizes
- Elegant color theme: White + Dark Blue (#1a237e) + Gold accent (#ffd700)
- Modern typography using Poppins font
- Smooth fade-in animations
- Sticky navbar with smooth scroll
- Beautiful footer with social links
- Card-style UI with hover effects
- Professional spacing and layout

### Functionality
- Working mobile menu
- Search bar functionality
- Book filter system (genre, price, rating)
- Add to cart (front-end with localStorage)
- Form validation
- Responsive images
- Pagination for shop page
- Shopping cart management

## Project Structure

```
bookstore/
├── index.html          # Home page
├── shop.html           # Shop page with filters
├── book-detail.html    # Individual book details
├── cart.html           # Shopping cart
├── about.html          # About us page
├── contact.html        # Contact page
├── login.html          # Login page
├── signup.html         # Sign up page
├── css/
│   └── style.css       # Main stylesheet
├── js/
│   ├── main.js         # Main JavaScript (navigation, forms, animations)
│   ├── cart.js         # Shopping cart functionality
│   └── shop.js         # Shop page filters and pagination
└── README.md           # Project documentation
```

## Getting Started

1. Clone or download the project
2. Open `index.html` in a web browser
3. No build process or dependencies required - pure HTML, CSS, and JavaScript

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Color Scheme

- **Primary Color (Dark Blue)**: `#1a237e`
- **Secondary Color (Gold)**: `#ffd700`
- **Accent Color**: `#3949ab`
- **Text Dark**: `#1a1a1a`
- **Text Light**: `#666`
- **Background Light**: `#f5f5f5`
- **White**: `#ffffff`

## Key Features Explained

### Responsive Design
The website uses CSS Grid and Flexbox for responsive layouts. Breakpoints:
- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: < 768px

### Shopping Cart
The cart uses localStorage to persist data across page reloads. Cart functionality includes:
- Add items
- Update quantities
- Remove items
- Calculate totals (subtotal, tax, shipping)

### Form Validation
All forms include client-side validation:
- Required field checking
- Email format validation
- Password strength requirements
- Real-time error messages

### Animations
Smooth fade-in animations are applied to:
- Book cards
- Category cards
- Testimonial cards
- Team member cards
- Value cards

## Customization

### Adding Books
Edit the `allBooks` array in `js/shop.js` to add more books. Each book should have:
- id
- title
- author
- price
- genre
- rating
- image

### Modifying Colors
Update CSS variables in `css/style.css`:
```css
:root {
    --primary-color: #1a237e;
    --secondary-color: #ffd700;
    --accent-color: #3949ab;
    /* ... */
}
```

### Changing Font
Update the Google Fonts link in HTML files and the `--font-primary` variable in CSS.

## Notes

- This is a front-end only implementation
- Backend integration would be required for:
  - User authentication
  - Payment processing
  - Order management
  - Database integration
- Images use placeholder URLs - replace with actual book cover images
- Google Maps integration placeholder is included but requires API key

## License

This project is created for demonstration purposes.

## Author

BookVerse - Premium Online Bookstore Template



>>>>>>> a2311f8 (this is the new project of online book store)
