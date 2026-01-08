import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Footer from './components/Footer'
import Headers from './components/Header.jsx'
import Orchid from "./components/Orchid";


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
          day la bai hoc slot3 ex1 ve React
        </p>
        <Orchid
          id="1"
          orchidName="Ceasar 4N"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta lobortis ex. Morbi cursus consectetur diam, non lobortis massa gravida eu. Duis molestie purus vel ligula suscipit, sit amet iaculis justo tempus. Cras pellentesque urna in feugiat fringilla. Vivamus dictum lacinia nulla, id rhoncus lectus fermentum et. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta lobortis ex. or sit amet, consectetur adipiscing elit. Nulla porta lobortis ex. or sit amet, consectetur adipiscing elit."
          category="Dendrobium"
          isSpecial={true}
          price={250000}
          image="images/hoalan1.jpeg"
        />

      </main>

      <Footer
  avatar="https://i.pravatar.cc/150"
  name="Luyt Phan"
  email="luytphan@gmail.com"
/>
    </>
  )
}

export default App

