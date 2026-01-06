import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Footer from './components/Footer'
import Headers from './components/header.jsx'

function App() {
  return (
    <>
      <Headers />

      {/* MAIN CONTENT */}
      <main className="text-center py-16">
        <h1 className="text-4xl font-bold mb-4">
          Hello Vite + React!
        </h1>
        <p className="text-gray-600">
          day la bai hoc ex2 ve Vite
        </p>
      </main>

      <Footer />
    </>
  )
}

export default App

