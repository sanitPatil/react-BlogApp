import React, { useId } from 'react'

const Select = React.forwardRef(function Select({
    options=[],
    label,
    className='',
    ...props
},ref) {
    const id = useId();
  return (
    <div className=''>
        {label && <label
        className='text-xl font-bold p-2 m-2'
        id={id}>{label}</label>}
        <select
        id={id}
        {...props}
        ref={ref}
        className={`${className}`}
        >
            {options?.map((option)=>(
                <option
                key={option}
                value={option}
                >{option}</option>
            ))}
        </select>
    </div>
  )
})

export default Select