import { createSlice } from '@reduxjs/toolkit';

const apiSlice = createSlice({
   name: 'api',
   initialState: {
      baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
      endpoints: [
         'POST /create-order',
         'POST /track-pending-orders',
         'POST /add-new-product',
         'POST /get-product-on-category',
         'GET /get-all-color',
         'GET /get-all-attribute',
         'POST /add-category',
         'GET /get-all-category',
         'POST /save-shop-data',
         'POST /shop-owner-data',
         'POST /shop-owner-dashboard-data',
         'POST /save-salesman-data',
         'POST /show-salesman-data',
         'POST /register-user',
         'POST /login-user',
         'POST /file-upload',
         'GET /delete-image?publicId=...',
         'POST /add-item-cart',
         'PUT /update-cart-item-quantity',
         'DELETE /remove-cart-item/{id}',
      ],
   },
   reducers: {},
});

export default apiSlice.reducer;
