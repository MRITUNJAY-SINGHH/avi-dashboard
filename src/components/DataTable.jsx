import React from 'react';

const DataTable = ({ rows }) => {
   if (!rows.length) {
      return (
         <div className='rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500'>
            No data loaded.
         </div>
      );
   }

   const keys = Object.keys(rows[0] || {}).slice(0, 6);

   return (
      <div className='overflow-x-auto rounded-2xl border border-slate-200 bg-white'>
         <table className='min-w-full text-sm'>
            <thead className='bg-slate-50 text-left text-slate-600'>
               <tr>
                  {keys.map((key) => (
                     <th
                        key={key}
                        className='px-4 py-3 font-semibold capitalize'
                     >
                        {key}
                     </th>
                  ))}
               </tr>
            </thead>
            <tbody>
               {rows.slice(0, 12).map((row, idx) => (
                  <tr key={idx} className='border-t border-slate-100'>
                     {keys.map((key) => (
                        <td key={key} className='px-4 py-3 text-slate-700'>
                           {typeof row[key] === 'object'
                              ? JSON.stringify(row[key])
                              : String(row[key] ?? '-')}
                        </td>
                     ))}
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
};

export default DataTable;
