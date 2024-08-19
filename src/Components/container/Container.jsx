import React from 'react'

function Container({children}) {
  return (
    <div className='p-6 w-full dark:bg-slate-900 dark:text-slate-50 '>
        {children}
    </div>
  )
}

export default Container