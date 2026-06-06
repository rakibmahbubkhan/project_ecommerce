import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';
import {
  ShoppingBag,
  Category,
  ShoppingCart,
  People,
  AttachMoney,
} from '@mui/icons-material';
import api from '../../services/api';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch products
      const productsRes = await api.get('/products?page=1&limit=1');
      const categoriesRes = await api.get('/categories');
      const ordersRes = await api.get('/orders?page=1&limit=5');
      const usersRes = await api.get('/users');
      
      // Calculate total revenue
      const allOrdersRes = await api.get('/orders?page=1&limit=100');
      const totalRevenue = allOrdersRes.data.orders?.reduce((sum, order) => sum + order.grandTotal, 0) || 0;
      
      setStats({
        totalProducts: productsRes.data.total || 0,
        totalCategories: categoriesRes.data.length || 0,
        totalOrders: ordersRes.data.total || 0,
        totalUsers: usersRes.data.length || 0,
        totalRevenue: totalRevenue,
      });
      
      setRecentOrders(ordersRes.data.orders || []);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { title: 'Total Products', value: stats.totalProducts, icon: <ShoppingBag />, color: '#1976d2' },
    { title: 'Categories', value: stats.totalCategories, icon: <Category />, color: '#2e7d32' },
    { title: 'Total Orders', value: stats.totalOrders, icon: <ShoppingCart />, color: '#ed6c02' },
    { title: 'Total Users', value: stats.totalUsers, icon: <People />, color: '#9c27b0' },
    { title: 'Total Revenue', value: `$${stats.totalRevenue.toFixed(2)}`, icon: <AttachMoney />, color: '#d32f2f' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'success';
      case 'processing': return 'info';
      case 'shipped': return 'primary';
      case 'cancelled': return 'error';
      default: return 'warning';
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statCards.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography color="textSecondary" gutterBottom variant="body2">
                      {stat.title}
                    </Typography>
                    <Typography variant="h5" component="h2">
                      {stat.value}
                    </Typography>
                  </Box>
                  <Box sx={{ color: stat.color }}>
                    {React.cloneElement(stat.icon, { sx: { fontSize: 40 } })}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Recent Orders
      </Typography>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order Number</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Customer ID</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recentOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.orderNumber}</TableCell>
                <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>#{order.userId}</TableCell>
                <TableCell>${order.grandTotal}</TableCell>
                <TableCell>
                  <Chip
                    label={order.status}
                    color={getStatusColor(order.status)}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
            {recentOrders.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No orders found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminDashboard;