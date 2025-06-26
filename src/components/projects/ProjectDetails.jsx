import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from 'react-icons/fa';
import {
  SiReact,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiSocketdotio,
  SiGoogle,
  SiPaypal,
  SiTailwindcss,
  SiSupabase,
  SiCss3,
} from 'react-icons/si';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import projectsData from './projectsData';

const iconMap = {
  react: <SiReact size={20} color="#61DAFB" />,
  nodejs: <SiNodedotjs size={20} color="#3C873A" />,
  postgresql: <SiPostgresql size={20} color="#336791" />,
  prisma: <SiPrisma size={20} color="#2D3748" />,
  socketio: <SiSocketdotio size={20} color="#010101" />,
  googleVision: <SiGoogle size={20} color="#4285F4" />,
  paypal: <SiPaypal size={20} color="#00457C" />,
  tailwind: <SiTailwindcss size={20} color="#38BDF8" />,
  supabase: <SiSupabase size={20} color="#3ECF8E" />,
  css: <SiCss3 size={20} color="#1572B6" />,
};

const ProjectDetails = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { darkMode } = useTheme();
  const projectRaw = projectsData[id];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);


  if (!projectRaw) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center py-20 font-['Space_Grotesk'] text-yellow-500 bg-yellow-100 rounded-lg shadow"
      >
        ⚠️ {t('projectDetails.notFound')}
      </motion.div>
    );
  }

  const project = {
    ...projectRaw,
    title: t(projectRaw.titleKey),
    description: t(projectRaw.descriptionKey),
    longDescription: t(projectRaw.longDescriptionKey),
    features: projectRaw.featuresKeys.map(key => t(key)),
    technologies: projectRaw.technologies.map(key => ({ key, label: t(`technologies.${key}`) })),
  };


  if (!project) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center py-20 font-['Space_Grotesk'] text-yellow-500 bg-yellow-100 rounded-lg shadow"
      >
        ⚠️ {t('projectDetails.notFound')}
      </motion.div>
    );
  }

  const bgMain = darkMode ? '#0f0f1a' : '#f9fafb';
  const textMain = darkMode ? '#f3f4f6' : '#111827';
  const textSecondary = darkMode ? '#d1d5db' : '#4b5563';
  const cardBg = darkMode ? '#1f2937' : '#ffffff';
  const borderColor = darkMode ? '#374151' : '#d1d5db';
  const purple = darkMode ? '#7c3aed' : '#6d28d9';
  const linkBg = darkMode ? '#374151' : '#e5e7eb';
  const linkText = darkMode ? '#f3f4f6' : '#111827';
  const linkHoverBg = darkMode ? '#4b5563' : '#d1d5db';
  const unavailableBg = darkMode ? '#2d3748' : '#f3f4f6';
  const unavailableText = darkMode ? '#9ca3af' : '#6b7280';
  const noteBg = darkMode ? '#78350f' : '#fef3c7';
  const noteText = darkMode ? '#fde68a' : '#92400e';

  const images = Array.from({ length: projectRaw.imagesCount }, (_, i) => `/images/proyectos/${id}/${i + 1}.png`);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen py-24 px-4 md:px-12 font-['Space_Grotesk']"
      style={{ backgroundColor: bgMain, color: textMain }}
    >
      <div className="max-w-screen-xl mx-auto">
        <Link to="/#projects" className="flex items-center mb-8 hover:underline" style={{ color: purple }}>
          <FaArrowLeft className="mr-2" />
          {t('projectDetails.back')}
        </Link>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.2 } } }}
          className="rounded-2xl shadow-xl p-8 lg:p-12"
          style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, color: textMain }}
        >
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="flex flex-col lg:flex-row justify-between items-start mb-10 gap-6"
          >
            <div>
              <h1 className="text-3xl font-bold">{project.title}</h1>
              <p style={{ color: textSecondary }} className="mt-2">{project.description}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="px-4 py-1 text-sm rounded-full font-semibold text-white" style={{ backgroundColor: project.status === 'completed' ? '#16a34a' : '#ca8a04' }}>
                {t(`projects.status.${project.status}`)}
              </span>
              <span className="px-3 py-1 text-xs font-medium text-white rounded-full bg-purple-600">
                🚀 {t(`projectDetails.type.${project.type}`)}
              </span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="lg:col-span-2">
              <h2 className="text-xl font-semibold mb-3">{t('projectDetails.details')}</h2>
              <p className="mb-6 leading-relaxed" style={{ color: textSecondary }}>{project.longDescription}</p>

              <h2 className="text-xl font-semibold mb-3">{t('projectDetails.features.title')}</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.features.map((feature, idx) => (
                  <li key={idx} className="flex gap-2 items-start" style={{ color: textSecondary }}>
                    <span style={{ color: purple, marginTop: 2 }}>★</span> {feature}
                  </li>
                ))}
              </ul>

              <PhotoProvider>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                  {images.map((src, idx) => (
                    <PhotoView key={idx} src={src}>
                      <div className="relative rounded-lg cursor-zoom-in shadow-md overflow-hidden group">
                        <img
                          src={src}
                          alt={`Preview ${idx + 1}`}
                          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                          <span className="text-white text-sm font-semibold select-none">
                            🔍 {t('projectDetails.clickToZoom')}
                          </span>
                        </div>
                      </div>
                    </PhotoView>
                  ))}
                </div>
              </PhotoProvider>

            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="lg:col-span-1 p-6 rounded-xl shadow-inner" style={{ backgroundColor: darkMode ? '#111827' : '#f3f4f6' }}>
              <h3 className="text-lg font-bold mb-4">{t('projectDetails.techStack')}</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map(({ key, label }) => (
                  <span
                    key={key}
                    className="flex items-center gap-2 px-3 py-1 text-sm rounded-full"
                    style={{ backgroundColor: darkMode ? '#4c1d95' : '#c7d2fe', color: darkMode ? '#ddd6fe' : '#3730a3' }}
                  >
                    {iconMap[key]} <span>{label}</span>
                  </span>
                ))}
              </div>

              <div className="space-y-4">
                {project.githubUrl ? (
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-between items-center p-3 rounded-md transition"
                    style={{ backgroundColor: linkBg, color: linkText }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = linkHoverBg)}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = linkBg)}
                  >
                    <span>{t('projectDetails.github')}</span>
                    <FaGithub className="text-xl" />
                  </motion.a>
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 rounded-md text-sm italic" style={{ backgroundColor: unavailableBg, color: unavailableText }}>
                    {t('projectDetails.githubUnavailable')}
                  </motion.div>
                )}

                {project.status === 'completed' ? (
                  project.liveUrl ? (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex justify-between items-center p-3 rounded-md transition"
                      style={{ backgroundColor: linkBg, color: linkText }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = linkHoverBg)}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = linkBg)}
                    >
                      <span>{t('projectDetails.demo')}</span>
                      <FaExternalLinkAlt className="text-xl" />
                    </motion.a>
                  ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 rounded-md text-sm italic" style={{ backgroundColor: unavailableBg, color: unavailableText }}>
                      {t('projectDetails.demoUnavailable')}
                    </motion.div>
                  )
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 rounded-md text-sm italic font-semibold" style={{ backgroundColor: noteBg, color: noteText }}>
                    {t('projectDetails.notHostedNote')}
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProjectDetails;
