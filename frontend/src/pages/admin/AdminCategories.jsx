import React from 'react';
import { Container, Typography, Paper } from '@mui/material';

const AdminCategories = () => {
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Manage Categories
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography>Category management interface</Typography>
      </Paper>
    </Container>
  );
};

export default AdminCategories;