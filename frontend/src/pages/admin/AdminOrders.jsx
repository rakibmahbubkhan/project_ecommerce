import React from 'react';
import { Container, Typography, Paper } from '@mui/material';

const AdminOrders = () => {
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Manage Orders
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography>Order management interface</Typography>
      </Paper>
    </Container>
  );
};

export default AdminOrders;