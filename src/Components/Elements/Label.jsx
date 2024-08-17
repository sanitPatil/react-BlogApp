import React from 'react'

function Label({
    children,
    ...props
}) {
  return (
    <div>
        <label
        {...props}
        >{children}</label>
    </div>
  )
}

export default Label