import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Founders from './components/Founders'
import Gallery from './components/Gallery'
import './App.css'

function App() {
  useEffect(() => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(this: HTMLAnchorElement, e: Event) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute('href') || '')
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
        }
      })
    })
  }, [])

  return (
    <div className="bg-black text-[#FEFEFE]">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Founders />
        <Gallery />
      </main>
      <footer className="bg-black py-8 border-t border-[#FEFEFE]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#FEFEFE]/70">
            © {new Date().getFullYear()} The Commoners Kitchen. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
