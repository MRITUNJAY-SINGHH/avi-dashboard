import React from 'react';
import { FiChevronDown, FiLogOut, FiSettings, FiUser } from 'react-icons/fi';

const ProfileMenu = ({ open, onToggle, onLogout }) => {
   return (
      <div className='relative'>
         <button
            className='flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700'
            onClick={onToggle}
         >
            <span className='flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500 text-xs font-bold text-white'>
               AD
            </span>
            Profile
            <FiChevronDown className='text-slate-500' />
         </button>

         {open ? (
            <div className='absolute right-0 top-12 z-20 w-52 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl'>
               <button className='flex w-full cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100'>
                  <FiUser />
                  My Profile
               </button>
               <button className='flex w-full cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100'>
                  <FiSettings />
                  Account Settings
               </button>
               <button
                  className='flex w-full cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-rose-600 hover:bg-rose-50'
                  onClick={onLogout}
               >
                  <FiLogOut />
                  Logout
               </button>
            </div>
         ) : null}
      </div>
   );
};

export default ProfileMenu;
