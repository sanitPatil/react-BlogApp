import React from 'react'
import {AddPost as AddPostComponents} from '../Components/servicePages/index'
import Container from '../Components/container/Container'
function AddPost() {
  return (
    <div className='dark:bg-slate-900 dark:text-slate-50'>
      <Container>
      <AddPostComponents />
      </Container>
    </div>
  )
}

export default AddPost