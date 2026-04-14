import React from 'react';
import { FiSearch } from 'react-icons/fi';

const TopSearchBar = ({ value, onChange }) => {
   return (
      <div className='relative mx-auto w-full max-w-md flex-1 px-0 md:px-6'>
         <FiSearch className='pointer-events-none absolute left-3 top-3 text-slate-400 md:left-9' />
         <input
            className='w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-cyan-400'
            placeholder='Search menu...'
            value={value}
            onChange={(event) => onChange(event.target.value)}
         />
      </div>
   );
};

export default TopSearchBar;
