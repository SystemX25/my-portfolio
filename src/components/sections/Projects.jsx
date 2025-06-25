import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../context/ThemeContext';
import ProjectCard from '../projects/ProjectCard';
import { FaSatellite, FaStar } from 'react-icons/fa';

const ProjectsSection = ({ id, setActiveSection }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { darkMode } = useTheme();

  const projects = [
    {
      id: 'ceti-market',
      title: t('projects.cetiMarket.title'),
      status: 'completed',
      description: t('projects.cetiMarket.description'),
      technologies: [
        t('technologies.react'),
        t('technologies.nodejs'),
        t('technologies.socketio'),
        t('technologies.postgresql'),
        t('technologies.prisma'),
        t('technologies.googleVision'),
        t('technologies.paypal'),
        t('technologies.pwa'),
        t('technologies.vercel')
      ]
    },
    {
      id: 'mazamitla-cabins',
      title: t('projects.mazamitlaCabins.title'),
      status: 'completed',
      description: t('projects.mazamitlaCabins.description'),
      technologies: [
        t('technologies.react'),
        t('technologies.tailwind'),
        t('technologies.prisma'),
        t('technologies.supabase'),
        t('technologies.vercel')
      ]
    }
  ];



  return (
    <motion.section
      id={id}
      className="py-20 bg-transparent"
      onViewportEnter={() => setActiveSection(id)}
      initial={false}
    >
      <div className="container mx-auto px-4">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className={`text-3xl md:text-4xl font-orbitron font-bold tracking-wide 
            ${darkMode ? 'text-purple-400' : 'text-purple-700'} flex items-center justify-center gap-3`}>
            <FaSatellite className="text-blue-500 animate-spin-slow" />
            {t('projects.title') || '🚀 Launching Code into the Cosmos'}
            <FaStar className="text-yellow-400 animate-pulse" />
          </h2>
          <p className={`mt-2 text-sm md:text-base font-space-grotesk 
            ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {t('projects.subtitle') || 'Click any project to explore its mission...'}
          </p>
        </motion.div>

        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                onClick={() => navigate(`/projects/${project.id}`)}
                className="cursor-pointer hover:scale-[1.02] active:scale-95 transition-transform duration-300"
              >
                <ProjectCard
                  project={project}
                  isDetailed={false}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ProjectsSection;
