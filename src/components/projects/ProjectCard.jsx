import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaRocket, FaGithub } from 'react-icons/fa';
import { GiSpaceship } from 'react-icons/gi';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const statusColors = {
  completed: {
    bg: 'bg-green-600 dark:bg-green-700',
    text: 'text-green-100',
    iconColor: 'text-green-400'
  },
  'in-progress': {
    bg: 'bg-yellow-500 dark:bg-yellow-600',
    text: 'text-yellow-900 dark:text-yellow-300',
    iconColor: 'text-yellow-400'
  },
  upcoming: {
    bg: 'bg-blue-500 dark:bg-blue-700',
    text: 'text-blue-100',
    iconColor: 'text-blue-400'
  }
};

const ProjectCard = ({ project, isDetailed }) => {
  const { darkMode } = useTheme();
  const { t } = useTranslation();

  const status = statusColors[project.status] || statusColors.upcoming;

  return (
    <motion.div
      whileHover={{
        y: -10,
        scale: 1.04,
        boxShadow: darkMode
          ? '0 0 15px 3px #7c3aed'
          : '0 0 15px 3px #a78bfa'
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      className={`relative overflow-hidden rounded-xl border 
        ${darkMode ? 'border-gray-700 bg-[#1f2937]' : 'border-gray-300 bg-white'} 
        shadow-md cursor-pointer w-full sm:w-80 font-space-grotesk`}
      title={project.title}
    >
      <div className="p-6 flex flex-col h-full">
        <div className="flex justify-between items-center mb-3">
          <h3 className={`text-xl font-bold 
            ${darkMode ? 'text-purple-300' : 'text-purple-700'} font-orbitron`}>
            {project.title}
          </h3>
          <span
            className={`text-xs font-semibold rounded-full px-3 py-1 select-none
              animate-gradient-text
              ${status.bg} ${status.text}`}
          >
            {t(`projects.status.${project.status}`)}
          </span>
        </div>

        <p className={`flex-grow text-sm leading-relaxed 
          ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies?.map((tech) => (
            <span
              key={tech}
              className={`px-2 py-1 rounded-full text-xs font-jetbrains-mono 
                ${darkMode 
                  ? 'bg-purple-800 text-purple-300' 
                  : 'bg-purple-200 text-purple-800'}`}
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-6 flex space-x-6 items-center">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1 text-sm font-semibold 
                ${darkMode ? 'text-gray-300 hover:text-purple-400' : 'text-gray-700 hover:text-purple-600'}`}
            >
              <FaGithub />
              {t('projects.github')}
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1 text-sm font-semibold 
                ${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'}`}
            >
              <FaExternalLinkAlt />
              {t('projects.demo')}
            </a>
          )}

          {isDetailed && (
            <div
              className={`ml-auto ${status.iconColor} animate-pulse text-2xl`}
              title={t(`projects.status.${project.status}`)}
            >
              {project.status === 'in-progress' ? <GiSpaceship /> : <FaRocket />}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .animate-gradient-text {
          background: linear-gradient(90deg, #7c3aed, #a78bfa, #7c3aed);
          background-size: 200% 200%;
          animation: gradientShift 3s ease infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </motion.div>
  );
};

export default ProjectCard;