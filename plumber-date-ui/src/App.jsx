import { useState } from 'react'
import Calculator from './Calculator'
import Converter from './Converter'
function App() {

  return (
    <main className="grid grid-cols-1 gap-10 w-full px-10 lg:px-40 mt-20 lg:mt-40">
      <Calculator/>
      <Converter/>
    </main>
  )
}

export default App
