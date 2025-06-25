import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Portfolio from './pages/Portfolio';
import Starfield from "./components/Starfield";
import ProjectDetails from './components/projects/ProjectDetails';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <Router>
      <ThemeProvider>
        <div className="relative min-h-screen bg-transparent">
          <Starfield />
          <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
          <main>
            <Routes>
              <Route path="/projects/:id" element={<ProjectDetails />} />
              <Route path="/" element={<Portfolio setActiveSection={setActiveSection} />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;