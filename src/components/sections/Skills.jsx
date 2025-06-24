import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../context/ThemeContext';

import {
  SiReact,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiNodedotjs,
  SiGithub,
  SiSupabase,
  SiPrisma,
  SiFigma,
} from 'react-icons/si';

const SkillsSection = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const { t } = useTranslation();
  const { darkMode } = useTheme();

  const skills = [
    {
      name: 'React',
      level: 50,
      icon: <SiReact size={40} color="#61DAFB" />,
      descKey: 'skills.react',
      color: '#61DAFB'
    },
    {
      name: 'JavaScript',
      level: 45,
      icon: <SiJavascript size={40} color="#F7DF1E" />,
      descKey: 'skills.javascript',
      color: '#F7DF1E'
    },
    {
      name: 'Node.js',
      level: 45,
      icon: <SiNodedotjs size={40} color="#339933" />,
      descKey: 'skills.nodejs',
      color: '#339933'
    },
    {
      name: 'HTML',
      level: 50,
      icon: <SiHtml5 size={40} color="#E34F26" />,
      descKey: 'skills.html',
      color: '#E34F26'
    },
    {
      name: 'CSS',
      level: 40,
      icon: <SiCss3 size={40} color="#1572B6" />,
      descKey: 'skills.css',
      color: '#1572B6'
    },
    {
      name: 'Git/GitHub',
      level: 90,
      icon: <SiGithub size={40} color="#181717" />,
      descKey: 'skills.git',
      color: '#181717'
    },
    {
      name: 'Supabase',
      level: 85,
      icon: <SiSupabase size={40} color="#3ECF8E" />,
      descKey: 'skills.supabase',
      color: '#3ECF8E'
    },
    {
      name: 'Prisma',
      level: 80,
      icon: <SiPrisma size={40} color="#2D3748" />,
      descKey: 'skills.prisma',
      color: '#2D3748'
    },
    {
      name: 'UI/UX',
      level: 40,
      icon: <SiFigma size={40} color="#7C3AED" />,
      descKey: 'skills.uiux',
      color: '#7C3AED'
    }
  ];

  return (
    <section className="py-20 px-4 bg-transparent">
      <h2 className={`text-3xl font-bold text-center mb-12 font-orbitron ${darkMode ? 'text-purple-400' : 'text-purple-700'}`}>
        {t('skills.title')}
      </h2>

      <p className={`text-center mb-8 text-sm font-space-grotesk ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        {t('skills.hint') || '¿No sabes qué es alguna? ¡Haz clic para más info!'}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {skills.map((skill) => (
          <motion.div
            key={skill.name}
            whileHover={{ y: -4, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedSkill(skill)}
            className={`p-4 rounded-2xl shadow-md cursor-pointer backdrop-blur-sm transition-all border-t-4
              ${selectedSkill?.name === skill.name
                ? 'ring-2 ring-purple-500 dark:ring-purple-400'
                : `${darkMode ? 'bg-[#1f2937]' : 'bg-white'}`}
            `}
            style={{ borderColor: skill.color }}
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-3">{skill.icon}</div>
              <h3 className={`font-semibold text-lg font-space-grotesk ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                {skill.name}
              </h3>
              <div className={`w-full rounded-full h-2.5 mt-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <div
                  className="h-2.5 rounded-full"
                  style={{ width: `${skill.level}%`, backgroundColor: skill.color }}
                ></div>
              </div>
              <span className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{skill.level}%</span>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedSkill(null)}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className={`p-6 rounded-xl max-w-md w-full shadow-2xl ${darkMode ? 'bg-[#1f2937] text-white' : 'bg-white text-gray-800'}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center mb-4">
                <div className="mr-3">{selectedSkill.icon}</div>
                <h3 className="text-xl font-bold font-orbitron">
                  {selectedSkill.name}
                </h3>
              </div>
              <p className="mb-4 font-space-grotesk">
                {t(selectedSkill.descKey)}
              </p>
              <div className="mb-2">
                <span className="text-sm font-medium">{t('skills.level')}:</span>
                <div className={`w-full rounded-full h-2.5 mt-1 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <div
                    className="h-2.5 rounded-full"
                    style={{ width: `${selectedSkill.level}%`, backgroundColor: selectedSkill.color }}
                  ></div>
                </div>
                <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {selectedSkill.level}%
                </span>
              </div>
              <button
                onClick={() => setSelectedSkill(null)}
                className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition font-jetbrains-mono"
              >
                {t('skills.close')}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default SkillsSection;