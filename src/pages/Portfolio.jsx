import { forwardRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HomeSection from '../components/sections/Home';
import AboutSection from '../components/sections/About';
import SkillsSection from '../components/sections/Skills';
import ProjectsSection from '../components/sections/Projects';
import CertificationsSection from '../components/sections/Certifications';
import ContactSection from '../components/sections/Contact';

const Portfolio = ({ setActiveSection }, ref) => {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            window.history.replaceState(null, null, ' ');
        }
        
        setActiveSection('home');
        
        if (location.hash) {
            const target = document.querySelector(location.hash);
            if (target) {
                setTimeout(() => {
                    target.scrollIntoView({ behavior: 'smooth' });
                    setActiveSection(location.hash.substring(1));
                }, 200);
            }
        }
    }, [location.hash, setActiveSection]);

    return (
        <div className="min-h-screen font-space dark:bg-dark-background bg-light-background transition-colors duration-300">
            <HomeSection id="home" setActiveSection={setActiveSection} ref={ref} />
            <AboutSection id="about" setActiveSection={setActiveSection} />
            <SkillsSection id="skills" setActiveSection={setActiveSection} />
            <ProjectsSection id="projects" setActiveSection={setActiveSection} />
            <CertificationsSection id="certifications" setActiveSection={setActiveSection} />
            <ContactSection id="contact" setActiveSection={setActiveSection} />
        </div>
    )
}

export default forwardRef(Portfolio);