import React from 'react'

function Footer() {
    const FooterItem = [
        {
            name:"© copyright",
            src:null,
            
        },
        {
            name:"Twitter",
            src:null,
            
        },
        {
            name:"Instagram",
            src:null,
            
        },
        {
            name:"Facebook",
            src:null,
            
        },
        {
            name:"Email",
            src:null,
            
        },
        {
            name:"Contact-us",
            src:null,
            
        }
    ]
  return (
    <div className='w-full h-[10vh] '>
        <div className='flex flex-wrap justify-between'>
            {FooterItem && 
            FooterItem.map((item)=>(
                <li key={item.name}>
                    <button>
                        {item.name}
                    </button>
                </li>
            ))
            }
        </div>
    </div>
  )
}

export default Footer