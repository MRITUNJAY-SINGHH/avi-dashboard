import { createSlice } from '@reduxjs/toolkit';

const apiSlice = createSlice({
   name: 'api',
   initialState: {
      baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
      username: import.meta.env.VITE_API_USERNAME || '',
      password: import.meta.env.VITE_API_PASSWORD || '',
      endpoints: [
         'POST /create-order',
         'POST /track-pending-orders',
         'POST /add-new-product',
         'POST /get-product-on-category',
         'GET /get-all-color',
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
      ],
   },
   reducers: {},
});

export default apiSlice.reducer;
