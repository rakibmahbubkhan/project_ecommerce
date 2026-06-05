import React from 'react';
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
} from '@mui/material';
import { ShoppingCart, Person } from '@mui/icons-material';
import { logout } from '../store/authSlice';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { totalQuantity } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

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

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{ flexGrow: 1, textDecoration: 'none', color: 'white' }}
        >
          E-Commerce Store
        </Typography>

        <Button color="inherit" component={RouterLink} to="/products">
          Products
        </Button>

        <IconButton color="inherit" component={RouterLink} to="/cart">
          <Badge badgeContent={totalQuantity} color="error">
            <ShoppingCart />
          </Badge>
        </IconButton>

        {isAuthenticated ? (
          <Box>
            <IconButton onClick={handleMenu} color="inherit">
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                {user?.firstName?.[0] || 'U'}
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose} component={RouterLink} to="/profile">
                Profile
              </MenuItem>
              <MenuItem onClick={handleClose} component={RouterLink} to="/orders">
                My Orders
              </MenuItem>
              {user?.role === 'admin' && (
                <MenuItem onClick={handleClose} component={RouterLink} to="/admin">
                  Admin Dashboard
                </MenuItem>
              )}
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        ) : (
          <Button color="inherit" component={RouterLink} to="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;