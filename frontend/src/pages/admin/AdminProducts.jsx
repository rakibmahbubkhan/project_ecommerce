import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Switch,
  FormControlLabel,
  Chip,
  CircularProgress,
  Alert,
  MenuItem,
  InputAdornment,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from '@mui/material';
import {
  Edit,
  Delete,
  Add,
  Visibility,
  CloudUpload,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import api from '../../services/api';
import toast from 'react-hot-toast';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    comparePrice: '',
    sku: '',
    stockQuantity: '',
    categoryId: '',
    isActive: true,
    isFeatured: false,
    imageUrls: [],
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/products?page=1&limit=100');
      setProducts(response.data.products);
    } catch (error) {
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const handleOpenDialog = (product = null) => {
    setSelectedFile(null);
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        description: product.description || '',
        price: product.price,
        comparePrice: product.comparePrice || '',
        sku: product.sku,
        stockQuantity: product.stockQuantity,
        categoryId: product.categoryId || '',
        isActive: product.isActive,
        isFeatured: product.isFeatured,
        imageUrls: product.imageUrls || [],
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        comparePrice: '',
        sku: '',
        stockQuantity: '',
        categoryId: '',
        isActive: true,
        isFeatured: false,
        imageUrls: [],
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingProduct(null);
    setSelectedFile(null);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUrlsChange = (e) => {
    const urls = e.target.value.split(',').map(url => url.trim()).filter(url => url !== '');
    setFormData({
      ...formData,
      imageUrls: urls
    });
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size should be less than 5MB');
        return;
      }
      setSelectedFile(file);
    }
  };

  const uploadImage = async () => {
    if (!selectedFile) return null;
    
    setUploadingImage(true);
    try {
      const fileData = new FormData();
      fileData.append('file', selectedFile);

      const uploadRes = await api.post('/products/upload', fileData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      toast.success('Image uploaded successfully');
      return uploadRes.data.url;
    } catch (error) {
      toast.error('Failed to upload image');
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, index) => index !== indexToRemove)
    });
  };

  const handleSubmit = async () => {
    try {
      let currentImages = [...formData.imageUrls];

      // Upload selected file if exists
      if (selectedFile) {
        const uploadedImageUrl = await uploadImage();
        if (uploadedImageUrl) {
          currentImages.push(uploadedImageUrl);
        } else {
          return; // Stop submission if upload failed
        }
      }

      // Prepare payload with proper data types
      const payload = {
        name: formData.name,
        description: formData.description,
        price: formData.price !== '' ? Number(formData.price) : undefined,
        comparePrice: formData.comparePrice !== '' ? Number(formData.comparePrice) : undefined,
        sku: formData.sku,
        stockQuantity: formData.stockQuantity !== '' ? Number(formData.stockQuantity) : undefined,
        categoryId: formData.categoryId !== '' ? Number(formData.categoryId) : undefined,
        isActive: formData.isActive,
        isFeatured: formData.isFeatured,
        imageUrls: currentImages,
      };

      if (editingProduct) {
        await api.patch(`/products/${editingProduct.id}`, payload);
        toast.success('Product updated successfully');
      } else {
        await api.post('/products', payload);
        toast.success('Product created successfully');
      }
      
      fetchProducts();
      handleCloseDialog();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/products/${id}`);
        toast.success('Product deleted successfully');
        fetchProducts();
      } catch (error) {
        toast.error('Failed to delete product');
      }
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
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Products</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
        >
          Add Product
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Image</TableCell> {/* <-- Add this header */}
                <TableCell>Name</TableCell>
                <TableCell>SKU</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
          <TableBody>
                      {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                
                {/* Add this TableCell to display the product image */}
                <TableCell>
                  {product.imageUrls && product.imageUrls.length > 0 ? (
                    <Box
                      component="img"
                      src={
                        product.imageUrls[0].startsWith('http')
                          ? product.imageUrls[0]
                          : `${'http://localhost:3001'}${product.imageUrls[0]}`
                      }
                      alt={product.name}
                      sx={{
                        width: 50,
                        height: 50,
                        objectFit: 'cover',
                        borderRadius: 1,
                        border: '1px solid #e0e0e0'
                      }}
                    />
                  ) : (
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#f5f5f5',
                        borderRadius: 1,
                        fontSize: '10px',
                        color: '#9e9e9e',
                        border: '1px dashed #ccc'
                      }}
                    >
                      No Img
                    </Box>
                  )}
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.sku}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>
                  <Chip
                    label={product.stockQuantity}
                    color={product.stockQuantity > 0 ? 'success' : 'error'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={product.isActive ? 'Active' : 'Inactive'}
                    color={product.isActive ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => handleOpenDialog(product)}>
                    <Edit />
                  </IconButton>
                  <IconButton size="small" color="error" onClick={() => handleDelete(product.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>{editingProduct ? 'Edit Product' : 'Add Product'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Product Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                multiline
                rows={3}
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>
            
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Price"
                name="price"
                type="number"
                InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                value={formData.price}
                onChange={handleChange}
                required
              />
            </Grid>
            
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Compare Price"
                name="comparePrice"
                type="number"
                InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                value={formData.comparePrice}
                onChange={handleChange}
              />
            </Grid>
            
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="SKU"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                required
              />
            </Grid>
            
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Stock Quantity"
                name="stockQuantity"
                type="number"
                value={formData.stockQuantity}
                onChange={handleChange}
                required
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Category"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
              >
                <MenuItem value="">None</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Image Upload Section */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Product Images
              </Typography>
              
              {/* File upload button */}
              <Button
                variant="outlined"
                component="label"
                fullWidth
                startIcon={<CloudUpload />}
                disabled={uploadingImage}
              >
                {uploadingImage ? 'Uploading...' : 'Upload Image from Computer'}
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleFileSelect}
                />
              </Button>
              
              {selectedFile && (
                <Alert severity="info" sx={{ mt: 1 }}>
                  Ready to upload: {selectedFile.name}
                </Alert>
              )}

              {/* Image URLs input */}
              <TextField
                fullWidth
                label="Image URLs (Comma-separated)"
                placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                value={formData.imageUrls.join(', ')}
                onChange={handleImageUrlsChange}
                helperText="Enter image URLs separated by commas"
                sx={{ mt: 2 }}
              />

              {/* Image preview grid */}
              {formData.imageUrls.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Image Previews:
                  </Typography>
                  <ImageList sx={{ width: '100%', height: 'auto' }} cols={3} rowHeight={120}>
                    {formData.imageUrls.map((url, index) => (
                      <ImageListItem key={index} sx={{ position: 'relative' }}>
                        <img
                          src={url}
                          alt={`Product ${index + 1}`}
                          loading="lazy"
                          style={{ height: 120, objectFit: 'cover' }}
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/120?text=Invalid+URL';
                          }}
                        />
                        <ImageListItemBar
                          position="top"
                          actionIcon={
                            <IconButton
                              sx={{ color: 'white', bgcolor: 'rgba(0,0,0,0.5)' }}
                              onClick={() => handleRemoveImage(index)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          }
                          actionPosition="right"
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
                </Box>
              )}
            </Grid>
            
            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  />
                }
                label="Active"
              />
            </Grid>
            
            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  />
                }
                label="Featured"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            color="primary"
            disabled={uploadingImage}
          >
            {editingProduct ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminProducts;