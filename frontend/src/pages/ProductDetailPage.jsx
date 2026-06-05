import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Card,
  CardMedia,
  TextField,
  Chip,
  CircularProgress,
  Divider,
  Alert,
} from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';
import api from '../services/api';
import toast from 'react-hot-toast';

const ProductDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/products/slug/${slug}`);
      setProduct(response.data);
    } catch (error) {
      toast.error('Product not found');
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please login first');
      navigate('/login');
      return;
    }

    setAddingToCart(true);
    try {
      await api.post('/cart/add', { productId: product.id, quantity });
      toast.success('Added to cart');
    } catch (error) {
      toast.error('Failed to add to cart');
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Container>
        <Alert severity="error">Product not found</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="400"
              image={product.imageUrls?.[0] || 'https://via.placeholder.com/400'}
              alt={product.name}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            {product.name}
          </Typography>
          
          {product.comparePrice && product.comparePrice > product.price && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                ${product.comparePrice}
              </Typography>
            </Box>
          )}
          
          <Typography variant="h3" color="primary" gutterBottom>
            ${product.price}
          </Typography>
          
          <Chip
            label={product.stockQuantity > 0 ? `In Stock (${product.stockQuantity})` : 'Out of Stock'}
            color={product.stockQuantity > 0 ? 'success' : 'error'}
            sx={{ mb: 2 }}
          />
          
          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>
          
          <Divider sx={{ my: 2 }} />
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              SKU: {product.sku}
            </Typography>
            {product.category && (
              <Typography variant="subtitle1" gutterBottom>
                Category: {product.category.name}
              </Typography>
            )}
          </Box>
          
          {product.stockQuantity > 0 && (
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 3 }}>
              <TextField
                type="number"
                label="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                inputProps={{ min: 1, max: product.stockQuantity }}
                sx={{ width: 100 }}
              />
              <Button
                variant="contained"
                size="large"
                startIcon={<AddShoppingCart />}
                onClick={handleAddToCart}
                disabled={addingToCart}
              >
                Add to Cart
              </Button>
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetailPage;