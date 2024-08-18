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
        <div className=' '>
        <div className=''>
           <ul className='flex justify-between  p-12 mr-4 ml-4 mt-28 mb-1 '>
           {FooterItem && 
            FooterItem.map((item)=>(
                <li key={item.name}
                className=' font-bold border-b-2 hover:border-b-4'
                >
                    <button>
                        {item.name}
                    </button>
                </li>
            ))
            }
           </ul>
        </div>
    </div>
    </Container>
  )
}

export default Footer