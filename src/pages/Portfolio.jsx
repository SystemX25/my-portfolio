import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import HomeSection from '../components/sections/Home';
import AboutSection from '../components/sections/About';
import SkillsSection from '../components/sections/Skills';
import ProjectsSection from '../components/sections/Projects';
import CertificationsSection from '../components/sections/Certifications';
import ContactSection from '../components/sections/Contact';

const Portfolio = ({ setActiveSection }, ref) => {
    return (
        <div className="min-h-screen font-space dark:bg-dark-background bg-light-background transition-colors duration-300">
            <HomeSection id="home" setActiveSection={setActiveSection} />
            <AboutSection id="about" setActiveSection={setActiveSection} />
            <SkillsSection id="skills" setActiveSection={setActiveSection} />
            <ProjectsSection id="projects" setActiveSection={setActiveSection} />
            <CertificationsSection id="certifications" setActiveSection={setActiveSection} />
            <ContactSection id="contact" setActiveSection={setActiveSection} />
        </div>
    )
}

export default forwardRef(Portfolio);