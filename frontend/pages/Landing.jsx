import { Link } from "react-router-dom";
import Footer from '../lib/Footer.jsx'
import Navbar from '../lib/Navbar.jsx'

const Landing = () => {
  return (
    <div className="flex flex-col min-h-screen bg-base-100 text-base-content font-sans">
      <Navbar />
      <main className="grow flex flex-col">
        <div className="hero bg-base-200 grow py-16 lg:py-32">
          <div className="hero-content flex-col lg:flex-row-reverse gap-12 lg:gap-24 w-full max-w-7xl">
            <div className="flex-1 w-full max-w-2xl transform hover:-translate-y-2 transition-transform duration-300">
              <div className="mockup-window bg-base-300 border border-base-300 shadow-2xl">
                <div className="flex flex-col justify-center px-6 py-8 bg-base-200 font-mono text-sm sm:text-base">
                  <p className="text-success">$ git checkout -b feature/aurora</p>
                  <p className="text-base-content/60">{">"} Switched to a new branch 'feature/aurora'</p>
                  <p className="text-success mt-2">$ aurora visualize</p>
                  <p className="text-info animate-pulse">{">"} Loading Git flow... 🚀</p>
                </div>
              </div>
            </div>
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight">
                Aurora
              </h1>
              <p className="py-6 text-lg lg:text-xl text-base-content/80 max-w-xl mx-auto lg:mx-0">
                Visualizing your <span className="text-primary font-bold">GIT flow</span> making it easier to understand and collaborate.
              </p>              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-4">
              <Link to={"/contact"}>
                <button className="btn btn-primary btn-lg shadow-lg shadow-primary/30">
                  Get Started
                </button>
              </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Landing;