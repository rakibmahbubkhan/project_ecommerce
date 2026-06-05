import React from 'react';
import { Container, Typography, Paper } from '@mui/material';

const AdminProducts = () => {
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Manage Products
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography>Product management interface (implement CRUD operations)</Typography>
      </Paper>
    </Container>
  );
};

export default AdminProducts;