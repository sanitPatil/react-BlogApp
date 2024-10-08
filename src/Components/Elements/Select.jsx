import React, { useId } from 'react'

const Select = React.forwardRef(function Select({
    options=[],
    label,
    className='',
    ...props
},ref) {
    const id = useId();
  return (
    <div className=' dark:text-slate-50 '>
        {label && <label
        className='text-xl font-bold p-2 m-2'
        id={id}>{label}</label>}
        <select
        id={id}
        {...props}
        ref={ref}
        className={`${className} dark:bg-black rounded`}
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