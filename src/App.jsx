import React, { useMemo, useState } from 'react';
import {
   FiBox,
   FiEdit3,
   FiEye,
   FiGrid,
   FiImage,
   FiLayers,
   FiLogIn,
   FiPackage,
   FiPlusCircle,
   FiSettings,
   FiShoppingCart,
   FiTruck,
   FiUpload,
   FiUser,
   FiUsers,
} from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import SidebarNav from './components/SidebarNav';
import TopSearchBar from './components/TopSearchBar';
import NotificationButton from './components/NotificationButton';
import ProfileMenu from './components/ProfileMenu';
import DataTable from './components/DataTable';
import {
   closeProfile,
   setActivePanel,
   setLoggedIn,
   setNotice,
   setSearchText,
   toggleMenu,
   toggleProfile,
} from './store/uiSlice';

const sidebarSections = [
   {
      id: 'orders',
      label: 'Orders',
      icon: FiShoppingCart,
      children: [
         { id: 'order-create', label: 'Add Order', icon: FiPlusCircle },
         { id: 'order-view', label: 'View Pending', icon: FiEye },
      ],
   },
   {
      id: 'products',
      label: 'Products',
      icon: FiPackage,
      children: [
         { id: 'product-add', label: 'Add Product', icon: FiPlusCircle },
         { id: 'product-view', label: 'View Product', icon: FiEye },
         { id: 'product-edit', label: 'Edit Product', icon: FiEdit3 },
      ],
   },
   {
      id: 'colors',
      label: 'Colors',
      icon: FiGrid,
      children: [
         { id: 'color-add', label: 'Add Color', icon: FiPlusCircle },
         { id: 'color-view', label: 'View Colors', icon: FiEye },
         { id: 'color-edit', label: 'Edit Color', icon: FiEdit3 },
      ],
   },
   {
      id: 'categories',
      label: 'Categories',
      icon: FiLayers,
      children: [
         { id: 'category-add', label: 'Add Category', icon: FiPlusCircle },
         { id: 'category-view', label: 'View Categories', icon: FiEye },
         { id: 'category-edit', label: 'Edit Category', icon: FiEdit3 },
      ],
   },
   {
      id: 'shop-owner',
      label: 'Shop Owner',
      icon: FiUsers,
      children: [
         { id: 'shop-owner-add', label: 'Add Owner', icon: FiPlusCircle },
         { id: 'shop-owner-view', label: 'View Owners', icon: FiEye },
         {
            id: 'shop-owner-dashboard-view',
            label: 'Owner Dashboard Data',
            icon: FiEye,
         },
      ],
   },
   {
      id: 'salesman',
      label: 'Salesman',
      icon: FiTruck,
      children: [
         { id: 'salesman-add', label: 'Add Salesman', icon: FiPlusCircle },
         { id: 'salesman-view', label: 'View Salesmen', icon: FiEye },
      ],
   },
   {
      id: 'users',
      label: 'Users',
      icon: FiUser,
      children: [
         { id: 'user-register', label: 'Register User', icon: FiPlusCircle },
         { id: 'user-login', label: 'Login User API', icon: FiLogIn },
      ],
   },
   {
      id: 'files',
      label: 'Files',
      icon: FiImage,
      children: [
         { id: 'file-upload', label: 'Upload File', icon: FiUpload },
         { id: 'delete-image', label: 'Delete Image', icon: FiSettings },
      ],
   },
   {
      id: 'cart',
      label: 'Cart',
      icon: FiBox,
      children: [
         { id: 'cart-add', label: 'Add Item To Cart', icon: FiPlusCircle },
      ],
   },
];

const sectionMeta = {
   'order-create': { title: 'Create Order', description: 'POST /create-order' },
   'order-view': {
      title: 'Pending Orders',
      description: 'POST /track-pending-orders',
   },
   'product-add': {
      title: 'Add Product',
      description: 'POST /add-new-product',
   },
   'product-view': {
      title: 'View Product',
      description: 'POST /get-product-on-category',
   },
   'product-edit': {
      title: 'Edit Product',
      description: 'Edit endpoint not provided in API list yet.',
   },
   'color-add': {
      title: 'Add Color',
      description: 'Add color endpoint not provided in API list yet.',
   },
   'color-view': { title: 'View Colors', description: 'GET /get-all-color' },
   'color-edit': {
      title: 'Edit Color',
      description: 'Edit color endpoint not provided in API list yet.',
   },
   'category-add': { title: 'Add Category', description: 'POST /add-category' },
   'category-view': {
      title: 'View Categories',
      description: 'GET /get-all-category',
   },
   'category-edit': {
      title: 'Edit Category',
      description: 'Edit category endpoint not provided in API list yet.',
   },
   'shop-owner-add': {
      title: 'Add Shop Owner',
      description: 'POST /save-shop-data',
   },
   'shop-owner-view': {
      title: 'Shop Owner Data',
      description: 'POST /shop-owner-data',
   },
   'shop-owner-dashboard-view': {
      title: 'Shop Owner Dashboard Data',
      description: 'POST /shop-owner-dashboard-data',
   },
   'salesman-add': {
      title: 'Add Salesman',
      description: 'POST /save-salesman-data',
   },
   'salesman-view': {
      title: 'Salesman Data',
      description: 'POST /show-salesman-data',
   },
   'user-register': {
      title: 'Register User',
      description: 'POST /register-user',
   },
   'user-login': { title: 'Login User API', description: 'POST /login-user' },
   'file-upload': { title: 'Upload File', description: 'POST /file-upload' },
   'delete-image': {
      title: 'Delete Image',
      description: 'GET /delete-image?publicId=...',
   },
   'cart-add': {
      title: 'Add Item To Cart',
      description: 'POST /add-item-cart',
   },
};

