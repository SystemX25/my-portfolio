import { forwardRef, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import HomeSection from '../components/sections/Home';
import AboutSection from '../components/sections/About';
import SkillsSection from '../components/sections/Skills';
import ProjectsSection from '../components/sections/Projects';
import ContactSection from '../components/sections/Contact';
import DestroyScene from '../components/Destruction/DestroyScene';
import BlackHoleScene from '../components/Destruction/BlackHoleScene';
import { useTheme } from '../context/ThemeContext';
import { useDestruction } from '../context/DestructionContext';

const Portfolio = ({ setActiveSection }, ref) => {
  const { t } = useTranslation();
  const location = useLocation();
  const { darkMode } = useTheme();

  const {
    isDestroying,
    setIsDestroying,
    showBlackHole,
    setShowBlackHole,
  } = useDestruction();

  const [showWarning, setShowWarning] = useState(false);
  const warningRef = useRef(null);
  const [destructionPhase, setDestructionPhase] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (warningRef.current && !warningRef.current.contains(event.target)) {
        setShowWarning(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  useEffect(() => {
    if (destructionPhase === 1) {
      document.body.classList.add('overflow-hidden');
      if (containerRef.current) {
        containerRef.current.classList.add('earthquake-effect');
      }
      const timer = setTimeout(() => setDestructionPhase(2), 3000);
      return () => clearTimeout(timer);
    }

    if (destructionPhase === 2 && containerRef.current) {
      const children = containerRef.current.querySelectorAll(
        'section, div:not(.warning-container)'
      );

      children.forEach((el, i) => {
        el.style.transformOrigin = `${Math.random() * 100}% ${Math.random() * 100}%`;
        setTimeout(() => {
          const rotation = Math.random() * 60 - 30;
          const distance = 200 + Math.random() * 300;
          const delay = i * 150 + Math.random() * 200;

          el.style.transition = `
            transform ${1 + Math.random() * 2}s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms,
            opacity ${0.5 + Math.random() * 1}s ease-in ${delay}ms,
            filter 0.5s ease-out ${delay}ms
          `;
          el.style.transform = `
            rotate(${rotation}deg)
            translate(${Math.random() * 100 - 50}px, ${distance}px)
            scale(${0.5 + Math.random() * 0.5})
          `;
          el.style.opacity = '0';
          el.style.filter = 'blur(3px)';
          el.style.pointerEvents = 'none';
          el.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
        }, i * 100);
      });

      const timer = setTimeout(() => {
        setDestructionPhase(3);
        setIsDestroying(true);
      }, 5000);

      return () => clearTimeout(timer);
    }

    if (destructionPhase === 3) {
      setShowBlackHole(true);
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
      if (containerRef.current) {
        containerRef.current.classList.remove('earthquake-effect');
      }
    };
  }, [destructionPhase, setIsDestroying, setShowBlackHole]);

  const handleDestroyClick = () => {
    setShowWarning(!showWarning);
  };

  const confirmDestroy = () => {
    setShowWarning(false);
    setDestructionPhase(1); 
  };

  const cancelDestroy = () => {
    setShowWarning(false);
  };

  return (
    <>
      {!isDestroying && !showBlackHole && (
        <div
          ref={containerRef}
          className="min-h-screen font-space dark:bg-dark-background bg-light-background transition-colors duration-300 relative overflow-hidden"
        >
          <HomeSection id="home" setActiveSection={setActiveSection} ref={ref} />
          <AboutSection id="about" setActiveSection={setActiveSection} />
          <SkillsSection id="skills" setActiveSection={setActiveSection} />
          <ProjectsSection id="projects" setActiveSection={setActiveSection} />
          <ContactSection id="contact" setActiveSection={setActiveSection} />

          <div className="py-12 px-4 sm:px-6 lg:px-8 text-center relative mt-12">
            <div className="max-w-md mx-auto relative warning-container">
              <button
                onClick={handleDestroyClick}
                className={`py-3 px-6 rounded-full shadow-lg font-bold transition-all duration-300 transform hover:scale-105 ${
                  darkMode
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
              >
                {t('common.destroy_button')}
              </button>

              {showWarning && (
                <div
                  ref={warningRef}
                  className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 w-72 p-4 rounded-lg shadow-xl z-50 ${
                    darkMode
                      ? 'bg-gray-800 border border-gray-700 text-gray-100'
                      : 'bg-white border border-gray-200 text-gray-800'
                  }`}
                >
                  <div className="flex items-start">
                    <svg
                      className="flex-shrink-0 w-5 h-5 mt-0.5 text-yellow-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium">{t('common.warning_title')}</h3>
                      <div className="mt-1 text-sm">{t('common.warning_message')}</div>
                      <div className="mt-3 flex space-x-2">
                        <button
                          onClick={cancelDestroy}
                          className={`text-xs px-3 py-1 rounded-md ${
                            darkMode
                              ? 'bg-gray-700 hover:bg-gray-600 text-gray-100'
                              : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                          }`}
                        >
                          {t('common.cancel')}
                        </button>
                        <button
                          onClick={confirmDestroy}
                          className={`text-xs px-3 py-1 rounded-md ${
                            darkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'
                          } text-white`}
                        >
                          {t('common.continue')}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {destructionPhase >= 1 && <CracksEffect phase={destructionPhase} />}
          {destructionPhase >= 2 && <FallingDebris />}
        </div>
      )}

      {isDestroying && !showBlackHole && (
        <DestroyScene
          onComplete={() => {
            setShowBlackHole(true);
          }}
        />
      )}

      {showBlackHole && <BlackHoleScene />}
    </>
  );
};

const CracksEffect = ({ phase }) => {
  const intensity = phase === 1 ? 1 : 0.5;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9997]">
      {[...Array(phase === 1 ? 24 : 12)].map((_, i) => {
        const width = 1 + Math.random() * 3;
        const length = 20 + Math.random() * 60;
        const angle = Math.random() * 360;
        const delay = i * 100;
        const duration = 2 + Math.random() * 3;

        return (
          <div
            key={i}
            className="absolute bg-white origin-center"
            style={{
              width: `${width}px`,
              height: `${length}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${angle}deg)`,
              opacity: 0.15 * intensity,
              animation: `
                crackAppear ${duration}s ease-out ${delay}ms forwards,
                crackPulse ${1 + Math.random() * 2}s ease-in-out ${delay}ms infinite alternate
              `,
              boxShadow: `0 0 ${5 * intensity}px rgba(255,255,255,${0.3 * intensity})`,
            }}
          />
        );
      })}
    </div>
  );
};

const FallingDebris = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-[9998] overflow-hidden">
      {[...Array(50)].map((_, i) => {
        const size = 2 + Math.random() * 8;
        const left = Math.random() * 100;
        const delay = Math.random() * 3000;
        const duration = 2 + Math.random() * 3;
        const rotation = Math.random() * 360;

        return (
          <div
            key={i}
            className="absolute bg-gray-400 rounded-sm"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${left}%`,
              top: `-${size}px`,
              transform: `rotate(${rotation}deg)`,
              opacity: 0.8,
              animation: `fallDebris ${duration}s linear ${delay}ms forwards`,
              background: `linear-gradient(135deg, #ccc, #888)`,
              boxShadow: '0 0 5px rgba(255,255,255,0.5)',
            }}
          />
        );
      })}
    </div>
  );
};

export default forwardRef(Portfolio);