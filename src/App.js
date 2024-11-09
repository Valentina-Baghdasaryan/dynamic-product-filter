import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useMediaQuery } from '@mui/material';
import { products } from './data/products.js';
import './App.scss';
import './index.scss';
import ProductGrid from './components/ProductGrid';
import { useFilters } from './hooks/useFilter.js';
import FilterSidebar from './components/FilterSidebar/index.jsx';

const drawerWidth = 340;

// const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme }) => ({
//     display: 'flex',
//     paddingTop: theme.spacing(2),
//     transition: theme.transitions.create('margin', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     marginRight: -drawerWidth,
//     position: 'relative',
//     variants: [
//       {
//         props: ({ open }) => open,
//         style: {
//           transition: theme.transitions.create('margin', {
//             easing: theme.transitions.easing.easeOut,
//             duration: theme.transitions.duration.enteringScreen,
//           }),
//           marginRight: 0,
//         },
//       },
//     ],
//   }),
// );

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
  const isSmallScreen = useMediaQuery('(max-width:768px)');
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const { filters, setFilters, filteredProducts } = useFilters(products);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const itemsPerPage = 6
  const categories = Array.from(
    new Set(products.map((product) => product.category)),
  );
  const brands = Array.from(new Set(products.map((product) => product.brand)));
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );


  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };
  return (
    <Box >
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        style={{ background: 'rgb(221, 195, 195)' }}
      >
        <Toolbar style={{display: 'flex', justifyContent: 'space-between'}}>
          <h2 className="headerTitle">Product Catalog</h2>
          {isSmallScreen && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              // style={{display: isSmallScreen ? 'block' : 'none'}}
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
          {!isSmallScreen && <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            categories={categories}
            brands={brands}
          />}
          <div>
          <ProductGrid products={currentProducts} />

          {products.length && totalPages >= 2 && (
        <div className={'pagination'}>
          <button onClick={handlePrevious} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={handleNext} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}
          </div>
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
        <DrawerHeader style={{ backgroundColor: 'yellow' }}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        {/* <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
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
