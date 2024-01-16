import { useState } from 'react'
import './App.css'
import HeaderSection from './components/HeaderSection'
import DetailSection from './components/DetailSection'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <HeaderSection/>
      <DetailSection/>
    </>
  )
}

export default App
