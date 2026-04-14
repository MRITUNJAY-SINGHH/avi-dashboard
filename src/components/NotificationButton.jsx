import React from 'react';
import { FiBell } from 'react-icons/fi';

const NotificationButton = () => {
   return (
      <button className='cursor-pointer rounded-xl border border-slate-200 p-2 text-slate-600'>
         <FiBell />
      </button>
   );
};

export default NotificationButton;
