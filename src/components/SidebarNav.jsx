import React from 'react';
import { FiChevronDown, FiChevronRight, FiLayers } from 'react-icons/fi';

const SidebarNav = ({
   sections,
   openMenus,
   activePanel,
   onToggleMenu,
   onSetActive,
}) => {
   return (
      <aside className='w-80 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-800 p-4 text-slate-100 shadow-2xl'>
         <div className='mb-4 flex items-center gap-3 border-b border-slate-800 pb-4'>
            <div className='rounded-xl bg-cyan-400 p-2 text-slate-900'>
               <FiLayers className='text-xl' />
            </div>
            <div>
               <h2 className='text-xl font-bold'>Admin</h2>
               <p className='text-xs text-slate-400'>
                  Professional control panel
               </p>
            </div>
         </div>

         <div className='space-y-2 overflow-y-auto pr-1'>
            {sections.map((section) => {
               const SectionIcon = section.icon;
               const expanded = openMenus[section.id];

               return (
                  <div
                     key={section.id}
                     className='rounded-2xl bg-slate-800/60 p-2'
                  >
                     <button
                        className='flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-left transition hover:bg-slate-700/60'
                        onClick={() => onToggleMenu(section.id)}
                     >
                        <span className='flex items-center gap-2 text-sm font-medium'>
                           <SectionIcon className='text-cyan-300' />
                           {section.label}
                        </span>
                        {expanded ? <FiChevronDown /> : <FiChevronRight />}
                     </button>

                     {expanded ? (
                        <div className='mt-1 space-y-1 pl-2'>
                           {section.children.map((child) => {
                              const ChildIcon = child.icon;
                              const active = activePanel === child.id;

                              return (
                                 <button
                                    key={child.id}
                                    className={`flex w-full cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-sm transition ${
                                       active
                                          ? 'bg-cyan-400 text-slate-900'
                                          : 'text-slate-300 hover:bg-slate-700/70'
                                    }`}
                                    onClick={() => onSetActive(child.id)}
                                 >
                                    <ChildIcon />
                                    {child.label}
                                 </button>
                              );
                           })}
                        </div>
                     ) : null}
                  </div>
               );
            })}
         </div>
      </aside>
   );
};

export default SidebarNav;
