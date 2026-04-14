import React, { useMemo, useState } from 'react';

const menuItems = [
   { id: 'create-sale', label: 'Create New Sale' },
   { id: 'create-shop-owner', label: 'Create New Shop Owner' },
   { id: 'pending-order', label: 'Pending Order' },
   { id: 'send-notification', label: 'Send Notification' },
   { id: 'inventary-management', label: 'Inventary Management' },
];

const contentBySection = {
   'create-sale': {
      title: 'Create New Sale',
      description:
         'Start a fresh sales record and define customer, product, and billing details.',
   },
   'create-shop-owner': {
      title: 'Create New Shop Owner',
      description:
         'Register a new shop owner profile with store information and contact details.',
   },
   'pending-order': {
      title: 'Pending Order',
      description:
         'Review unprocessed orders and take actions such as approve, edit, or cancel.',
   },
   'send-notification': {
      title: 'Send Notification',
      description:
         'Broadcast announcements, updates, and reminders to selected users or all users.',
   },
   'inventary-management': {
      title: 'Inventary Management',
      description:
         'Track stock movement, low-stock alerts, and product availability in real time.',
   },
};

const App = () => {
   const [activeSection, setActiveSection] = useState(menuItems[0].id);

   const activeContent = useMemo(() => {
      return contentBySection[activeSection];
   }, [activeSection]);

   const renderSectionFields = () => {
      if (activeSection === 'create-sale') {
         return (
            <form className='admin-form'>
               <div className='form-grid'>
                  <label className='form-field'>
                     Sale ID
                     <input type='text' placeholder='SAL-1001' />
                  </label>
                  <label className='form-field'>
                     Customer Name
                     <input type='text' placeholder='Enter customer name' />
                  </label>
                  <label className='form-field'>
                     Product
                     <input type='text' placeholder='Product name' />
                  </label>
                  <label className='form-field'>
                     Quantity
                     <input type='number' min='1' placeholder='1' />
                  </label>
                  <label className='form-field'>
                     Unit Price
                     <input type='number' min='0' placeholder='0' />
                  </label>
                  <label className='form-field'>
                     Payment Method
                     <select defaultValue=''>
                        <option value='' disabled>
                           Select method
                        </option>
                        <option>Cash</option>
                        <option>Card</option>
                        <option>UPI</option>
                        <option>Bank Transfer</option>
                     </select>
                  </label>
               </div>
               <button type='button' className='primary-btn'>
                  Save Sale
               </button>
            </form>
         );
      }

      if (activeSection === 'create-shop-owner') {
         return (
            <form className='admin-form'>
               <div className='form-grid'>
                  <label className='form-field'>
                     Owner Name
                     <input type='text' placeholder='Full name' />
                  </label>
                  <label className='form-field'>
                     Shop Name
                     <input type='text' placeholder='Shop title' />
                  </label>
                  <label className='form-field'>
                     Phone Number
                     <input type='tel' placeholder='+91 xxxxxxxxxx' />
                  </label>
                  <label className='form-field'>
                     Email
                     <input type='email' placeholder='owner@email.com' />
                  </label>
                  <label className='form-field'>
                     City
                     <input type='text' placeholder='Enter city' />
                  </label>
                  <label className='form-field'>
                     Shop Type
                     <select defaultValue=''>
                        <option value='' disabled>
                           Select shop type
                        </option>
                        <option>Grocery</option>
                        <option>Electronics</option>
                        <option>Fashion</option>
                        <option>Medical</option>
                     </select>
                  </label>
               </div>
               <label className='form-field'>
                  Shop Address
                  <textarea rows='3' placeholder='Enter full address' />
               </label>
               <button type='button' className='primary-btn'>
                  Create Owner
               </button>
            </form>
         );
      }

      if (activeSection === 'pending-order') {
         return (
            <form className='admin-form'>
               <div className='form-grid'>
                  <label className='form-field'>
                     Order ID
                     <input type='text' placeholder='ORD-2045' />
                  </label>
                  <label className='form-field'>
                     Customer
                     <input type='text' placeholder='Customer name' />
                  </label>
                  <label className='form-field'>
                     Order Date
                     <input type='date' />
                  </label>
                  <label className='form-field'>
                     Delivery Date
                     <input type='date' />
                  </label>
                  <label className='form-field'>
                     Priority
                     <select defaultValue=''>
                        <option value='' disabled>
                           Select priority
                        </option>
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                     </select>
                  </label>
                  <label className='form-field'>
                     Status
                     <select defaultValue='Pending'>
                        <option>Pending</option>
                        <option>Packed</option>
                        <option>Shipped</option>
                     </select>
                  </label>
               </div>
               <label className='form-field'>
                  Order Notes
                  <textarea
                     rows='3'
                     placeholder='Special instruction or remarks'
                  />
               </label>
               <button type='button' className='primary-btn'>
                  Update Order
               </button>
            </form>
         );
      }

      if (activeSection === 'send-notification') {
         return (
            <form className='admin-form'>
               <div className='form-grid'>
                  <label className='form-field'>
                     Notification Type
                     <select defaultValue=''>
                        <option value='' disabled>
                           Select type
                        </option>
                        <option>General Update</option>
                        <option>Promotion</option>
                        <option>Alert</option>
                        <option>Reminder</option>
                     </select>
                  </label>
                  <label className='form-field'>
                     Audience
                     <select defaultValue=''>
                        <option value='' disabled>
                           Select audience
                        </option>
                        <option>All Users</option>
                        <option>Shop Owners</option>
                        <option>Customers</option>
                     </select>
                  </label>
                  <label className='form-field'>
                     Schedule Date
                     <input type='date' />
                  </label>
                  <label className='form-field'>
                     Schedule Time
                     <input type='time' />
                  </label>
               </div>
               <label className='form-field'>
                  Title
                  <input type='text' placeholder='Notification title' />
               </label>
               <label className='form-field'>
                  Message
                  <textarea
                     rows='4'
                     placeholder='Write your notification message...'
                  />
               </label>
               <button type='button' className='primary-btn'>
                  Send Notification
               </button>
            </form>
         );
      }

      return (
         <form className='admin-form'>
            <div className='form-grid'>
               <label className='form-field'>
                  Product Name
                  <input type='text' placeholder='Product name' />
               </label>
               <label className='form-field'>
                  SKU
                  <input type='text' placeholder='SKU-001' />
               </label>
               <label className='form-field'>
                  Category
                  <input type='text' placeholder='Category' />
               </label>
               <label className='form-field'>
                  Current Stock
                  <input type='number' min='0' placeholder='0' />
               </label>
               <label className='form-field'>
                  Reorder Level
                  <input type='number' min='0' placeholder='10' />
               </label>
               <label className='form-field'>
                  Supplier Name
                  <input type='text' placeholder='Supplier' />
               </label>
            </div>
            <label className='form-field'>
               Warehouse Location
               <input type='text' placeholder='Aisle / Rack details' />
            </label>
            <button type='button' className='primary-btn'>
               Save Inventory
            </button>
         </form>
      );
   };

   return (
      <div className='admin-page'>
         <aside className='admin-sidebar' aria-label='Admin Navigation'>
            <h1 className='admin-brand'>Admin Panel</h1>

            <nav className='admin-nav'>
               {menuItems.map((item) => {
                  const isActive = item.id === activeSection;

                  return (
                     <button
                        key={item.id}
                        type='button'
                        className={`admin-nav-item ${isActive ? 'is-active' : ''}`}
                        onClick={() => setActiveSection(item.id)}
                     >
                        {item.label}
                     </button>
                  );
               })}
            </nav>
         </aside>

         <main className='admin-content' aria-live='polite'>
            <div className='content-card'>
               <p className='content-label'>Section</p>
               <h2>{activeContent.title}</h2>
               <p>{activeContent.description}</p>
               {renderSectionFields()}
            </div>
         </main>
      </div>
   );
};

export default App;
