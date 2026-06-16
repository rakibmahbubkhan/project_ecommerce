import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { Box } from '@mui/material';

const Layout = ({ children }) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      bgcolor: '#f5f7fa',
    }}>
      <Navbar />
      <Box component="main" sx={{ flex: 1 }}>
        {children || <Outlet />}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;