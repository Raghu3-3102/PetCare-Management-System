import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PetsPage from './pages/PetsPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
       <PetsPage />
    </div>
  )
}

export default App
