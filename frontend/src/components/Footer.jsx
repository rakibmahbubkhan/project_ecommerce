import React from 'react';
import { Box, Container, Typography, Grid, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'primary.main', color: 'white', py: 3, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2">
              Your one-stop shop for all your needs. Quality products at best prices.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link href="/products" color="inherit" display="block">
              Products
            </Link>
            <Link href="/cart" color="inherit" display="block">
              Cart
            </Link>
            <Link href="/orders" color="inherit" display="block">
              Orders
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contact
            </Typography>
            <Typography variant="body2">Email: rak.mbk@gmail.com</Typography>
            <Typography variant="body2">Phone: +88 01791-504103</Typography>
          </Grid>
        </Grid>
        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          © {new Date().getFullYear()} E-Commerce Store. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;