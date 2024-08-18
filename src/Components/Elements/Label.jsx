import React from 'react'

function Label({
  className,
    children,
    ...props
}) {
  return (
    <div>
        <label
        className={`${className} p-2 w-full `}
        {...props}
        >{children}</label>
    </div>
  )
}

export default Label