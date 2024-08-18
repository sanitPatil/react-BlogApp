import React, { useId } from 'react'

const Input = React.forwardRef(function Input({
    label,
    type='text',
    clasName='',
    ...props
},ref){
    const id = useId();
    return(
        <div className=' mb-2'>
            {label && <label className='block text-black  text-xl font-semibold' htmlFor={id}>{label}</label>}
            <input type={type} 
            className={`${clasName} w-full p-4  border-b-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600`}
            {...props}
            autof   
            id={id}
            ref={ref}
            />
        </div>
    )
})
export default Input