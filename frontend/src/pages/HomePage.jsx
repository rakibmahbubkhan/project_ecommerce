import React, { useState, useEffect, useRef } from 'react';
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
  Divider,
  Rating,
  Chip,
  Paper,
  Stack,
  Avatar,
  IconButton,
  Fade,
} from '@mui/material';
import {
  LocalShipping,
  VerifiedUser,
  SupportAgent,
  ArrowForward,
  Bolt,
  Lightbulb,
  ElectricalServices,
  Security,
  HomeRepairService,
  FlashOn,
  BatteryChargingFull,
  Settings,
  Build,
  TrendingUp,
  EmojiEvents,
  Shield,
  Speed,
  FormatQuote,
} from '@mui/icons-material';
import { motion, useInView } from 'framer-motion';
import api from '../services/api';
import toast from 'react-hot-toast';

// ============================================
// CONTENT CONFIGURATION
// ============================================
const CONTENT = {
  brand: {
    name: 'ElectroHub',
    tagline: 'Your Trusted Partner for Quality Electrical Solutions',
  },
  hero: {
    title: 'Premium Electrical & Electronic Solutions',
    subtitle: 'Discover our extensive range of high-quality electrical products, from smart home devices to industrial-grade equipment.',
    ctaText: 'Explore Products',
    ctaLink: '/products',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=400&fit=crop&crop=center',
    gradient: 'linear-gradient(135deg, #0a1628 0%, #1a365d 50%, #2a4a7f 100%)',
    accentColor: '#FF6B35',
    secondaryColor: '#00D4FF',
  },
  stats: [
    { value: '10K+', label: 'Happy Customers', icon: <EmojiEvents />, color: '#FFD700' },
    { value: '500+', label: 'Products Available', icon: <ElectricalServices />, color: '#00D4FF' },
    { value: '98%', label: 'Satisfaction Rate', icon: <TrendingUp />, color: '#00E676' },
    { value: '24/7', label: 'Expert Support', icon: <SupportAgent />, color: '#FF6B35' },
  ],
  trustSignals: [
    { icon: <LocalShipping />, label: 'Fast Delivery', color: '#FF6B35' },
    { icon: <VerifiedUser />, label: 'Certified Products', color: '#00D4FF' },
    { icon: <Security />, label: 'Safety Guaranteed', color: '#FFD700' },
    { icon: <SupportAgent />, label: '24/7 Support', color: '#00E676' },
  ],
  categories: {
    title: 'Shop by Category',
    subtitle: 'Find exactly what you need for your electrical projects',
    items: [
      { name: 'Smart Home', icon: <HomeRepairService />, image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=400&h=300&fit=crop&crop=center', items: 245, color: '#FF6B35' },
      { name: 'Lighting', icon: <Lightbulb />, image: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=400&h=300&fit=crop&crop=center', items: 189, color: '#FFD700' },
      { name: 'Wiring & Cables', icon: <ElectricalServices />, image: 'https://images.unsplash.com/photo-1562408590-e32931084e23?w=400&h=300&fit=crop&crop=center', items: 156, color: '#00D4FF' },
      { name: 'Power Tools', icon: <Build />, image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400&h=300&fit=crop&crop=center', items: 198, color: '#FF6B35' },
      { name: 'Batteries & Power', icon: <BatteryChargingFull />, image: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=400&h=300&fit=crop&crop=center', items: 134, color: '#00E676' },
      { name: 'Electrical Panels', icon: <Settings />, image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&h=300&fit=crop&crop=center', items: 89, color: '#00D4FF' },
    ],
  },
  featuredProducts: {
    title: 'Featured Electrical Products',
    subtitle: 'Top-rated equipment and devices for every application',
    viewAllText: 'View All Products',
    limit: 8,
    defaultCategory: 'Electrical Equipment',
    placeholderImage: 'https://via.placeholder.com/300x300?text=Electrical+Product',
    badgeLabel: 'Best Seller',
    addToCartText: 'Add to Cart',
    outOfStockText: 'Out of Stock',
    rating: 4.8,
  },
  whyChooseUs: {
    title: 'Why Choose ElectroHub?',
    subtitle: 'Your trusted source for electrical excellence',
    features: [
      { icon: <Shield />, title: 'Certified Quality', description: 'All products meet international safety and quality standards.', color: '#00D4FF' },
      { icon: <Speed />, title: 'Fast & Reliable Delivery', description: 'Quick shipping with real-time tracking.', color: '#FF6B35' },
      { icon: <SupportAgent />, title: 'Expert Support', description: 'Professional guidance for your electrical needs.', color: '#FFD700' },
      { icon: <Security />, title: 'Warranty Guarantee', description: 'Extended warranty coverage for peace of mind.', color: '#00E676' },
    ],
  },
  testimonials: {
    title: 'What Our Customers Say',
    subtitle: 'Trusted by professionals and homeowners alike',
    items: [
      { name: 'John Smith', location: 'Electrical Engineer', rating: 5, comment: 'Exceptional quality products and outstanding customer service.', avatar: 'https://i.pravatar.cc/150?img=1', badge: 'Verified Professional' },
      { name: 'Sarah Johnson', location: 'Homeowner', rating: 5, comment: 'I renovated my entire home with products from ElectroHub.', avatar: 'https://i.pravatar.cc/150?img=2', badge: 'Happy Customer' },
      { name: 'Mike Chen', location: 'Project Manager', rating: 5, comment: 'Reliable products and excellent technical support.', avatar: 'https://i.pravatar.cc/150?img=3', badge: 'Verified Professional' },
      { name: 'Emily Davis', location: 'Interior Designer', rating: 5, comment: 'The smart lighting solutions transformed my clients\' spaces.', avatar: 'https://i.pravatar.cc/150?img=4', badge: 'Verified Professional' },
      { name: 'Robert Wilson', location: 'Facility Manager', rating: 4, comment: 'Excellent products and reliable delivery.', avatar: 'https://i.pravatar.cc/150?img=5', badge: 'Happy Customer' },
      { name: 'Lisa Thompson', location: 'DIY Enthusiast', rating: 5, comment: 'Top-notch wiring supplies. Great value for money.', avatar: 'https://i.pravatar.cc/150?img=6', badge: 'Happy Customer' },
    ],
  },
  cta: {
    title: 'Ready to Power Your Project?',
    subtitle: 'Browse our complete range of electrical products',
    buttonText: 'Shop Now',
    buttonLink: '/products',
    gradient: 'linear-gradient(135deg, #0a1628 0%, #1a365d 50%, #2a4a7f 100%)',
  },
};

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const navigate = useNavigate();

  const statsRef = useRef(null);
  const categoriesRef = useRef(null);
  const productsRef = useRef(null);
  const featuresRef = useRef(null);
  const testimonialsRef = useRef(null);

  const statsInView = useInView(statsRef, { once: true, amount: 0.2 });
  const categoriesInView = useInView(categoriesRef, { once: true, amount: 0.2 });
  const productsInView = useInView(productsRef, { once: true, amount: 0.2 });
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.2 });
  const testimonialsInView = useInView(testimonialsRef, { once: true, amount: 0.2 });

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => 
        prev === CONTENT.testimonials.items.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await api.get('/products', {
        params: { page: 1, limit: CONTENT.featuredProducts.limit },
      });
      setFeaturedProducts(response.data.products || []);
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

  const getProductImage = (imageUrls) => {
    if (imageUrls && imageUrls.length > 0) {
      const url = imageUrls[0];
      if (url.startsWith('http')) {
        return url;
      }
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      return `${baseUrl}${url}`;
    }
    return CONTENT.featuredProducts.placeholderImage;
  };

  const getCategoryName = (category) => {
    if (!category) return CONTENT.featuredProducts.defaultCategory;
    if (typeof category === 'string') return category;
    if (typeof category === 'object' && category.name) return category.name;
    return CONTENT.featuredProducts.defaultCategory;
  };

  const goToTestimonial = (index) => {
    setActiveTestimonial(index);
  };

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => 
      prev === CONTENT.testimonials.items.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => 
      prev === 0 ? CONTENT.testimonials.items.length - 1 : prev - 1
    );
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const fadeInScale = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const currentTestimonial = CONTENT.testimonials.items[activeTestimonial];

  return (
    <Box sx={{ overflowX: 'hidden' }}>
      
      {/* ===== HERO SECTION ===== */}
      <Box
        sx={{
          background: CONTENT.hero.gradient,
          color: 'white',
          pt: { xs: 8, md: 12 },
          pb: { xs: 10, md: 14 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={4} sx={{ alignItems: 'center' }}>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Chip
                  icon={<Bolt sx={{ color: CONTENT.hero.accentColor }} />}
                  label="Premium Electrical Solutions"
                  sx={{
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    color: 'white',
                    mb: 3,
                    border: `1px solid ${CONTENT.hero.accentColor}`,
                    backdropFilter: 'blur(10px)',
                    '& .MuiChip-icon': { color: CONTENT.hero.accentColor },
                  }}
                />
                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: '2.2rem', md: '3.5rem' },
                    lineHeight: 1.2,
                    mb: 2,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {CONTENT.hero.title}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 4,
                    opacity: 0.9,
                    fontWeight: 400,
                    maxWidth: '550px',
                    fontSize: { xs: '1rem', md: '1.2rem' },
                  }}
                >
                  {CONTENT.hero.subtitle}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForward />}
                    onClick={() => navigate(CONTENT.hero.ctaLink)}
                    sx={{
                      backgroundColor: CONTENT.hero.accentColor,
                      color: 'white',
                      '&:hover': { backgroundColor: '#e55a2a' },
                      px: 5,
                      py: 1.8,
                      fontWeight: 'bold',
                      fontSize: '1rem',
                      borderRadius: '50px',
                      boxShadow: `0 8px 24px ${CONTENT.hero.accentColor}4D`,
                    }}
                  >
                    {CONTENT.hero.ctaText}
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<FlashOn />}
                    sx={{
                      borderColor: 'rgba(255,255,255,0.3)',
                      color: 'white',
                      '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.05)' },
                      px: 4,
                      py: 1.8,
                      fontWeight: 'bold',
                      borderRadius: '50px',
                    }}
                    onClick={() => navigate('/products?category=new-arrivals')}
                  >
                    New Arrivals
                  </Button>
                </Box>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Box sx={{ position: 'relative' }}>
                  <Box
                    component="img"
                    src={CONTENT.hero.image}
                    alt={CONTENT.brand.name}
                    sx={{
                      width: '100%',
                      maxHeight: '450px',
                      objectFit: 'cover',
                      borderRadius: '20px',
                      boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                    }}
                  />
                </Box>
                <motion.div
                  initial={{ opacity: 0, x: 30, y: -30 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 30,
                      right: -10,
                      backgroundColor: CONTENT.hero.accentColor,
                      color: 'white',
                      p: 2.5,
                      borderRadius: '16px',
                      boxShadow: `0 10px 30px ${CONTENT.hero.accentColor}66`,
                      zIndex: 2,
                    }}
                  >
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                      ⚡ 30% OFF
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.9 }}>
                      on new arrivals
                    </Typography>
                  </Box>
                </motion.div>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
        <Box
          sx={{
            position: 'absolute',
            top: -150,
            right: -150,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: `${CONTENT.hero.accentColor}15`,
            filter: 'blur(60px)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -100,
            left: -100,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: `${CONTENT.hero.secondaryColor}15`,
            filter: 'blur(50px)',
          }}
        />
      </Box>

      {/* ===== TRUST SIGNALS ===== */}
      <Container maxWidth="lg" sx={{ mt: -4, mb: 6,  position: 'relative', zIndex: 1 }}>
        <Fade in timeout={800}>
          <Paper
            elevation={3}
            sx={{
              position: 'relative', placeContent: 'center',
              p: 3,
              borderRadius: '20px',
              backgroundColor: 'white',
              boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
            }}
          >
            <Grid container spacing={2} 
                  sx={{ placeContent: 'center' }}>
              {CONTENT.trustSignals.map((signal, index) => (
                <Grid item xs={6} sm={3} key={index}>
                  <Stack 
                    direction="row" 
                    spacing={1.5} 
                    sx={{ 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      '&:hover': {
                        '& .MuiBox-root': {
                          transform: 'scale(1.1)',
                        },
                      },
                    }}
                  >
                    <Box 
                      sx={{ 
                        color: signal.color || CONTENT.hero.accentColor,
                        transition: 'transform 0.3s ease-in-out',
                      }}
                    >
                      {signal.icon}
                    </Box>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontWeight: 600, 
                        fontSize: { xs: '0.7rem', sm: '0.9rem' },
                        color: '#1a1a2e',
                      }}
                    >
                      {signal.label}
                    </Typography>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Fade>
      </Container>

      {/* ===== STATS SECTION ===== */}
      <Box ref={statsRef} sx={{ py: 4, bgcolor: '#f8fafc', position: 'relative', zIndex: 1 }}>
        <Container maxWidth="xl">
          <motion.div
            initial="hidden"
            animate={statsInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
          >
            <Grid container spacing={3} sx={{ placeContent: 'center' }}>
              {CONTENT.stats.map((stat, index) => (
                <Grid item xs={6} sm={3} key={index}>
                  <motion.div
                    variants={fadeInScale}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        position: 'relative',
                        placeContent: 'center',
                        p: 3,
                        textAlign: 'center',
                        bgcolor: 'transparent',
                        borderRadius: 2,
                      }}
                    >
                      <Box sx={{ color: stat.color, fontSize: 40, mb: 1 }}>
                        {stat.icon}
                      </Box>
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: 800,
                          color: '#1a1a2e',
                          fontSize: { xs: '1.8rem', md: '2.5rem' },
                        }}
                      >
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {stat.label}
                      </Typography>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* ===== CATEGORIES SECTION ===== */}
      <Container maxWidth="xl" sx={{ py: 8 }} ref={categoriesRef}>
        <motion.div
          initial="hidden"
          animate={categoriesInView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                color: '#1a1a2e',
                fontSize: { xs: '2rem', md: '2.8rem' },
                mb: 1,
              }}
            >
              {CONTENT.categories.title}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {CONTENT.categories.subtitle}
            </Typography>
          </Box>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={categoriesInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          <Grid container spacing={3}>
            {CONTENT.categories.items.map((category, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div
                  variants={fadeInUp}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <Card
                    sx={{
                      position: 'relative',
                      height: 250,
                      cursor: 'pointer',
                      overflow: 'hidden',
                      borderRadius: '20px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                      transition: 'box-shadow 0.3s',
                      '&:hover': {
                        boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
                      },
                    }}
                    onClick={() => navigate(`/products?category=${category.name.toLowerCase().replace(/ & /g, '-')}`)}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        backgroundColor: category.color,
                        color: 'white',
                        p: 1.5,
                        borderRadius: '12px',
                        zIndex: 2,
                        boxShadow: `0 4px 12px ${category.color}44`,
                      }}
                    >
                      {category.icon}
                    </Box>
                    <CardMedia
                      component="img"
                      image={category.image}
                      alt={category.name}
                      sx={{
                        height: '100%',
                        transition: 'transform 0.6s',
                        '&:hover': { transform: 'scale(1.1)' },
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
                        color: 'white',
                        p: 3,
                      }}
                    >
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        {category.name}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        {category.items} products available
                      </Typography>
                    </Box>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>

      {/* ===== FEATURED PRODUCTS ===== */}
      <Box sx={{ bgcolor: '#f8fafc', py: 8, justifyContent: 'center' }} ref={productsRef}>
        <Container maxWidth="xl">
          <motion.div
            initial="hidden"
            animate={productsInView ? 'visible' : 'hidden'}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' }, 
              justifyContent: 'space-between', 
              alignItems: { xs: 'flex-start', sm: 'flex-end' }, 
              mb: 4 
            }}>
              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 800,
                    color: '#1a1a2e',
                    fontSize: { xs: '1.8rem', md: '2.2rem' },
                  }}
                >
                  {CONTENT.featuredProducts.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {CONTENT.featuredProducts.subtitle}
                </Typography>
              </Box>
              <Button
                variant="outlined"
                onClick={() => navigate('/products')}
                sx={{ 
                  fontWeight: 'bold', 
                  borderRadius: '50px', 
                  mt: { xs: 2, sm: 0 },
                  borderColor: CONTENT.hero.accentColor,
                  color: CONTENT.hero.accentColor,
                  px: 3,
                  '&:hover': {
                    borderColor: CONTENT.hero.accentColor,
                    backgroundColor: `${CONTENT.hero.accentColor}11`,
                  },
                }}
              >
                {CONTENT.featuredProducts.viewAllText}
              </Button>
            </Box>
          </motion.div>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress sx={{ color: CONTENT.hero.accentColor }} />
            </Box>
          ) : (
            <motion.div
              initial="hidden"
              animate={productsInView ? 'visible' : 'hidden'}
              variants={staggerContainer}
            >
              <Grid container spacing={3}>
                {featuredProducts.slice(0, CONTENT.featuredProducts.limit).map((product, index) => (
                  <Grid item xs={12} sm={6} md={3} key={product.id}>
                    <motion.div
                      variants={fadeInUp}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ y: -8 }}
                    >
                      <Card
                        sx={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          borderRadius: '16px',
                          transition: 'box-shadow 0.3s',
                          '&:hover': {
                            boxShadow: '0 12px 48px rgba(0,0,0,0.12)',
                          },
                          position: 'relative',
                        }}
                      >
                        {product.isFeatured && (
                          <Chip
                            label={CONTENT.featuredProducts.badgeLabel}
                            size="small"
                            sx={{
                              position: 'absolute',
                              top: 12,
                              left: 12,
                              backgroundColor: CONTENT.hero.accentColor,
                              color: 'white',
                              fontWeight: 'bold',
                              zIndex: 1,
                              boxShadow: `0 4px 12px ${CONTENT.hero.accentColor}44`,
                            }}
                          />
                        )}

                        <CardMedia
                          component="img"
                          height="250"
                          image={getProductImage(product.imageUrls)}
                          alt={product.name}
                          sx={{
                            cursor: 'pointer',
                            objectFit: 'cover',
                            backgroundColor: '#f5f7fa',
                          }}
                          onClick={() => navigate(`/product/${product.slug}`)}
                        />
                        
                        <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 0.5, fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 600 }}
                          >
                            {getCategoryName(product.category)}
                          </Typography>
                          <Typography
                            gutterBottom
                            variant="h6"
                            sx={{
                              fontWeight: 700,
                              fontSize: '1rem',
                              cursor: 'pointer',
                              '&:hover': { color: CONTENT.hero.accentColor },
                              height: 48,
                              overflow: 'hidden',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              transition: 'color 0.3s',
                            }}
                            onClick={() => navigate(`/product/${product.slug}`)}
                          >
                            {product.name}
                          </Typography>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Rating value={CONTENT.featuredProducts.rating} precision={0.5} size="small" readOnly />
                            <Typography variant="caption" color="text.secondary">
                              ({CONTENT.featuredProducts.rating})
                            </Typography>
                          </Box>
                          
                          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 800, color: CONTENT.hero.accentColor }}>
                              ${product.price}
                            </Typography>
                            {product.comparePrice && (
                              <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                                ${product.comparePrice}
                              </Typography>
                            )}
                          </Box>
                        </CardContent>
                        
                        <Divider sx={{ mx: 2 }} />
                        
                        <CardActions sx={{ p: 2 }}>
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => addToCart(product.id)}
                            disabled={product.stockQuantity === 0}
                            fullWidth
                            sx={{
                              fontWeight: 'bold',
                              borderRadius: '50px',
                              backgroundColor: CONTENT.hero.accentColor,
                              '&:hover': { backgroundColor: '#e55a2a' },
                              py: 1,
                            }}
                          >
                            {product.stockQuantity > 0 
                              ? CONTENT.featuredProducts.addToCartText 
                              : CONTENT.featuredProducts.outOfStockText}
                          </Button>
                        </CardActions>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          )}
        </Container>
      </Box>

      {/* ===== WHY CHOOSE US ===== */}
      <Box sx={{ py: 8 }} ref={featuresRef}>
        <Container maxWidth="xl">
          <motion.div
            initial="hidden"
            animate={featuresInView ? 'visible' : 'hidden'}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ textAlign: 'center', mb: 5 }}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  color: '#1a1a2e',
                  fontSize: { xs: '2rem', md: '2.8rem' },
                  mb: 1,
                }}
              >
                {CONTENT.whyChooseUs.title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {CONTENT.whyChooseUs.subtitle}
              </Typography>
            </Box>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={featuresInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
          >
            <Grid container spacing={4}>
              {CONTENT.whyChooseUs.features.map((feature, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <motion.div
                    variants={fadeInUp}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                  >
                    <Paper
                      elevation={2}
                      sx={{
                        p: 4,
                        textAlign: 'center',
                        height: '100%',
                        borderRadius: '20px',
                        transition: 'box-shadow 0.3s',
                        '&:hover': {
                          boxShadow: '0 12px 48px rgba(0,0,0,0.08)',
                        },
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: `${feature.color}15`,
                          borderRadius: '50%',
                          width: 80,
                          height: 80,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mx: 'auto',
                          mb: 2,
                          transition: 'transform 0.3s',
                          '&:hover': {
                            transform: 'scale(1.1)',
                          },
                        }}
                      >
                        <Box sx={{ color: feature.color, fontSize: 40 }}>
                          {feature.icon}
                        </Box>
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
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
          </motion.div>
        </Container>
      </Box>

      {/* ===== TESTIMONIALS - SLIDING CARDS (Manual Carousel) ===== */}
      <Box sx={{ bgcolor: '#f8fafc', py: 8 }} ref={testimonialsRef}>
        <Container maxWidth="xl">
          <motion.div
            initial="hidden"
            animate={testimonialsInView ? 'visible' : 'hidden'}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  color: '#1a1a2e',
                  fontSize: { xs: '2rem', md: '2.8rem' },
                  mb: 1,
                }}
              >
                {CONTENT.testimonials.title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {CONTENT.testimonials.subtitle}
              </Typography>
            </Box>
          </motion.div>

          <Box sx={{ position: 'relative', maxWidth: 700, mx: 'auto' }}>
            {/* Testimonial Cards */}
            <Box sx={{ overflow: 'hidden', position: 'relative', minHeight: 320 }}>
              {CONTENT.testimonials.items.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{
                    opacity: activeTestimonial === index ? 1 : 0,
                    x: activeTestimonial === index ? 0 : 50,
                  }}
                  transition={{ duration: 0.5 }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    pointerEvents: activeTestimonial === index ? 'auto' : 'none',
                  }}
                >
                  <Paper
                    elevation={2}
                    sx={{
                      p: 4,
                      borderRadius: '20px',
                      textAlign: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 10,
                        right: 20,
                        opacity: 0.08,
                        color: CONTENT.hero.accentColor,
                      }}
                    >
                      <FormatQuote sx={{ fontSize: 60 }} />
                    </Box>

                    <Avatar
                      src={testimonial.avatar}
                      sx={{ 
                        width: 80, 
                        height: 80, 
                        mx: 'auto', 
                        mb: 2,
                        border: `3px solid ${CONTENT.hero.accentColor}`,
                        boxShadow: `0 4px 12px ${CONTENT.hero.accentColor}44`,
                      }}
                    />
                    <Rating value={testimonial.rating} readOnly sx={{ mb: 2 }} />
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        mb: 2, 
                        fontStyle: 'italic', 
                        color: '#1a1a2e',
                        fontSize: { xs: '0.95rem', sm: '1.1rem' },
                      }}
                    >
                      "{testimonial.comment}"
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a2e' }}>
                      {testimonial.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                      {testimonial.location}
                    </Typography>
                    <Chip
                      label={testimonial.badge}
                      size="small"
                      sx={{ 
                        backgroundColor: `${CONTENT.hero.accentColor}11`, 
                        color: CONTENT.hero.accentColor,
                        fontWeight: 600,
                        borderRadius: '12px',
                      }}
                    />
                  </Paper>
                </motion.div>
              ))}
            </Box>

            {/* Navigation Dots */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 3 }}>
              {CONTENT.testimonials.items.map((_, index) => (
                <Box
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    cursor: 'pointer',
                    backgroundColor: activeTestimonial === index 
                      ? CONTENT.hero.accentColor 
                      : '#d1d5db',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'scale(1.2)',
                      backgroundColor: activeTestimonial === index 
                        ? CONTENT.hero.accentColor 
                        : '#9ca3af',
                    },
                  }}
                />
              ))}
            </Box>

            {/* Navigation Arrows */}
            <IconButton
              onClick={prevTestimonial}
              sx={{
                position: 'absolute',
                left: -20,
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'white',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                '&:hover': { backgroundColor: CONTENT.hero.accentColor, color: 'white' },
                display: { xs: 'none', sm: 'flex' },
              }}
            >
              <ArrowForward sx={{ transform: 'rotate(180deg)' }} />
            </IconButton>
            <IconButton
              onClick={nextTestimonial}
              sx={{
                position: 'absolute',
                right: -20,
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'white',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                '&:hover': { backgroundColor: CONTENT.hero.accentColor, color: 'white' },
                display: { xs: 'none', sm: 'flex' },
              }}
            >
              <ArrowForward />
            </IconButton>
          </Box>
        </Container>
      </Box>

      {/* ===== FINAL CTA ===== */}
      <Box sx={{ 
        background: CONTENT.cta.gradient, 
        color: 'white', 
        py: 8,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <Container maxWidth="md" sx={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Chip
              icon={<Bolt sx={{ color: CONTENT.hero.accentColor }} />}
              label="Limited Time Offer"
              sx={{
                backgroundColor: 'rgba(255,255,255,0.08)',
                color: 'white',
                mb: 3,
                border: `1px solid ${CONTENT.hero.accentColor}`,
                '& .MuiChip-icon': { color: CONTENT.hero.accentColor },
              }}
            />
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 800, 
                mb: 2,
                fontSize: { xs: '2rem', md: '3rem' },
              }}
            >
              {CONTENT.cta.title}
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 4, 
                opacity: 0.9, 
                fontWeight: 400,
                fontSize: { xs: '1rem', md: '1.2rem' },
              }}
            >
              {CONTENT.cta.subtitle}
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate(CONTENT.cta.buttonLink)}
              sx={{
                backgroundColor: CONTENT.hero.accentColor,
                color: 'white',
                '&:hover': { backgroundColor: '#e55a2a' },
                px: 6,
                py: 2,
                fontWeight: 'bold',
                borderRadius: '50px',
                fontSize: '1.1rem',
                boxShadow: `0 8px 32px ${CONTENT.hero.accentColor}55`,
              }}
            >
              {CONTENT.cta.buttonText}
            </Button>
          </motion.div>
        </Container>
        <Box
          sx={{
            position: 'absolute',
            top: -150,
            right: -100,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: `${CONTENT.hero.accentColor}10`,
            filter: 'blur(60px)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -150,
            left: -100,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: `${CONTENT.hero.secondaryColor}10`,
            filter: 'blur(60px)',
          }}
        />
      </Box>
    </Box>
  );
};

export default HomePage;