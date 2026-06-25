import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Navbar from './Components/Navbar'
import './App.css'
import Manager from './Components/Manager'

function App() {
  const [bgColor, setBgColor] = useState("#F4F4F9")

  return (
    <>
    <Navbar setBgColor={setBgColor}/>
    <Manager bgColor={bgColor}/>
    </>
  )
}

export default App
