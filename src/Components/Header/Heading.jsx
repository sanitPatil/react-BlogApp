import React from 'react'
import Container from "./../container/Container"
function Heading() {
  return (
    <Container >
        <div className='w-full h-[20%] '>
            <h1 className='text-9xl dark:bg-slate-900 dark:text-slate-50 text-gray-900  border-y-2 border-black/40 p-2  text-center font-extrabold shadow-xl'>
            THE BLOG
            </h1>
        </div>
    </Container>
  )
}

export default Heading