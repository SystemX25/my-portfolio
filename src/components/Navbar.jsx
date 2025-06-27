import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import EclipseTransition from './EclipseTransition';
import clsx from 'clsx';
import { useDestruction } from '../context/DestructionContext';

const glitchColors = ['text-purple-500', 'text-blue-500', 'text-red-500'];
const glitchDelays = [0, 0.1, 0.2];

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const [showEclipse, setShowEclipse] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [nameAlt, setNameAlt] = useState(false);
  const { isDestroying, showBlackHole } = useDestruction();

  useEffect(() => {
    const interval = setInterval(() => setNameAlt((prev) => !prev), 3000);
    return () => clearInterval(interval);
  }, []);

  const handleThemeToggle = () => {
    setShowEclipse(true);
    toggleTheme();
    setTimeout(() => setShowEclipse(false), 1500);
  };

  const changeLanguage = (lng) => i18n.changeLanguage(lng);

  const nameToShow = hovered ? 'SystemX25' : 'Oliver Preciado';

  if (isDestroying || showBlackHole) {
    return <></>;
  }

  return (
    <header className="fixed w-full top-0 left-0 z-50 bg-[#0f0f1a]/80 backdrop-blur-lg shadow-md">
      <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between font-['Orbitron']">

        <div className="flex items-center gap-4">
          <select
            onChange={(e) => changeLanguage(e.target.value)}
            value={i18n.language}
            className="bg-transparent text-purple-400 border border-purple-600 px-3 py-1 rounded-md text-sm appearance-none cursor-pointer hover:glow-outline focus:outline-none"
          >
            <option className="bg-[#1f2937] text-white" value="es">🌎 ES</option>
            <option className="bg-[#1f2937] text-white" value="en">🪐 EN</option>
          </select>
        </div>

        <motion.div
          className="relative select-none"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => setHovered(!hovered)}
          whileTap={{ scale: 0.97 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.h1
              key={i}
              className={clsx(
                'absolute top-0 left-0 text-2xl font-extrabold mix-blend-screen pointer-events-none',
                glitchColors[i],
                nameAlt && `animate-glitch-${i}`
              )}
              style={{ zIndex: -1, opacity: 0.7 }}
              initial={{ x: -1 * (i + 1), y: i + 1 }}
              animate={{ x: 0, y: 0 }}
              transition={{ delay: glitchDelays[i] }}
            >
              {nameToShow}
            </motion.h1>
          ))}
          <h1 className="relative text-2xl font-extrabold text-white glow-text">
            {nameToShow}
          </h1>
        </motion.div>

        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={handleThemeToggle}
            className="text-purple-400 hover:text-purple-300 transition-all text-xl"
            aria-label={darkMode ? 'Modo claro' : 'Modo oscuro'}
          >
            {darkMode ? '☀️' : '🌙'}
          </motion.button>
          <EclipseTransition isVisible={showEclipse} isDarkMode={darkMode} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;