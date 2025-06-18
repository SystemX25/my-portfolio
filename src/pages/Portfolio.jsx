import { useRef } from 'react';
import { motion } from 'framer-motion';
import HomeSection from '../components/sections/Home';
import AboutSection from '../components/sections/About';
import SkillsSection from '../components/sections/Skills';
import ProjectsSection from '../components/sections/Projects';
import CertificationsSection from '../components/sections/Certifications';
import ContactSection from '../components/sections/Contact';

const Portfolio = () => {
    const homeRef = useRef(null);
    const aboutRef = useRef(null);
    const skillsRef = useRef(null);
    const projectsRef = useRef(null);
    const certificationsRef = useRef(null);
    const contactRef = useRef(null);

    return (
        <div className="min-h-screen font-space dark:bg-dark-background bg-light-background transition-colors duration-300">
            <HomeSection ref={homeRef} />
            <AboutSection ref={aboutRef} />
            <SkillsSection ref={skillsRef} />
            <ProjectsSection ref={projectsRef} />
            <CertificationsSection ref={certificationsRef} />
            <ContactSection ref={contactRef} />
        </div>
    )
}

export default Portfolio;