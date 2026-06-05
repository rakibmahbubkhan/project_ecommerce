import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from './components/Layout';
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
import ProfilePage from './pages/ProfilePage';
import OrdersPage from './pages/OrdersPage';

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (adminOnly && user?.role !== 'admin') {
    return <Navigate to="/" />;
  }
  
  return children;
};

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:slug" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
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
        
        {/* Admin Routes */}
        <Route path="/admin" element={
          <PrivateRoute adminOnly>
            <AdminDashboard />
          </PrivateRoute>
        } />
        
        <Route path="/admin/products" element={
          <PrivateRoute adminOnly>
            <AdminProducts />
          </PrivateRoute>
        } />
        
        <Route path="/admin/orders" element={
          <PrivateRoute adminOnly>
            <AdminOrders />
          </PrivateRoute>
        } />
        
        <Route path="/admin/categories" element={
          <PrivateRoute adminOnly>
            <AdminCategories />
          </PrivateRoute>
        } />
      </Routes>
    </Layout>
  );
}

export default App;