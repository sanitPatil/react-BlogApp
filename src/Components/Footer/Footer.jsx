import React from 'react'
import Container from '../container/Container'

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
    <Container>
        
        <div className=''>
           <ul className='flex justify-between mt-10 mb-10'>
           {FooterItem && 
            FooterItem.map((item)=>(
                <li key={item.name}
                className=''
                >
                    <button>
                        {item.name}
                    </button>
                </li>
            ))
            }
           </ul>
        </div>
    
    </Container>
  )
}

export default Footer