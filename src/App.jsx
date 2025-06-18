import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import HomeSection from './components/sections/Home';
import AboutSection from './components/sections/About.jsx';
import SkillsSection from './components/sections/Skills.jsx';
import ProjectsSection from './components/sections/Projects.jsx';
import CertificationsSection from './components/sections/Certifications.jsx';
import ContactSection from './components/sections/Contact.jsx';
import Starfield from "./components/Starfield";


function App() {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-transparent">
      <Starfield />
        <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
        <main> 
          <HomeSection id="home" setActiveSection={setActiveSection} />
          <AboutSection id="about" setActiveSection={setActiveSection} />
          <SkillsSection id="skills" setActiveSection={setActiveSection} />
          <ProjectsSection id="projects" setActiveSection={setActiveSection} />
          <CertificationsSection id="certifications" setActiveSection={setActiveSection} />
          <ContactSection id="contact" setActiveSection={setActiveSection} />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;