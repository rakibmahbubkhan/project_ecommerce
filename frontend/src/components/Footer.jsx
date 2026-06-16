import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Link, 
  Stack, 
  IconButton, 
  Divider,
  Button,
  TextField
} from '@mui/material';
import {
  Bolt,
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  LocationOn,
  Phone,
  Email,
  ArrowForward,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { label: 'All Products', link: '/products' },
      { label: 'Smart Home', link: '/products?category=smart-home' },
      { label: 'Lighting Solutions', link: '/products?category=lighting' },
      { label: 'Power Tools', link: '/products?category=power-tools' },
      { label: 'Electrical Panels', link: '/products?category=panels' },
    ],
    support: [
      { label: 'Technical Support', link: '/support' },
      { label: 'Installation Guide', link: '/guides' },
      { label: 'Safety Tips', link: '/safety' },
      { label: 'Warranty Info', link: '/warranty' },
      { label: 'Contact Us', link: '/contact' },
    ],
    company: [
      { label: 'About Us', link: '/about' },
      { label: 'Careers', link: '/careers' },
      { label: 'Blog', link: '/blog' },
      { label: 'Privacy Policy', link: '/privacy' },
      { label: 'Terms of Service', link: '/terms' },
    ],
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#0a0a1a',
        color: 'rgba(255,255,255,0.7)',
        pt: 6,
        pb: 3,
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <Container maxWidth="lg">
        {/* Main Footer Content */}
        <Grid container spacing={4}>
          {/* Brand Column */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h5"
              sx={{
                color: 'white',
                fontWeight: 800,
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Bolt sx={{ color: '#FF6B35', fontSize: 32 }} />
              ElectroHub
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, maxWidth: 300 }}>
              Your trusted partner for quality electrical solutions. 
              Powering innovation and delivering excellence in every connection.
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton
                sx={{
                  color: 'rgba(255,255,255,0.5)',
                  '&:hover': { color: '#FF6B35', bgcolor: 'rgba(255,107,53,0.1)' },
                }}
                component="a"
                href="#"
                target="_blank"
              >
                <Facebook />
              </IconButton>
              <IconButton
                sx={{
                  color: 'rgba(255,255,255,0.5)',
                  '&:hover': { color: '#00D4FF', bgcolor: 'rgba(0,212,255,0.1)' },
                }}
                component="a"
                href="#"
                target="_blank"
              >
                <Twitter />
              </IconButton>
              <IconButton
                sx={{
                  color: 'rgba(255,255,255,0.5)',
                  '&:hover': { color: '#E1306C', bgcolor: 'rgba(225,48,108,0.1)' },
                }}
                component="a"
                href="#"
                target="_blank"
              >
                <Instagram />
              </IconButton>
              <IconButton
                sx={{
                  color: 'rgba(255,255,255,0.5)',
                  '&:hover': { color: '#0077B5', bgcolor: 'rgba(0,119,181,0.1)' },
                }}
                component="a"
                href="#"
                target="_blank"
              >
                <LinkedIn />
              </IconButton>
            </Stack>
          </Grid>

          {/* Shop Links */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography
              variant="body2"
              sx={{
                color: 'white',
                fontWeight: 700,
                mb: 2,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                fontSize: '0.85rem',
              }}
            >
              Shop
            </Typography>
            <Stack spacing={1}>
              {footerLinks.shop.map((link) => (
                <Link
                  key={link.label}
                  component={RouterLink}
                  to={link.link}
                  sx={{
                    color: 'rgba(255,255,255,0.6)',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    transition: 'color 0.3s',
                    '&:hover': {
                      color: '#FF6B35',
                    },
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Support Links */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography
              variant="body2"
              sx={{
                color: 'white',
                fontWeight: 700,
                mb: 2,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                fontSize: '0.85rem',
              }}
            >
              Support
            </Typography>
            <Stack spacing={1}>
              {footerLinks.support.map((link) => (
                <Link
                  key={link.label}
                  component={RouterLink}
                  to={link.link}
                  sx={{
                    color: 'rgba(255,255,255,0.6)',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    transition: 'color 0.3s',
                    '&:hover': {
                      color: '#00D4FF',
                    },
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Company Links */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography
              variant="body2"
              sx={{
                color: 'white',
                fontWeight: 700,
                mb: 2,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                fontSize: '0.85rem',
              }}
            >
              Company
            </Typography>
            <Stack spacing={1}>
              {footerLinks.company.map((link) => (
                <Link
                  key={link.label}
                  component={RouterLink}
                  to={link.link}
                  sx={{
                    color: 'rgba(255,255,255,0.6)',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    transition: 'color 0.3s',
                    '&:hover': {
                      color: '#FFD700',
                    },
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Contact Column */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="body2"
              sx={{
                color: 'white',
                fontWeight: 700,
                mb: 2,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                fontSize: '0.85rem',
              }}
            >
              Get in Touch
            </Typography>
            <Stack spacing={1.5}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <LocationOn sx={{ color: '#FF6B35', fontSize: 18 }} />
                <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                  123 Power Street, EC 10001
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Phone sx={{ color: '#00D4FF', fontSize: 18 }} />
                <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                  +1 (555) 234-5678
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Email sx={{ color: '#FFD700', fontSize: 18 }} />
                <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                  support@electrohub.com
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>

        {/* Newsletter Section */}
        <Box
          sx={{
            mt: 4,
            p: 3,
            borderRadius: 2,
            bgcolor: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.05)',
            display: { xs: 'block', sm: 'flex' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          <Box>
            <Typography variant="body1" sx={{ color: 'white', fontWeight: 600 }}>
              Subscribe to our newsletter
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
              Get the latest updates on new products and special offers
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, mt: { xs: 2, sm: 0 }, width: { xs: '100%', sm: 'auto' } }}>
            <TextField
              placeholder="Enter your email"
              size="small"
              sx={{
                flex: { xs: 1, sm: 'none' },
                width: { xs: '100%', sm: 250 },
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  '& fieldset': {
                    borderColor: 'rgba(255,255,255,0.2)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255,255,255,0.4)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#FF6B35',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255,255,255,0.5)',
                },
              }}
            />
            <Button
              variant="contained"
              sx={{
                bgcolor: '#FF6B35',
                '&:hover': { bgcolor: '#e55a2a' },
                borderRadius: '50px',
                px: 3,
                fontWeight: 600,
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              Subscribe <ArrowForward sx={{ ml: 0.5, fontSize: 18 }} />
            </Button>
          </Box>
        </Box>

        {/* Bottom Bar */}
        <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.05)' }} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ fontSize: '0.8rem', textAlign: 'center' }}>
            © {currentYear} ElectroHub. All rights reserved. Made with ⚡ by ElectroHub Team
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link
              component={RouterLink}
              to="/privacy"
              sx={{
                color: 'rgba(255,255,255,0.4)',
                textDecoration: 'none',
                fontSize: '0.75rem',
                '&:hover': { color: 'white' },
              }}
            >
              Privacy Policy
            </Link>
            <Link
              component={RouterLink}
              to="/terms"
              sx={{
                color: 'rgba(255,255,255,0.4)',
                textDecoration: 'none',
                fontSize: '0.75rem',
                '&:hover': { color: 'white' },
              }}
            >
              Terms of Service
            </Link>
            <Link
              component={RouterLink}
              to="/sitemap"
              sx={{
                color: 'rgba(255,255,255,0.4)',
                textDecoration: 'none',
                fontSize: '0.75rem',
                '&:hover': { color: 'white' },
              }}
            >
              Sitemap
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;