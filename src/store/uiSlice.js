import { createSlice } from '@reduxjs/toolkit';

const getDefaultOpenMenus = () => ({
   orders: true,
   products: false,
   colors: false,
   categories: false,
   attributes: false,
   'shop-owner': false,
   salesman: false,
   users: false,
   files: false,
   cart: false,
});

const uiSlice = createSlice({
   name: 'ui',
   initialState: {
      searchText: '',
      profileOpen: false,
      notice: { type: 'idle', text: '' },
      activePanel: 'order-create',
      openMenus: getDefaultOpenMenus(),
   },
   reducers: {
      setSearchText(state, action) {
         state.searchText = action.payload;
      },
      toggleProfile(state) {
         state.profileOpen = !state.profileOpen;
      },
      closeProfile(state) {
         state.profileOpen = false;
      },
      setNotice(state, action) {
         state.notice = action.payload;
      },
      clearNotice(state) {
         state.notice = { type: 'idle', text: '' };
      },
      setActivePanel(state, action) {
         state.activePanel = action.payload;
      },
      toggleMenu(state, action) {
         const menuId = action.payload;
         state.openMenus[menuId] = !state.openMenus[menuId];
      },
      resetSidebar(state) {
         state.openMenus = getDefaultOpenMenus();
      },
   },
});

export const {
   setSearchText,
   toggleProfile,
   closeProfile,
   setNotice,
   clearNotice,
   setActivePanel,
   toggleMenu,
   resetSidebar,
} = uiSlice.actions;

export default uiSlice.reducer;
