import { useState } from 'react'
import { Button } from './components/ui/button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <p className='text-red-500'>demo</p>
      <Button>abc</Button>
    </>
  )
}

export default App
