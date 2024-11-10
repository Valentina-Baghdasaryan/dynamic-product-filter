import React, { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useMediaQuery } from '@mui/material';
import ProductGrid from './components/ProductGrid';
import { useFilters } from './hooks/useFilter.js';
import FilterSidebar from './components/FilterSidebar/index.jsx';

import './App.scss';
import './index.scss';
import { fetchProducts } from './services/api.js';

const drawerWidth = 320;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
      },
    },
  ],
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery('(max-width:768px)');
  const { filters, setFilters, filteredProducts } = useFilters(products);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        setError('Failed to load products.');
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const categories = Array.from(
    new Set(products.map((product) => product.category)),
  );
  const brands = Array.from(new Set(products.map((product) => product.brand)));

  if (error) return <p className="errorMessage">{error}</p>;

  return (
    <Box>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        style={{ background: 'rgb(221, 195, 195)' }}
      >
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h2 className="headerTitle">Product Catalog</h2>
          {isSmallScreen && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerOpen}
              sx={[open && { display: 'none' }]}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <div open={open}>
        <DrawerHeader />
        <div className="main">
          {!isSmallScreen && (
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              categories={categories}
              brands={brands}
            />
          )}
          {loading ? (
            <p className="loadingProducts">Loading products...</p>
          ) : (
            <ProductGrid products={filteredProducts} />
          )}
        </div>
      </div>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <FilterSidebar
          filters={filters}
          setFilters={setFilters}
          categories={categories}
          brands={brands}
        />
      </Drawer>
    </Box>
  );
}

export default App;
