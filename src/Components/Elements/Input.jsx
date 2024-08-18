import React, { useId } from 'react'

const Input = React.forwardRef(function Input({
    label,
    type='text',
    clasName='',
    ...props
},ref){
    const id = useId();
    return(
        <div className=''>
            {label && <label className='block text-gray-700' htmlFor={id}>{label}</label>}
            <input type={type} 
            className={`${clasName} w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600`}
            {...props}
            autof
            id={id}
            ref={ref}
            />
        </div>
    )
})
export default Input