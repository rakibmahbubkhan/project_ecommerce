import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  CircularProgress,
  AppBar,
  Toolbar,
  IconButton,
  TextField,
  InputAdornment,
  Zoom,
  useScrollTrigger,
  Slide,
  Chip,
  Avatar,
  Divider,
  Rating,
  Stack,
  Paper,
} from '@mui/material';
import {
  ShoppingCart,
  Search,
  LocalShipping,
  Security,
  SupportAgent,
  TrendingUp,
  ArrowForward,
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  KeyboardArrowUp,
  Phone,
  Email,
  LocationOn,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import api from '../services/api';
import toast from 'react-hot-toast';

// Import Slider correctly from react-slick
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Scroll to top button component
function ScrollTop() {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 1000 }}
      >
        <IconButton color="primary" sx={{ bgcolor: 'background.paper', boxShadow: 3 }}>
          <KeyboardArrowUp />
        </IconButton>
      </Box>
    </Zoom>
  );
}

// Hide on scroll navbar
function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await api.get('/products', {
        params: { page: 1, limit: 8 },
      });
      setFeaturedProducts(response.data.products);
    } catch (error) {
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login first');
        navigate('/login');
        return;
      }
      await api.post('/cart/add', { productId, quantity: 1 });
      toast.success('Added to cart');
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };

  // Hero section data
  const heroSlides = [
    {
      title: 'Summer Sale Extravaganza',
      subtitle: 'Up to 50% off on selected items',
      bgColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      ctaText: 'Shop Now',
      ctaLink: '/products',
    },
    {
      title: 'New Arrivals',
      subtitle: 'Discover the latest trends',
      bgColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      ctaText: 'Explore',
      ctaLink: '/products',
    },
    {
      title: 'Free Shipping',
      subtitle: 'On orders over $50',
      bgColor: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      ctaText: 'Learn More',
      ctaLink: '/shipping',
    },
  ];

  const features = [
    {
      icon: <LocalShipping sx={{ fontSize: 40 }} />,
      title: 'Free Shipping',
      description: 'Free shipping on orders over $50',
      color: '#667eea',
    },
    {
      icon: <Security sx={{ fontSize: 40 }} />,
      title: 'Secure Payment',
      description: '100% secure payment processing',
      color: '#f093fb',
    },
    {
      icon: <SupportAgent sx={{ fontSize: 40 }} />,
      title: '24/7 Support',
      description: 'Dedicated customer support',
      color: '#4facfe',
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40 }} />,
      title: 'Best Prices',
      description: 'Price match guarantee',
      color: '#43e97b',
    },
  ];

  const categories = [
    { name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661', items: 245 },
    { name: 'Fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050', items: 189 },
    { name: 'Home & Living', image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a', items: 156 },
    { name: 'Sports', image: 'https://images.unsplash.com/photo-1461896836934-ffe807baa262', items: 98 },
  ];

  const testimonials = [
    {
      name: 'John Doe',
      role: 'Regular Customer',
      rating: 5,
      comment: 'Amazing products! The quality is outstanding and shipping was super fast.',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    {
      name: 'Jane Smith',
      role: 'Business Owner',
      rating: 5,
      comment: 'Best online shopping experience. Great customer service and hassle-free returns.',
      avatar: 'https://i.pravatar.cc/150?img=2',
    },
    {
      name: 'Mike Johnson',
      role: 'Tech Enthusiast',
      rating: 4,
      comment: 'Great selection of products at competitive prices. Will definitely shop again.',
      avatar: 'https://i.pravatar.cc/150?img=3',
    },
  ];

  const heroSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
  };

  const productSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <HideOnScroll>
        <AppBar position="sticky" color="default" elevation={1} sx={{ bgcolor: 'white' }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold', cursor: 'pointer' }} onClick={() => navigate('/')}>
              ShopHub
            </Typography>
            <TextField
              size="small"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && navigate(`/products?search=${searchQuery}`)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{ width: 300, mr: 2, display: { xs: 'none', md: 'flex' } }}
            />
            <Button color="primary" onClick={() => navigate('/products')}>
              Shop
            </Button>
            <Button color="primary" onClick={() => navigate('/cart')}>
              Cart
            </Button>
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      {/* Hero Carousel - Using div wrapper to ensure Slider renders correctly */}
      <Box sx={{ overflow: 'hidden' }}>
          {heroSlides.map((slide, index) => (
            <Box
              key={index}
              sx={{
                background: slide.bgColor,
                minHeight: '80vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                color: 'white',
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography variant="h1" gutterBottom sx={{ fontWeight: 'bold', fontSize: { xs: '2rem', md: '4rem' } }}>
                  {slide.title}
                </Typography>
                <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
                  {slide.subtitle}
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  onClick={() => navigate(slide.ctaLink)}
                  sx={{
                    bgcolor: 'white',
                    color: 'primary.main',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
                  }}
                >
                  {slide.ctaText}
                </Button>
              </motion.div>
            </Box>
          ))}
      </Box>

      <Container maxWidth="lg" sx={{ mt: -8, mb: 8 }}>
        {/* Features Section */}
        <Grid container spacing={3} sx={{ mb: 8 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    borderRadius: 4,
                    transition: 'transform 0.3s',
                    '&:hover': { transform: 'translateY(-5px)' },
                  }}
                >
                  <Box sx={{ color: feature.color, mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Categories Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" align="center" gutterBottom fontWeight="bold" sx={{ mb: 4 }}>
            Shop by Category
          </Typography>
          <Grid container spacing={3}>
            {categories.map((category, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                  <Card
                    sx={{
                      position: 'relative',
                      height: 300,
                      cursor: 'pointer',
                      overflow: 'hidden',
                    }}
                    onClick={() => navigate(`/products?category=${category.name}`)}
                  >
                    <CardMedia
                      component="img"
                      image={category.image}
                      alt={category.name}
                      sx={{
                        height: '100%',
                        transition: 'transform 0.5s',
                        '&:hover': { transform: 'scale(1.1)' },
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        bgcolor: 'rgba(0,0,0,0.7)',
                        color: 'white',
                        p: 2,
                        textAlign: 'center',
                      }}
                    >
                      <Typography variant="h6">{category.name}</Typography>
                      <Typography variant="body2">{category.items} items</Typography>
                    </Box>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Featured Products Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" align="center" gutterBottom fontWeight="bold">
            Featured Products
          </Typography>
          <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 4 }}>
            Discover our hand-picked selection of trending products
          </Typography>

          {loading ? (
            <Box display="flex" justifyContent="center" py={4}>
              <CircularProgress />
            </Box>
          ) : (
            <Slider {...productSettings}>
              {featuredProducts.map((product, index) => (
                <Box key={product.id} sx={{ p: 1 }}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: 3,
                        overflow: 'hidden',
                        transition: 'box-shadow 0.3s',
                        '&:hover': { boxShadow: 10 },
                      }}
                    >
                      <Box sx={{ position: 'relative' }}>
                        <CardMedia
                          component="img"
                          height="250"
                          image={
                            product.imageUrls && product.imageUrls.length > 0
                              ? product.imageUrls[0].startsWith('http')
                                ? product.imageUrls[0]
                                : `http://localhost:3001${product.imageUrls[0]}`
                              : 'https://via.placeholder.com/300'
                          }
                          alt={product.name}
                          sx={{ cursor: 'pointer', objectFit: 'cover' }}
                          onClick={() => navigate(`/product/${product.slug}`)}
                        />
                        {product.isFeatured && (
                          <Chip
                            label="Featured"
                            color="primary"
                            size="small"
                            sx={{ position: 'absolute', top: 10, left: 10 }}
                          />
                        )}
                        {product.comparePrice > product.price && (
                          <Chip
                            label={`${Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}% OFF`}
                            color="error"
                            size="small"
                            sx={{ position: 'absolute', top: 10, right: 10 }}
                          />
                        )}
                      </Box>
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h6" noWrap>
                          {product.name}
                        </Typography>
                        <Rating value={4.5} precision={0.5} size="small" readOnly />
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          {product.description?.substring(0, 80)}...
                        </Typography>
                        <Box sx={{ mt: 2, display: 'flex', alignItems: 'baseline', gap: 1 }}>
                          <Typography variant="h6" color="primary" fontWeight="bold">
                            ${product.price}
                          </Typography>
                          {product.comparePrice && (
                            <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                              ${product.comparePrice}
                            </Typography>
                          )}
                        </Box>
                      </CardContent>
                      <CardActions sx={{ p: 2, pt: 0 }}>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => addToCart(product.id)}
                          disabled={product.stockQuantity === 0}
                          fullWidth
                          startIcon={<ShoppingCart />}
                        >
                          {product.stockQuantity > 0 ? 'Add to Cart' : 'Out of Stock'}
                        </Button>
                      </CardActions>
                    </Card>
                  </motion.div>
                </Box>
              ))}
            </Slider>
          )}
        </Box>

        {/* Promotional Banner */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Paper
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              p: { xs: 3, md: 6 },
              borderRadius: 4,
              textAlign: 'center',
              mb: 8,
            }}
          >
            <Typography variant="h3" gutterBottom fontWeight="bold" sx={{ fontSize: { xs: '1.8rem', md: '3rem' } }}>
              Subscribe to Our Newsletter
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ mb: 3, fontSize: { xs: '1rem', md: '1.25rem' } }}>
              Get exclusive offers and updates straight to your inbox
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, maxWidth: 500, mx: 'auto', flexDirection: { xs: 'column', sm: 'row' } }}>
              <TextField
                fullWidth
                placeholder="Enter your email"
                variant="filled"
                sx={{ bgcolor: 'white', borderRadius: 1, '& .MuiFilledInput-root': { bgcolor: 'white' } }}
              />
              <Button variant="contained" color="secondary" size="large">
                Subscribe
              </Button>
            </Box>
          </Paper>
        </motion.div>

        {/* Testimonials Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" align="center" gutterBottom fontWeight="bold">
            What Our Customers Say
          </Typography>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                    <Avatar src={testimonial.avatar} sx={{ width: 80, height: 80, mx: 'auto', mb: 2 }} />
                    <Rating value={testimonial.rating} readOnly sx={{ mb: 2 }} />
                    <Typography variant="body1" sx={{ mb: 2, fontStyle: 'italic' }}>
                      "{testimonial.comment}"
                    </Typography>
                    <Typography variant="h6">{testimonial.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {testimonial.role}
                    </Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      {/* Footer */}
      <Box sx={{ bgcolor: '#1a1a1a', color: 'white', py: 6, mt: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h5" gutterBottom fontWeight="bold">
                ShopHub
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Your one-stop destination for amazing products at unbeatable prices.
              </Typography>
              <Stack direction="row" spacing={2}>
                <IconButton sx={{ color: 'white' }}><Facebook /></IconButton>
                <IconButton sx={{ color: 'white' }}><Twitter /></IconButton>
                <IconButton sx={{ color: 'white' }}><Instagram /></IconButton>
                <IconButton sx={{ color: 'white' }}><LinkedIn /></IconButton>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="h6" gutterBottom>Shop</Typography>
              <Typography variant="body2" sx={{ mb: 1, cursor: 'pointer' }}>All Products</Typography>
              <Typography variant="body2" sx={{ mb: 1, cursor: 'pointer' }}>New Arrivals</Typography>
              <Typography variant="body2" sx={{ mb: 1, cursor: 'pointer' }}>Best Sellers</Typography>
              <Typography variant="body2" sx={{ cursor: 'pointer' }}>Sale</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="h6" gutterBottom>Support</Typography>
              <Typography variant="body2" sx={{ mb: 1, cursor: 'pointer' }}>FAQ</Typography>
              <Typography variant="body2" sx={{ mb: 1, cursor: 'pointer' }}>Shipping Info</Typography>
              <Typography variant="body2" sx={{ mb: 1, cursor: 'pointer' }}>Returns</Typography>
              <Typography variant="body2" sx={{ cursor: 'pointer' }}>Contact Us</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>Contact Info</Typography>
              <Stack spacing={1}>
                <Box display="flex" alignItems="center" gap={1}>
                  <LocationOn fontSize="small" />
                  <Typography variant="body2">123 Main Street, New York, NY 10001</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <Phone fontSize="small" />
                  <Typography variant="body2">+1 (555) 123-4567</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <Email fontSize="small" />
                  <Typography variant="body2">support@shophub.com</Typography>
                </Box>
              </Stack>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4, bgcolor: 'rgba(255,255,255,0.1)' }} />
          <Typography variant="body2" align="center">
            © 2024 ShopHub. All rights reserved.
          </Typography>
        </Container>
      </Box>

      <ScrollTop />
    </>
  );
};

export default HomePage;