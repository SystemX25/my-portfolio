import { useParams } from 'react-router-dom';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const projectsData = {
    'galaxy-tracker': {
      title: 'Galaxy Tracker',
      status: 'completed',
      description: 'Aplicación para rastrear objetos celestes usando NASA API',
      longDescription: 'Este proyecto consume la API de la NASA para mostrar imágenes astronómicas diarias. Implementa un sistema de favoritos y búsqueda avanzada. La interfaz fue diseñada con Tailwind CSS y utiliza Redux para manejo de estado.',
      technologies: ['React', 'Tailwind', 'NASA API', 'Redux'],
      features: [
        'Visualización de imagen astronómica del día',
        'Búsqueda por fecha y categoría',
        'Sistema de favoritos local',
        'Modo oscuro/light'
      ],
      githubUrl: 'https://github.com/yourusername/galaxy-tracker',
      liveUrl: 'https://galaxy-tracker-demo.netlify.app'
    },
    'cosmic-code': {
      title: 'Cosmic Code',
      status: 'in-progress',
      description: 'Editor de código con temática espacial',
      longDescription: 'Editor de código en desarrollo con características únicas como colaboración en tiempo real y temática espacial personalizable. Actualmente implementando WebSockets para las funcionalidades colaborativas.',
      technologies: ['React', 'Node.js', 'WebSockets', 'Monaco Editor'],
      features: [
        'Resaltado de sintaxis para múltiples lenguajes',
        'Temas de color espaciales',
        'Colaboración en tiempo real (en desarrollo)',
        'Sistema de snippets compartidos'
      ],
      githubUrl: 'https://github.com/yourusername/cosmic-code'
    }
  };

  const project = projectsData[id];

  if (!project) {
    return <div>Proyecto no encontrado</div>;
  }

  return (
    <div className="min-h-screen py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-purple-600 dark:text-purple-400 mb-8 hover:underline"
        >
          <FaArrowLeft className="mr-2" /> Volver a proyectos
        </button>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                  {project.title}
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  {project.description}
                </p>
              </div>
              <span className={`px-3 py-1 text-sm font-semibold rounded-full 
                ${project.status === 'completed' ? 'bg-green-500 dark:bg-green-700' : 'bg-yellow-500 dark:bg-yellow-700'} 
                text-white`}>
                {project.status === 'completed' ? 'Completado' : 'En progreso'}
              </span>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Descripción Detallada</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {project.longDescription}
                </p>
                
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Características</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-purple-500 dark:text-purple-400 mr-2">•</span>
                      <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Detalles Técnicos</h3>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Tecnologías</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map(tech => (
                        <span key={tech} className="px-3 py-1 text-sm rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500 transition">
                        <span className="text-gray-700 dark:text-gray-200">Ver código</span>
                        <FaGithub className="text-gray-700 dark:text-gray-200" />
                      </a>
                    )}
                    
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500 transition">
                        <span className="text-gray-700 dark:text-gray-200">Ver demo</span>
                        <FaExternalLinkAlt className="text-gray-700 dark:text-gray-200" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;