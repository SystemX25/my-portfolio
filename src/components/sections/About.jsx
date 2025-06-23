import { forwardRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaRobot } from 'react-icons/fa';
import { useTranslation, Trans } from 'react-i18next';
import { useTheme } from '../../context/ThemeContext';
import './AboutSection.css';

const AboutSection = forwardRef((props, ref) => {
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useTranslation();
  const { darkMode } = useTheme();

  const textColor = darkMode ? 'text-gray-200' : 'text-gray-800';
  const cardBg = darkMode ? 'bg-[#1f2937]' : 'bg-white';
  const cardText = darkMode ? 'text-gray-300' : 'text-gray-700';
  const borderFront = darkMode ? 'border-purple-500/40' : 'border-purple-500/20';
  const borderBack = darkMode ? 'border-red-500/40' : 'border-red-500/20';

  return (
    <section ref={ref} className="py-20 px-4 max-w-4xl mx-auto">
      <h2 className={`text-3xl font-bold text-center mb-12 font-orbitron ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
        {t('about.title')}
      </h2>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className={`space-y-4 text-lg ${textColor} font-space-grotesk`}
        >
          <p>{t('about.desc1')}</p>
          <p>{t('about.desc2')}</p>

          <Trans
            i18nKey="about.desc3"
            components={{
              blue: <span className="text-blue-500" />,
              purple: <span className="text-purple-500" />,
            }}
          />
          <Trans
            i18nKey="about.desc4"
            components={{
              blue: <span className="text-blue-500" />,
              red: <span className="text-red-500" />,
              purple: <span className="text-purple-500" />,
            }}
          />
        </motion.div>

        <div
          className="card-container"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            animate={{ rotateY: isHovered ? 180 : 0 }}
            transition={{ type: 'spring', stiffness: 80 }}
            className="card-inner"
          >

            <div className={`card-face card-front ${cardBg} ${borderFront}`}>
              <FaCode className="text-4xl text-purple-500 mb-2" />
              <p className={`text-xs ${cardText} font-jetbrains-mono`}>
                // SystemX25.exe
              </p>
            </div>

            <div className={`card-face card-back ${cardBg} ${borderBack}`}>
              <FaRobot className="text-4xl text-red-500 mb-2 animate-pulse" />
              <p className={`text-xs text-center ${cardText} font-jetbrains-mono leading-tight`}>
                AI Core: status ➤<br />evolving...
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

export default AboutSection;