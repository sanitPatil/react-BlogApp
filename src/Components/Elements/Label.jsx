import React from 'react'

function Label({
  className,
    children,
    ...props
}) {
  return (
    <div>
        <label
        className={`${className} p-2 w-full dark:bg-slate-900 dark:text-slate-50 `}
        {...props}
        >{children}</label>
    </div>
  )
}

export default Label