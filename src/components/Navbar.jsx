import { useTranslation } from 'react-i18next';
import { useContext, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import EclipseTransition from './EclipseTransition';

const Navbar = ({ activeSection, setActiveSection }) => {
  const { t, i18n } = useTranslation();
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showEclipse, setShowEclipse] = useState(false);

  const changeLanguage = (lng) => i18n.changeLanguage(lng);

  const handleThemeToggle = () => {
    setShowEclipse(true);
    toggleTheme(); 

    setTimeout(() => setShowEclipse(false), 1500);
  };

  const navLinks = [
    { id: 'home', label: t('Home') },
    { id: 'about', label: t('About') },
    { id: 'skills', label: t('Skills') },
    { id: 'projects', label: t('Projects') },
    { id: 'certifications', label: t('Certifications') },
    { id: 'contact', label: t('Contact') }
  ];

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    setMenuOpen(false);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-dark-cards dark:bg-light-cards shadow-md">
      <div className="max-w-screen-xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Selector de idioma */}
          <div className="flex items-center">
            <select
              onChange={(e) => changeLanguage(e.target.value)}
              value={i18n.language}
              className="bg-transparent border-none text-dark-purple dark:text-light-purple font-medium text-lg focus:outline-none focus:ring-0 cursor-pointer"
            >
              <option value="es">ES</option>
              <option value="en">EN</option>
            </select>
          </div>

          {/* Nombre/Título - Centrado */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="absolute left-1/2 transform -translate-x-1/2"
          >
            <h1 className="text-2xl font-bold text-dark-purple dark:text-light-purple whitespace-nowrap">
              Oliver Preciado
            </h1>
          </motion.div>

          {/* Controles derecha */}
          <div className="flex items-center space-x-4">
            {/* Botón de tema */}
            <button
              onClick={handleThemeToggle}
              aria-label={darkMode ? 'Modo claro' : 'Modo oscuro'}
              className="p-1 text-xl text-dark-purple dark:text-light-purple hover:opacity-80 transition-opacity"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            <EclipseTransition isVisible={showEclipse} />

            {/* Botón del menú */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1 text-xl text-dark-purple dark:text-light-purple hover:opacity-80 transition-opacity"
              aria-expanded={menuOpen}
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Menú desplegable */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-4 bg-dark-cards dark:bg-light-cards rounded-lg overflow-hidden"
            >
              <div className="py-2 space-y-1">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`block w-full text-left px-4 py-3 text-lg ${activeSection === link.id
                      ? 'bg-dark-purple dark:bg-light-purple text-white dark:text-dark-text font-semibold'
                      : 'text-dark-text dark:text-light-text hover:bg-opacity-10 hover:bg-dark-purple dark:hover:bg-light-purple'
                      }`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;