const toArray = (payload) => {
   if (Array.isArray(payload)) return payload;
   if (!payload || typeof payload !== 'object') return [];
   if (Array.isArray(payload.data)) return payload.data;
   const firstArray = Object.values(payload).find((item) =>
      Array.isArray(item),
   );
   return firstArray || [];
};

const toInt = (value, fallback = 0) => {
   const parsed = Number.parseInt(value, 10);
   return Number.isNaN(parsed) ? fallback : parsed;
};

const toFloat = (value, fallback = 0) => {
   const parsed = Number.parseFloat(value);
   return Number.isNaN(parsed) ? fallback : parsed;
};

const PlaceholderPanel = ({ message }) => (
   <div className='rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700'>
      {message}
   </div>
);

const App = () => {
   const dispatch = useDispatch();

   const {
      isLoggedIn,
      searchText,
      profileOpen,
      notice,
      openMenus,
      activePanel,
   } = useSelector((state) => state.ui);
   const { baseUrl, username, password } = useSelector((state) => state.api);

   const [loading, setLoading] = useState({});
   const [uploadFile, setUploadFile] = useState(null);

   const [rows, setRows] = useState({
      pendingOrders: [],
      products: [],
      colors: [],
      categories: [],
      shopOwners: [],
      shopOwnerDashboard: [],
      salesmen: [],
   });

   const [forms, setForms] = useState({
      order: {
         orderDesc: 'Order for 3 Bluetooth Speakers',
         totalAmount: '500',
         doc_obj_id: 'DOC_20250411_001',
         status: 'PENDING',
         orderType: 'newOrder',
         deliveryDate: '2026-04-20T14:00',
         salesmanId: '8',
         clientId: '6',
      },
      product: {
         categoryId: '2',
         productName: '144 watt charger',
         description: '144 watt charger cover all your needs',
         price: '275.5',
         stockQuantity: '100',
         imageId: 'product-image-id',
         colourId: '3',
         attributeId: '1',
         stock: '250',
         minQuantity: '10',
         mrp: '2025.6',
         wholesalePrice: '275.5',
         retailPrice: '150',
         warranty: '6',
      },
      productView: { categoryId: '2' },
      category: { categoryName: 'charger', imageId: '1' },
      shopOwner: {
         username: 'shopowner_demo',
         password: 'demo@123',
         phoneNumber: '9000000000',
         email: 'shopowner@example.com',
         name: 'Demo Shop Owner',
         gstNumber: '2362441',
         addressLine1: 'A-26, Panchsheel Vihar',
         postalCode: '110017',
         residingState: 'Delhi',
         city: 'Malviya Nagar',
         country: 'India',
         shopName: 'Mobicare Mobile Solution',
         longitude: '20.59634',
         latitude: '52.489563',
      },
      salesman: {
         username: 'salesman_demo',
         password: 'demo@123',
         phoneNumber: '9000000001',
         email: 'salesman@example.com',
         name: 'Demo Salesman',
         aadharDocId: '22553366',
         address: 'B-78 Panchsheel',
      },
      registerUser: {
         username: 'user_demo',
         password: 'demo@123',
         phoneNumber: '9000000002',
         email: 'user@example.com',
      },
      loginUser: { userName: 'user_demo', passwordHash: 'demo@123' },
      deleteImage: { publicId: '' },
      cart: { cartId: '1', clientId: '29', variantId: '4', quantity: '4' },
   });

   const filteredSidebar = useMemo(() => {
      if (!searchText.trim()) return sidebarSections;
      const q = searchText.toLowerCase();
      return sidebarSections
         .map((section) => ({
            ...section,
            children: section.children.filter((child) =>
               child.label.toLowerCase().includes(q),
            ),
         }))
         .filter(
            (section) =>
               section.label.toLowerCase().includes(q) ||
               section.children.length > 0,
         );
   }, [searchText]);

   const currentMeta = sectionMeta[activePanel];

   const setBusy = (key, value) => {
      setLoading((prev) => ({ ...prev, [key]: value }));
   };

   const setFormValue = (formName, key, value) => {
      setForms((prev) => ({
         ...prev,
         [formName]: {
            ...prev[formName],
            [key]: value,
         },
      }));
   };

   const apiFetch = async ({
      path,
      method = 'GET',
      body,
      withAuth = false,
   }) => {
      const headers = {};

      if (withAuth) {
         if (!username || !password) {
            throw new Error(
               'Set VITE_API_USERNAME and VITE_API_PASSWORD in env for protected APIs.',
            );
         }
         headers.Authorization = `Basic ${btoa(`${username}:${password}`)}`;
      }

      let requestBody = body;
      if (body !== undefined && !(body instanceof FormData)) {
         headers['Content-Type'] = 'application/json';
         requestBody = JSON.stringify(body);
      }

      const response = await fetch(`${baseUrl}${path}`, {
         method,
         headers,
         body: requestBody,
      });

      const raw = await response.text();
      let parsed = null;
      if (raw) {
         try {
            parsed = JSON.parse(raw);
         } catch {
            parsed = raw;
         }
      }

      if (!response.ok) {
         const message =
            typeof parsed === 'string'
               ? parsed
               : parsed?.message || `${response.status} ${response.statusText}`;
         throw new Error(message);
      }

      return parsed;
   };

   const withAction = async (key, action) => {
      setBusy(key, true);
      try {
         await action();
      } catch (error) {
         dispatch(setNotice({ type: 'error', text: error.message }));
      } finally {
         setBusy(key, false);
      }
   };

   const submitCreateOrder = (event) => {
      event.preventDefault();
      withAction('createOrder', async () => {
         await apiFetch({
            path: '/create-order',
            method: 'POST',
            body: {
               orderDesc: forms.order.orderDesc,
               totalAmount: toFloat(forms.order.totalAmount),
               doc_obj_id: forms.order.doc_obj_id,
               status: forms.order.status,
               orderType: forms.order.orderType,
               deliveryDate: new Date(forms.order.deliveryDate).toISOString(),
               salesmanId: toInt(forms.order.salesmanId),
               clientId: toInt(forms.order.clientId),
            },
         });
         dispatch(setNotice({ type: 'success', text: 'Order created.' }));
      });
   };

   const loadPendingOrders = () => {
      withAction('pendingOrders', async () => {
         const payload = await apiFetch({
            path: '/track-pending-orders',
            method: 'POST',
            body: [],
         });
         setRows((prev) => ({ ...prev, pendingOrders: toArray(payload) }));
         dispatch(
            setNotice({ type: 'success', text: 'Pending orders loaded.' }),
         );
      });
   };

   const submitAddProduct = (event) => {
      event.preventDefault();
      withAction('addProduct', async () => {
         await apiFetch({
            path: '/add-new-product',
            method: 'POST',
            withAuth: true,
            body: {
               categoryId: toInt(forms.product.categoryId),
               productDTO: {
                  productName: forms.product.productName,
                  description: forms.product.description,
                  price: toFloat(forms.product.price),
                  stockQuantity: toInt(forms.product.stockQuantity),
                  status: 'Y',
                  imageId: forms.product.imageId,
               },
               productVariantList: [
                  {
                     colourId: toInt(forms.product.colourId),
                     attributeId: toInt(forms.product.attributeId),
                     stock: toInt(forms.product.stock),
                     status: 'A',
                     minQuantity: toInt(forms.product.minQuantity),
                     mrp: toFloat(forms.product.mrp),
                     wholesalePrice: toFloat(forms.product.wholesalePrice),
                     retailPrice: toFloat(forms.product.retailPrice),
                     warranty: toInt(forms.product.warranty),
                     defaultVariant: 'Y',
                     imageId: forms.product.imageId,
                  },
               ],
            },
         });
         dispatch(setNotice({ type: 'success', text: 'Product created.' }));
      });
   };

   const loadProductsByCategory = () => {
      withAction('viewProducts', async () => {
         const payload = await apiFetch({
            path: '/get-product-on-category',
            method: 'POST',
            body: [{ name: 'categoryId', value: forms.productView.categoryId }],
         });
         setRows((prev) => ({ ...prev, products: toArray(payload) }));
         dispatch(setNotice({ type: 'success', text: 'Products loaded.' }));
      });
   };

   const loadColors = () => {
      withAction('viewColors', async () => {
         const payload = await apiFetch({
            path: '/get-all-color',
            method: 'GET',
            withAuth: true,
         });
         setRows((prev) => ({ ...prev, colors: toArray(payload) }));
         dispatch(setNotice({ type: 'success', text: 'Colors loaded.' }));
      });
   };

   const submitAddCategory = (event) => {
      event.preventDefault();
      withAction('addCategory', async () => {
         await apiFetch({
            path: '/add-category',
            method: 'POST',
            withAuth: true,
            body: {
               categoryName: forms.category.categoryName,
               imageId: forms.category.imageId,
            },
         });
         dispatch(setNotice({ type: 'success', text: 'Category created.' }));
      });
   };

   const loadCategories = () => {
      withAction('viewCategories', async () => {
         const payload = await apiFetch({
            path: '/get-all-category',
            method: 'GET',
            withAuth: true,
         });
         setRows((prev) => ({ ...prev, categories: toArray(payload) }));
         dispatch(setNotice({ type: 'success', text: 'Categories loaded.' }));
      });
   };

   const submitShopOwner = (event) => {
      event.preventDefault();
      withAction('shopOwnerAdd', async () => {
         await apiFetch({
            path: '/save-shop-data',
            method: 'POST',
            body: {
               username: forms.shopOwner.username,
               password: forms.shopOwner.password,
               phoneNumber: forms.shopOwner.phoneNumber,
               email: forms.shopOwner.email,
               userType: 'SHOPOWNER',
               salesManRegisterDTOList: {},
               shopOwnerRegisterDTOList: {
                  name: forms.shopOwner.name,
                  phoneNumber: forms.shopOwner.phoneNumber,
                  email: forms.shopOwner.email,
                  docObjId1: '',
                  totalBilledAmount: 0,
                  remainingAmount: 0,
                  totalOrders: 0,
                  gstNumber: forms.shopOwner.gstNumber,
                  shopOwnerAddressListDto: [
                     {
                        isDefault: 'Y',
                        active: 'Y',
                        addressLine1: forms.shopOwner.addressLine1,
                        addressLine2: '',
                        postalCode: forms.shopOwner.postalCode,
                        residingState: forms.shopOwner.residingState,
                        city: forms.shopOwner.city,
                        country: forms.shopOwner.country,
                        shopName: forms.shopOwner.shopName,
                        longitude: forms.shopOwner.longitude,
                        latitude: forms.shopOwner.latitude,
                     },
                  ],
               },
            },
         });
         dispatch(setNotice({ type: 'success', text: 'Shop owner created.' }));
      });
   };

   const loadShopOwners = () => {
      withAction('shopOwnerView', async () => {
         const payload = await apiFetch({
            path: '/shop-owner-data',
            method: 'POST',
         });
         setRows((prev) => ({ ...prev, shopOwners: toArray(payload) }));
         dispatch(setNotice({ type: 'success', text: 'Shop owners loaded.' }));
      });
   };

   const loadShopOwnerDashboardData = () => {
      withAction('shopOwnerDashboardView', async () => {
         const payload = await apiFetch({
            path: '/shop-owner-dashboard-data',
            method: 'POST',
            withAuth: true,
         });
         setRows((prev) => ({ ...prev, shopOwnerDashboard: toArray(payload) }));
         dispatch(
            setNotice({
               type: 'success',
               text: 'Shop owner dashboard data loaded.',
            }),
         );
      });
   };

   const submitSalesman = (event) => {
      event.preventDefault();
      withAction('salesmanAdd', async () => {
         await apiFetch({
            path: '/save-salesman-data',
            method: 'POST',
            withAuth: true,
            body: {
               username: forms.salesman.username,
               password: forms.salesman.password,
               phoneNumber: forms.salesman.phoneNumber,
               email: forms.salesman.email,
               userType: 'SALESMAN',
               salesManRegisterDTOList: {
                  name: forms.salesman.name,
                  email: forms.salesman.email,
                  aadharDocId: forms.salesman.aadharDocId,
                  address: forms.salesman.address,
                  phoneNumber: forms.salesman.phoneNumber,
               },
            },
         });
         dispatch(setNotice({ type: 'success', text: 'Salesman created.' }));
      });
   };

   const loadSalesmen = () => {
      withAction('salesmanView', async () => {
         const payload = await apiFetch({
            path: '/show-salesman-data',
            method: 'POST',
            withAuth: true,
         });
         setRows((prev) => ({ ...prev, salesmen: toArray(payload) }));
         dispatch(setNotice({ type: 'success', text: 'Salesmen loaded.' }));
      });
   };

   const submitRegisterUser = (event) => {
      event.preventDefault();
      withAction('registerUser', async () => {
         await apiFetch({
            path: '/register-user',
            method: 'POST',
            body: {
               username: forms.registerUser.username,
               password: forms.registerUser.password,
               phoneNumber: forms.registerUser.phoneNumber,
               email: forms.registerUser.email,
               userType: 'SHOPOWNER',
               salesManRegisterDTOList: {},
               shopOwnerRegisterDTOList: {
                  name: forms.registerUser.username,
                  phoneNumber: forms.registerUser.phoneNumber,
                  email: forms.registerUser.email,
                  docObjId1: '',
                  totalBilledAmount: 0,
                  remainingAmount: 0,
                  totalOrders: 0,
                  gstNumber: '0000',
                  shopOwnerAddressListDto: [],
               },
            },
         });
         dispatch(setNotice({ type: 'success', text: 'User registered.' }));
      });
   };

   const submitLoginUserApi = (event) => {
      event.preventDefault();
      withAction('loginUser', async () => {
         await apiFetch({
            path: '/login-user',
            method: 'POST',
            body: {
               userName: forms.loginUser.userName,
               passwordHash: forms.loginUser.passwordHash,
            },
         });
         dispatch(
            setNotice({
               type: 'success',
               text: 'Login API called successfully.',
            }),
         );
      });
   };

   const submitFileUpload = (event) => {
      event.preventDefault();
      withAction('fileUpload', async () => {
         if (!uploadFile) throw new Error('Select a file first.');
         const data = new FormData();
         data.append('file', uploadFile);
         await apiFetch({
            path: '/file-upload',
            method: 'POST',
            withAuth: true,
            body: data,
         });
         dispatch(setNotice({ type: 'success', text: 'File uploaded.' }));
      });
   };

   const deleteImageByPublicId = () => {
      withAction('deleteImage', async () => {
         if (!forms.deleteImage.publicId) throw new Error('Enter a publicId.');
         await apiFetch({
            path: `/delete-image?publicId=${encodeURIComponent(forms.deleteImage.publicId)}`,
            method: 'GET',
            withAuth: true,
         });
         dispatch(setNotice({ type: 'success', text: 'Image deleted.' }));
      });
   };

   const submitAddCartItem = (event) => {
      event.preventDefault();
      withAction('cartAdd', async () => {
         await apiFetch({
            path: '/add-item-cart',
            method: 'POST',
            withAuth: true,
            body: {
               cartId: toInt(forms.cart.cartId),
               clientId: toInt(forms.cart.clientId),
               totalAmount: '',
               status: 'A',
               cartItemDTO: [
                  {
                     cartItemId: '',
                     cartId: forms.cart.cartId,
                     variantId: forms.cart.variantId,
                     quantity: forms.cart.quantity,
                     variantPriceTotal: '',
                     createdBy: '1',
                     lastUpdatedBy: '1',
                  },
               ],
            },
         });
         dispatch(setNotice({ type: 'success', text: 'Cart item added.' }));
      });
   };

   const renderPanel = () => {
      if (activePanel === 'order-create') {
         return (
            <form className='space-y-4' onSubmit={submitCreateOrder}>
               <div className='grid gap-4 md:grid-cols-2'>
                  <input
                     className='input'
                     placeholder='Order description'
                     value={forms.order.orderDesc}
                     onChange={(e) =>
                        setFormValue('order', 'orderDesc', e.target.value)
                     }
                  />
                  <input
                     className='input'
                     placeholder='Total amount'
                     type='number'
                     value={forms.order.totalAmount}
                     onChange={(e) =>
                        setFormValue('order', 'totalAmount', e.target.value)
                     }
                  />
                  <input
                     className='input'
                     placeholder='Doc object id'
                     value={forms.order.doc_obj_id}
                     onChange={(e) =>
                        setFormValue('order', 'doc_obj_id', e.target.value)
                     }
                  />
                  <input
                     className='input'
                     type='datetime-local'
                     value={forms.order.deliveryDate}
                     onChange={(e) =>
                        setFormValue('order', 'deliveryDate', e.target.value)
                     }
                  />
                  <input
                     className='input'
                     placeholder='Salesman id'
                     type='number'
                     value={forms.order.salesmanId}
                     onChange={(e) =>
                        setFormValue('order', 'salesmanId', e.target.value)
                     }
                  />
                  <input
                     className='input'
                     placeholder='Client id'
                     type='number'
                     value={forms.order.clientId}
                     onChange={(e) =>
                        setFormValue('order', 'clientId', e.target.value)
                     }
                  />
               </div>
               <button className='btn-primary' disabled={loading.createOrder}>
                  {loading.createOrder ? 'Saving...' : 'Create Order'}
               </button>
            </form>
         );
      }

      if (activePanel === 'order-view') {
         return (
            <div className='space-y-4'>
               <button
                  className='btn-primary'
                  onClick={loadPendingOrders}
                  disabled={loading.pendingOrders}
               >
                  {loading.pendingOrders ? 'Loading...' : 'Load Pending Orders'}
               </button>
               <DataTable rows={rows.pendingOrders} />
            </div>
         );
      }

      if (activePanel === 'product-add') {
         return (
            <form className='space-y-4' onSubmit={submitAddProduct}>
               <div className='grid gap-4 md:grid-cols-2'>
                  <input
                     className='input'
                     placeholder='Category id'
                     value={forms.product.categoryId}
                     onChange={(e) =>
                        setFormValue('product', 'categoryId', e.target.value)
                     }
                  />
                  <input
                     className='input'
                     placeholder='Product name'
                     value={forms.product.productName}
                     onChange={(e) =>
                        setFormValue('product', 'productName', e.target.value)
                     }
                  />
                  <input
                     className='input'
                     placeholder='Description'
                     value={forms.product.description}
                     onChange={(e) =>
                        setFormValue('product', 'description', e.target.value)
                     }
                  />
                  <input
                     className='input'
                     placeholder='Price'
                     value={forms.product.price}
                     onChange={(e) =>
                        setFormValue('product', 'price', e.target.value)
                     }
                  />
                  <input
                     className='input'
                     placeholder='Stock quantity'
                     value={forms.product.stockQuantity}
                     onChange={(e) =>
                        setFormValue('product', 'stockQuantity', e.target.value)
                     }
                  />
                  <input
                     className='input'
                     placeholder='Image id'
                     value={forms.product.imageId}
                     onChange={(e) =>
                        setFormValue('product', 'imageId', e.target.value)
                     }
                  />
                  <input
                     className='input'
                     placeholder='Color id'
                     value={forms.product.colourId}
                     onChange={(e) =>
                        setFormValue('product', 'colourId', e.target.value)
                     }
                  />
                  <input
                     className='input'
                     placeholder='Attribute id'
                     value={forms.product.attributeId}
                     onChange={(e) =>
                        setFormValue('product', 'attributeId', e.target.value)
                     }
                  />
               </div>
               <button className='btn-primary' disabled={loading.addProduct}>
                  {loading.addProduct ? 'Saving...' : 'Add Product'}
               </button>
            </form>
         );
      }

      if (activePanel === 'product-view') {
         return (
            <div className='space-y-4'>
               <div className='flex flex-col gap-3 sm:flex-row'>
                  <input
                     className='input max-w-sm'
                     value={forms.productView.categoryId}
                     onChange={(e) =>
                        setFormValue(
                           'productView',
                           'categoryId',
                           e.target.value,
                        )
                     }
                     placeholder='Category id'
                  />
                  <button
                     className='btn-primary'
                     onClick={loadProductsByCategory}
                     disabled={loading.viewProducts}
                  >
                     {loading.viewProducts ? 'Loading...' : 'Load Products'}
                  </button>
               </div>
               <DataTable rows={rows.products} />
            </div>
         );
      }

      if (activePanel === 'product-edit')
         return (
            <PlaceholderPanel message='Edit product endpoint is not provided yet.' />
         );

      if (activePanel === 'color-view') {
         return (
            <div className='space-y-4'>
               <button
                  className='btn-primary'
                  onClick={loadColors}
                  disabled={loading.viewColors}
               >
                  {loading.viewColors ? 'Loading...' : 'Load Colors'}
               </button>
               <DataTable rows={rows.colors} />
            </div>
         );
      }

      if (activePanel === 'color-add')
         return (
            <PlaceholderPanel message='Add color endpoint is not in your API list.' />
         );
      if (activePanel === 'color-edit')
         return (
            <PlaceholderPanel message='Edit color endpoint is not in your API list.' />
         );

      if (activePanel === 'category-add') {
         return (
            <form className='space-y-4' onSubmit={submitAddCategory}>
               <div className='grid gap-4 md:grid-cols-2'>
                  <input
                     className='input'
                     placeholder='Category name'
                     value={forms.category.categoryName}
                     onChange={(e) =>
                        setFormValue('category', 'categoryName', e.target.value)
                     }
                  />
                  <input
                     className='input'
                     placeholder='Image id'
                     value={forms.category.imageId}
                     onChange={(e) =>
                        setFormValue('category', 'imageId', e.target.value)
                     }
                  />
               </div>
               <button className='btn-primary' disabled={loading.addCategory}>
                  {loading.addCategory ? 'Saving...' : 'Add Category'}
               </button>
            </form>
         );
      }

      if (activePanel === 'category-view') {
         return (
            <div className='space-y-4'>
               <button
                  className='btn-primary'
                  onClick={loadCategories}
                  disabled={loading.viewCategories}
               >
                  {loading.viewCategories ? 'Loading...' : 'Load Categories'}
               </button>
               <DataTable rows={rows.categories} />
            </div>
         );
      }

      if (activePanel === 'category-edit')
         return (
            <PlaceholderPanel message='Edit category endpoint is not provided.' />
         );

      if (activePanel === 'shop-owner-add') {
         return (
            <form className='space-y-4' onSubmit={submitShopOwner}>
               <div className='grid gap-4 md:grid-cols-2'>
                  <input
                     className='input'
                     placeholder='Username'
                     value={forms.shopOwner.username}
                     onChange={(e) =>
                        setFormValue('shopOwner', 'username', e.target.value)
                     }
                  />
                  <input
                     className='input'
                     placeholder='Password'
                     type='password'
                     value={forms.shopOwner.password}
                     onChange={(e) =>
                        setFormValue('shopOwner', 'password', e.target.value)
                     }
                  />
                  <input
                     className='input'
                     placeholder='Owner name'
                     value={forms.shopOwner.name}
                     onChange={(e) =>
                        setFormValue('shopOwner', 'name', e.target.value)
                     }
                  />
                  <input
                     className='input'
                     placeholder='Email'
                     value={forms.shopOwner.email}
                     onChange={(e) =>
                        setFormValue('shopOwner', 'email', e.target.value)
                     }
                  />
                  <input
                     className='input'
                     placeholder='Phone'
                     value={forms.shopOwner.phoneNumber}
                     onChange={(e) =>
                        setFormValue('shopOwner', 'phoneNumber', e.target.value)
                     }
                  />
                  <input
                     className='input'
                     placeholder='Shop name'
                     value={forms.shopOwner.shopName}
                     onChange={(e) =>
                        setFormValue('shopOwner', 'shopName', e.target.value)
                     }
                  />
               </div>
               <button className='btn-primary' disabled={loading.shopOwnerAdd}>
                  {loading.shopOwnerAdd ? 'Saving...' : 'Add Shop Owner'}
               </button>
            </form>
         );
      }

      if (activePanel === 'shop-owner-view') {
         return (
            <div className='space-y-4'>
               <button
                  className='btn-primary'
                  onClick={loadShopOwners}
                  disabled={loading.shopOwnerView}
               >
                  {loading.shopOwnerView ? 'Loading...' : 'Load Shop Owners'}
               </button>
               <DataTable rows={rows.shopOwners} />
            </div>
         );
      }

      if (activePanel === 'shop-owner-dashboard-view') {
         return (
            <div className='space-y-4'>
               <button
                  className='btn-primary'
                  onClick={loadShopOwnerDashboardData}
                  disabled={loading.shopOwnerDashboardView}
               >
                  {loading.shopOwnerDashboardView
                     ? 'Loading...'
                     : 'Load Owner Dashboard Data'}
               </button>
               <DataTable rows={rows.shopOwnerDashboard} />
            </div>
         );
      }

      if (activePanel === 'salesman-add') {
         return (
            <form className='space-y-4' onSubmit={submitSalesman}>
               <div className='grid gap-4 md:grid-cols-2'>
                  <input
                     className='input'
                     placeholder='Username'
                     value={forms.salesman.username}
                     onChange={(e) =>
                        setFormValue('salesman', 'username', e.target.value)
                     }
                  />
                  <input
                     className='input'
                     placeholder='Password'
                     type='password'
                     value={forms.salesman.password}
                     onChange={(e) =>
                        setFormValue('salesman', 'password', e.target.value)
                     }
                  />
                  <input
                     className='input'
                     placeholder='Name'
                     value={forms.salesman.name}
                     onChange={(e) =>
                        setFormValue('salesman', 'name', e.target.value)
                     }
                  />
                  <input
                     className='input'
                     placeholder='Email'
                     value={forms.salesman.email}
                     onChange={(e) =>
                        setFormValue('salesman', 'email', e.target.value)
                     }
                  />
                  <input
                     className='input'
                     placeholder='Phone'
                     value={forms.salesman.phoneNumber}
                     onChange={(e) =>
                        setFormValue('salesman', 'phoneNumber', e.target.value)
                     }
                  />
                  <input
                     className='input'
                     placeholder='Aadhar doc id'
                     value={forms.salesman.aadharDocId}
                     onChange={(e) =>
                        setFormValue('salesman', 'aadharDocId', e.target.value)
                     }
                  />
               </div>
               <button className='btn-primary' disabled={loading.salesmanAdd}>
                  {loading.salesmanAdd ? 'Saving...' : 'Add Salesman'}
               </button>
            </form>
         );
      }

      if (activePanel === 'salesman-view') {
         return (
            <div className='space-y-4'>
               <button
                  className='btn-primary'
                  onClick={loadSalesmen}
                  disabled={loading.salesmanView}
               >
                  {loading.salesmanView ? 'Loading...' : 'Load Salesmen'}
               </button>
               <DataTable rows={rows.salesmen} />
            </div>
         );
      }

      if (activePanel === 'user-register') {
         return (
            <form className='space-y-4' onSubmit={submitRegisterUser}>
               <div className='grid gap-4 md:grid-cols-2'>
                  <input
                     className='input'
                     placeholder='Username'
                     value={forms.registerUser.username}
                     onChange={(e) =>
                        setFormValue('registerUser', 'username', e.target.value)
                     }
                  />
                  <input
                     className='input'
                     placeholder='Password'
                     type='password'
                     value={forms.registerUser.password}
                     onChange={(e) =>
                        setFormValue('registerUser', 'password', e.target.value)
                     }
                  />
                  <input
                     className='input'
                     placeholder='Phone'
                     value={forms.registerUser.phoneNumber}
                     onChange={(e) =>
                        setFormValue(
                           'registerUser',
                           'phoneNumber',
                           e.target.value,
                        )
                     }
                  />
                  <input
                     className='input'
                     placeholder='Email'
                     value={forms.registerUser.email}
                     onChange={(e) =>
                        setFormValue('registerUser', 'email', e.target.value)
                     }
                  />
               </div>
               <button className='btn-primary' disabled={loading.registerUser}>
                  {loading.registerUser ? 'Saving...' : 'Register User'}
               </button>
            </form>
         );
      }

      if (activePanel === 'user-login') {
         return (
            <form className='space-y-4' onSubmit={submitLoginUserApi}>
               <div className='grid gap-4 md:grid-cols-2'>
                  <input
                     className='input'
                     placeholder='User name'
                     value={forms.loginUser.userName}
                     onChange={(e) =>
                        setFormValue('loginUser', 'userName', e.target.value)
                     }
                  />
                  <input
                     className='input'
                     placeholder='Password hash'
                     type='password'
                     value={forms.loginUser.passwordHash}
                     onChange={(e) =>
                        setFormValue(
                           'loginUser',
                           'passwordHash',
                           e.target.value,
                        )
                     }
                  />
               </div>
               <button className='btn-primary' disabled={loading.loginUser}>
                  {loading.loginUser ? 'Saving...' : 'Call Login API'}
               </button>
            </form>
         );
      }

      if (activePanel === 'file-upload') {
         return (
            <form className='space-y-4' onSubmit={submitFileUpload}>
               <div className='rounded-2xl border border-slate-200 bg-slate-50 p-4'>
                  <input
                     type='file'
                     onChange={(e) =>
                        setUploadFile(e.target.files?.[0] || null)
                     }
                  />
                  <p className='mt-3 text-sm text-slate-500'>
                     {uploadFile
                        ? `Selected: ${uploadFile.name}`
                        : 'No file selected'}
                  </p>
               </div>
               <button className='btn-primary' disabled={loading.fileUpload}>
                  {loading.fileUpload ? 'Uploading...' : 'Upload File'}
               </button>
            </form>
         );
      }

      if (activePanel === 'delete-image') {
         return (
            <div className='space-y-4'>
               <input
                  className='input max-w-lg'
                  placeholder='publicId'
                  value={forms.deleteImage.publicId}
                  onChange={(e) =>
                     setFormValue('deleteImage', 'publicId', e.target.value)
                  }
               />
               <button
                  className='btn-primary'
                  onClick={deleteImageByPublicId}
                  disabled={loading.deleteImage}
               >
                  {loading.deleteImage ? 'Deleting...' : 'Delete Image'}
               </button>
            </div>
         );
      }

      if (activePanel === 'cart-add') {
         return (
            <form className='space-y-4' onSubmit={submitAddCartItem}>
               <div className='grid gap-4 md:grid-cols-2'>
                  <input
                     className='input'
                     placeholder='Cart id'
                     value={forms.cart.cartId}
                     onChange={(e) =>
                        setFormValue('cart', 'cartId', e.target.value)
                     }
                  />
                  <input
                     className='input'
                     placeholder='Client id'
                     value={forms.cart.clientId}
                     onChange={(e) =>
                        setFormValue('cart', 'clientId', e.target.value)
                     }
                  />
                  <input
                     className='input'
                     placeholder='Variant id'
                     value={forms.cart.variantId}
                     onChange={(e) =>
                        setFormValue('cart', 'variantId', e.target.value)
                     }
                  />
                  <input
                     className='input'
                     placeholder='Quantity'
                     value={forms.cart.quantity}
                     onChange={(e) =>
                        setFormValue('cart', 'quantity', e.target.value)
                     }
                  />
               </div>
               <button className='btn-primary' disabled={loading.cartAdd}>
                  {loading.cartAdd ? 'Saving...' : 'Add Item To Cart'}
               </button>
            </form>
         );
      }

      return null;
   };

   if (!isLoggedIn) {
      return (
         <div className='min-h-screen bg-[radial-gradient(circle_at_top_right,_#1f2937,_#0f172a_55%)] p-4 text-slate-100 md:p-8'>
            <div className='mx-auto mt-20 max-w-md rounded-3xl border border-slate-700/70 bg-slate-900/70 p-8 shadow-2xl backdrop-blur'>
               <div className='mb-8 flex items-center gap-3'>
                  <div className='rounded-2xl bg-cyan-400/90 p-3 text-slate-900'>
                     <FiLogIn className='text-xl' />
                  </div>
                  <div>
                     <h1 className='text-2xl font-bold'>Admin</h1>
                     <p className='text-sm text-slate-400'>
                        Static login screen (API later)
                     </p>
                  </div>
               </div>

               <div className='space-y-4'>
                  <input className='input-dark' placeholder='Username' />
                  <input
                     className='input-dark'
                     placeholder='Password'
                     type='password'
                  />
                  <button
                     className='w-full rounded-xl bg-cyan-400 px-4 py-3 font-semibold text-slate-900 transition hover:bg-cyan-300'
                     onClick={() => dispatch(setLoggedIn(true))}
                  >
                     Continue To Admin
                  </button>
               </div>
            </div>
         </div>
      );
   }

   return (
      <div className='min-h-screen bg-slate-100 p-3 text-slate-800 md:p-5'>
         <div className='mx-auto flex min-h-[calc(100vh-1.5rem)] max-w-[1600px] gap-4 md:gap-5'>
            <SidebarNav
               sections={filteredSidebar}
               openMenus={openMenus}
               activePanel={activePanel}
               onToggleMenu={(id) => dispatch(toggleMenu(id))}
               onSetActive={(id) => dispatch(setActivePanel(id))}
            />

            <main className='flex-1 rounded-3xl bg-white p-4 shadow-xl md:p-6'>
               <div className='mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4'>
                  <div>
                     <p className='text-xs font-semibold uppercase tracking-wider text-cyan-700'>
                        {currentMeta?.description || 'Admin'}
                     </p>
                     <h1 className='text-2xl font-bold text-slate-900'>
                        {currentMeta?.title || 'Admin'}
                     </h1>
                  </div>

                  <TopSearchBar
                     value={searchText}
                     onChange={(value) => dispatch(setSearchText(value))}
                  />

                  <div className='relative flex items-center gap-2'>
                     <NotificationButton />
                     <ProfileMenu
                        open={profileOpen}
                        onToggle={() => dispatch(toggleProfile())}
                        onLogout={() => {
                           dispatch(closeProfile());
                           dispatch(setLoggedIn(false));
                        }}
                     />
                  </div>
               </div>

               {notice.text ? (
                  <div
                     className={`mb-4 rounded-2xl border px-4 py-3 text-sm ${
                        notice.type === 'error'
                           ? 'border-rose-200 bg-rose-50 text-rose-700'
                           : 'border-emerald-200 bg-emerald-50 text-emerald-700'
                     }`}
                  >
                     {notice.text}
                  </div>
               ) : null}

               <div className='mt-4 space-y-4'>{renderPanel()}</div>
            </main>
         </div>
      </div>
   );
};

export default App;
