import React from 'react'

function Button({
    children,
    type='button',
    bgColor='bg-blue-600',
    className='',
    textColor='text-white',
    props

}) {
  return (
    <button className={`${className} ${textColor} ${bgColor}`} type={type} {...props}>
        {children}
    </button>
  )
}

export default Button