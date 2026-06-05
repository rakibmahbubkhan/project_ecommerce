import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  IconButton,
  TextField,
  Box,
  Divider,
  Paper,
} from '@mui/material';
import { Delete, Remove, Add } from '@mui/icons-material';
import { setCart, updateCartItem, removeFromCart } from '../store/cartSlice';
import api from '../services/api';
import toast from 'react-hot-toast';

const CartPage = () => {
  const { items, totalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      
      const response = await api.get('/cart');
      dispatch(setCart(response.data));
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    }
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      await api.post('/cart/update', { productId, quantity: newQuantity });
      dispatch(updateCartItem({ productId, quantity: newQuantity }));
      toast.success('Cart updated');
    } catch (error) {
      toast.error('Failed to update cart');
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      await api.delete(`/cart/remove/${productId}`);
      dispatch(removeFromCart(productId));
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Your cart is empty
        </Typography>
        <Button variant="contained" onClick={() => navigate('/products')}>
          Continue Shopping
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {items.map((item) => (
            <Card key={item.productId} sx={{ mb: 2, display: 'flex' }}>
              <CardMedia
                component="img"
                sx={{ width: 120, height: 120, objectFit: 'cover' }}
                image={item.product?.imageUrls?.[0] || 'https://via.placeholder.com/120'}
                alt={item.product?.name}
              />
              <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h6">
                    {item.product?.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${item.product?.price} each
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                    >
                      <Remove />
                    </IconButton>
                    <TextField
                      size="small"
                      value={item.quantity}
                      onChange={(e) => handleUpdateQuantity(item.productId, parseInt(e.target.value) || 1)}
                      inputProps={{ style: { textAlign: 'center', width: 50 } }}
                    />
                    <IconButton
                      size="small"
                      onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                    >
                      <Add />
                    </IconButton>
                  </Box>
                  <Typography variant="h6">
                    ${(item.product?.price * item.quantity).toFixed(2)}
                  </Typography>
                  <IconButton color="error" onClick={() => handleRemoveItem(item.productId)}>
                    <Delete />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography>Subtotal:</Typography>
              <Typography>${totalAmount.toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography>Shipping:</Typography>
              <Typography>Calculated at checkout</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6">${totalAmount.toFixed(2)}</Typography>
            </Box>
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartPage;