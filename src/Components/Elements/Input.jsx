import React, { useId } from 'react'

const Input = React.forwardRef(function Input({
    label,
    type='text',
    clasName='',
    ...props
},ref){
    const id = useId();
    return(
        <div>
            {label && <label className='' htmlFor={id}>{label}</label>}
            <input type={type} 
            className={`${clasName}`}
            {...props}
            id={id}
            ref={ref}
            />
        </div>
    )
})
export default Input