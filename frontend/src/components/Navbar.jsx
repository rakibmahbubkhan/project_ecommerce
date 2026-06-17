import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
  Menu,
  MenuItem,
  Avatar,
  Container,
  TextField,
  InputAdornment,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useScrollTrigger,
  Slide,
  Chip,
} from '@mui/material';
import {
  ShoppingCart,
  Person,
  Search,
  Menu as MenuIcon,
  Home,
  Category,
  Dashboard,
  ExitToApp,
  Login,
  PersonAdd,
  Bolt,
  Close,
} from '@mui/icons-material';
import { logout } from '../store/authSlice';

// Hide on scroll navbar
function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { totalQuantity } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
    navigate('/');
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/products?search=${searchQuery.trim()}`);
      setSearchQuery('');
    }
  };

  // Navigation links
  const navLinks = [
    { label: 'Home', path: '/', icon: <Home /> },
    { label: 'Products', path: '/products', icon: <Category /> },
  ];

  // Mobile drawer content
  const drawerContent = (
    <Box sx={{ width: 280, bgcolor: '#0a1628', height: '100%', color: 'white' }}>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 800, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Bolt sx={{ color: '#FF6B35' }} />
          ElectroHub
        </Typography>
        <IconButton onClick={() => setMobileDrawerOpen(false)} sx={{ color: 'white' }}>
          <Close />
        </IconButton>
      </Box>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
      <List>
        {navLinks.map((link) => (
          <ListItem
            button
            key={link.label}
            onClick={() => {
              navigate(link.path);
              setMobileDrawerOpen(false);
            }}
            sx={{ '&:hover': { bgcolor: 'rgba(255,107,53,0.1)' } }}
          >
            <ListItemIcon sx={{ color: '#FF6B35' }}>{link.icon}</ListItemIcon>
            <ListItemText primary={link.label} />
          </ListItem>
        ))}
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
        
        {isAuthenticated ? (
          <>
            <ListItem button onClick={() => { navigate('/profile'); setMobileDrawerOpen(false); }}>
              <ListItemIcon sx={{ color: '#00D4FF' }}><Person /></ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem button onClick={() => { navigate('/orders'); setMobileDrawerOpen(false); }}>
              <ListItemIcon sx={{ color: '#00D4FF' }}><ShoppingCart /></ListItemIcon>
              <ListItemText primary="My Orders" />
            </ListItem>
            {user?.role === 'admin' && (
              <ListItem button onClick={() => { navigate('/admin'); setMobileDrawerOpen(false); }}>
                <ListItemIcon sx={{ color: '#FFD700' }}><Dashboard /></ListItemIcon>
                <ListItemText primary="Admin Dashboard" />
              </ListItem>
            )}
            <ListItem button onClick={handleLogout}>
              <ListItemIcon sx={{ color: '#ff4444' }}><ExitToApp /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem button onClick={() => { navigate('/login'); setMobileDrawerOpen(false); }}>
              <ListItemIcon sx={{ color: '#00D4FF' }}><Login /></ListItemIcon>
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem button onClick={() => { navigate('/register'); setMobileDrawerOpen(false); }}>
              <ListItemIcon sx={{ color: '#00D4FF' }}><PersonAdd /></ListItemIcon>
              <ListItemText primary="Register" />
            </ListItem>
          </>
        )}
      </List>
      
      <Box sx={{ p: 2, mt: 'auto', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <Typography variant="caption" sx={{ opacity: 0.6 }}>
          © 2024 ElectroHub. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      <HideOnScroll>
        <AppBar
          position="sticky"
          sx={{
            bgcolor: 'rgba(10, 22, 40, 0.95)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 30px rgba(0,0,0,0.3)',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          <Container maxWidth="xl">
            <Toolbar sx={{ px: { xs: 0, sm: 2 }, minHeight: { xs: 64, sm: 72 } }}>
              {/* Mobile Menu Button */}
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => setMobileDrawerOpen(true)}
                sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
              >
                <MenuIcon />
              </IconButton>

              {/* Logo */}
              <Typography
                variant="h6"
                component={RouterLink}
                to="/"
                sx={{
                  flexGrow: { xs: 1, md: 0 },
                  textDecoration: 'none',
                  color: 'white',
                  fontWeight: 800,
                  fontSize: { xs: '1.1rem', sm: '1.3rem' },
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  '&:hover': { color: '#FF6B35' },
                  transition: 'color 0.3s',
                }}
              >
                <Bolt sx={{ color: '#FF6B35', fontSize: { xs: 20, sm: 28 } }} />
                <span>ElectroHub</span>
                <Chip
                  label="PRO"
                  size="small"
                  sx={{
                    ml: 1,
                    bgcolor: '#FF6B35',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '0.6rem',
                    height: 20,
                    display: { xs: 'none', sm: 'flex' },
                  }}
                />
              </Typography>

              {/* Desktop Navigation Links */}
              <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 4, gap: 1 }}>
                {navLinks.map((link) => (
                  <Button
                    key={link.label}
                    component={RouterLink}
                    to={link.path}
                    sx={{
                      color: 'rgba(255,255,255,0.8)',
                      '&:hover': {
                        color: '#FF6B35',
                        bgcolor: 'rgba(255,107,53,0.1)',
                      },
                      fontWeight: 600,
                      px: 2,
                      borderRadius: '8px',
                    }}
                  >
                    {link.label}
                  </Button>
                ))}
              </Box>

              {/* Search Bar - Desktop */}
              <TextField
                size="small"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleSearch}
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  width: 200,
                  ml: 2,
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    '& fieldset': {
                      borderColor: 'rgba(255,255,255,0.2)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255,107,53,0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#FF6B35',
                    },
                  },
                }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search sx={{ color: 'rgba(255,255,255,0.5)' }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <Box sx={{ flexGrow: 1 }} />

              {/* Cart Button */}
              <IconButton
                component={RouterLink}
                to="/cart"
                color="inherit"
                sx={{
                  position: 'relative',
                  '&:hover': { color: '#FF6B35' },
                  transition: 'color 0.3s',
                }}
              >
                <Badge
                  badgeContent={totalQuantity}
                  color="error"
                  sx={{
                    '& .MuiBadge-badge': {
                      bgcolor: '#FF6B35',
                      color: 'white',
                      fontWeight: 'bold',
                    },
                  }}
                >
                  <ShoppingCart />
                </Badge>
              </IconButton>

              {/* User Menu */}
              {isAuthenticated ? (
                <Box>
                  <IconButton
                    onClick={handleMenu}
                    color="inherit"
                    sx={{ ml: 1, '&:hover': { color: '#FF6B35' } }}
                  >
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: '#FF6B35',
                        fontWeight: 'bold',
                      }}
                    >
                      {user?.firstName?.[0] || user?.email?.[0] || 'U'}
                    </Avatar>
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    PaperProps={{
                      sx: {
                        bgcolor: '#0a1628',
                        color: 'white',
                        minWidth: 200,
                        mt: 1,
                        borderRadius: 2,
                        border: '1px solid rgba(255,255,255,0.05)',
                        '& .MuiMenuItem-root': {
                          '&:hover': {
                            bgcolor: 'rgba(255,107,53,0.1)',
                          },
                        },
                      },
                    }}
                  >
                    <MenuItem
                      onClick={() => { handleClose(); navigate('/profile'); }}
                      sx={{ gap: 1 }}
                    >
                      <Person fontSize="small" sx={{ color: '#00D4FF' }} />
                      Profile
                    </MenuItem>
                    <MenuItem
                      onClick={() => { handleClose(); navigate('/orders'); }}
                      sx={{ gap: 1 }}
                    >
                      <ShoppingCart fontSize="small" sx={{ color: '#00D4FF' }} />
                      My Orders
                    </MenuItem>
                    {user?.role === 'admin' && (
                      <MenuItem
                        onClick={() => { handleClose(); navigate('/admin'); }}
                        sx={{ gap: 1 }}
                      >
                        <Dashboard fontSize="small" sx={{ color: '#FFD700' }} />
                        Admin Dashboard
                      </MenuItem>
                    )}
                    <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
                    <MenuItem
                      onClick={handleLogout}
                      sx={{ gap: 1, color: '#ff4444' }}
                    >
                      <ExitToApp fontSize="small" />
                      Logout
                    </MenuItem>
                  </Menu>
                </Box>
              ) : (
                <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1, ml: 1 }}>
                  <Button
                    component={RouterLink}
                    to="/login"
                    sx={{
                      color: 'rgba(255,255,255,0.8)',
                      '&:hover': { color: '#00D4FF' },
                      fontWeight: 600,
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/register"
                    variant="contained"
                    sx={{
                      bgcolor: '#FF6B35',
                      '&:hover': { bgcolor: '#e55a2a' },
                      fontWeight: 600,
                      borderRadius: '50px',
                      px: 3,
                    }}
                  >
                    Register
                  </Button>
                </Box>
              )}

              {/* Mobile Search Icon */}
              <IconButton
                color="inherit"
                sx={{ display: { xs: 'flex', md: 'none' }, ml: 1 }}
                onClick={() => navigate(`/products?search=${searchQuery}`)}
              >
                <Search />
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: 'transparent',
            boxShadow: 'none',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

// Make sure this is a default export
export default Navbar;