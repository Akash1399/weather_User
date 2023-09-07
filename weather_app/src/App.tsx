import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import WeatherDisplay from './components/WeatherDisplay'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <WeatherDisplay/>
    </>
  )
}

export default App
