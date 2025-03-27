import { useState } from 'react'
import LoadingScreen from './components/LoadingScreen'
import Game from './components/Game'
import './App.css'

function App() {
  const [isLoaded, setIsLoading] = useState(false)

  return (
    <>
      <Game className=" w-full h-full"/>
    </>
  )
}

export default App
