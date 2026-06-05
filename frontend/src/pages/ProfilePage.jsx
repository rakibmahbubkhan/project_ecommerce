import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Paper, Typography, Box, Avatar, Divider } from '@mui/material';
import { Person } from '@mui/icons-material';

const ProfilePage = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main', mr: 3 }}>
            <Person sx={{ fontSize: 50 }} />
          </Avatar>
          <Typography variant="h4">
            {user?.firstName} {user?.lastName}
          </Typography>
        </Box>
        
        <Divider sx={{ my: 3 }} />
        
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Profile Information
          </Typography>
          <Typography><strong>Email:</strong> {user?.email}</Typography>
          <Typography><strong>Role:</strong> {user?.role}</Typography>
          <Typography><strong>Account Status:</strong> {user?.isActive ? 'Active' : 'Inactive'}</Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProfilePage;