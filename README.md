# E-commerce Product Filter System

A React-based product filtering system with advanced search and filter capabilities.

## Features

- Product search with debounced
input
- Multiple filter options:
  - Category filtering
  - Brand filtering
  - Price range selection
  - Rating filter
  - Sort by different criteria
- Responsive product grid layout
- Pagination support
- Real-time filter updates

## Tech Stack

- React
- MUI
- SCSS
- Jest & React Testing Library for testing

## Project Structure

```
src/
├── components/          # React components
│   ├── FilterSidebar/  # Filter controls
│   ├── ProductGrid/    # Product display
│   └── Category/       # UI components 
│   └── PriceRangeSlider/       # UI components 
│   └── ProductCard/       # UI components 
├── hooks/             # Custom React hooks
├── services/             # API for fetch data
└── __tests__/        # Test files
```

## Getting Started

1. Clone the repository:

```bash
git clone <https://github.com/Valentina-Baghdasaryan/dynamic-product-filter.git>
```
2. Install dependencies:

```bash
npm install
```
3. Runs the app in the development mode.

```bash
npm start
```

4. Run tests:

```bash
npm test
```

## Testing

The project includes comprehensive tests for components and hooks:
- FilterSidebar component tests
- ProductGrid component tests
- useFilters hook tests



