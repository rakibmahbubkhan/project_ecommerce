import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from './components/Layout';
import AdminLayout from './components/admin/AdminLayout';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminCategories from './pages/admin/AdminCategories';
import AdminUsers from './pages/admin/AdminUsers';
import ProfilePage from './pages/ProfilePage';
import OrdersPage from './pages/OrdersPage';

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  
  console.log('PrivateRoute check:', { isAuthenticated, user, adminOnly }); // Debug log
  
  if (!isAuthenticated) {
    console.log('Not authenticated, redirecting to login');
    return <Navigate to="/login" />;
  }
  
  if (adminOnly && user?.role !== 'admin') {
    console.log('Not admin, redirecting to home. User role:', user?.role);
    return <Navigate to="/" />;
  }
  
  console.log('Access granted');
  return children;
};

function App() {
  return (
    <Routes>
      {/* Public Routes with Layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:slug" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Protected User Routes */}
        <Route path="/profile" element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        } />
        <Route path="/orders" element={
          <PrivateRoute>
            <OrdersPage />
          </PrivateRoute>
        } />
        <Route path="/checkout" element={
          <PrivateRoute>
            <CheckoutPage />
          </PrivateRoute>
        } />
      </Route>
      
      {/* Admin Routes with AdminLayout */}
      <Route path="/admin" element={
        <PrivateRoute adminOnly>
          <AdminLayout />
        </PrivateRoute>
      }>
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="users" element={<AdminUsers />} />
      </Route>
    </Routes>
  );
}

export default App;