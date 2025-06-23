import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import '../../i18n/config';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';

const HomeSection = forwardRef((props, ref) => {
    const { t } = useTranslation();

    const handleDownloadCV = async () => {
        const currentLanguage = i18n.language;
        const cvFiles = {
            en: '/cv/CVEN.pdf',
            es: '/cv/CVES.pdf',
        };
        const cvPath = cvFiles[currentLanguage] || cvFiles.en;
        const fileName = currentLanguage === 'es' ? 'CV_ES.pdf' : 'CV_EN.pdf';
        try {
            const response = await fetch(cvPath);
            if (!response.ok) throw new Error("Failed to fetch PDF");
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error al descargar el CV:', error);
        }
    };

    return (
        <section
            ref={ref}
            className="min-h-screen flex items-center justify-center bg-transparent px-4"
        >
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center p-6 rounded-2xl shadow-lg backdrop-blur-md border border-white/10 dark:border-white/10 
                bg-white/60 dark:bg-[#1f2937]/70"
            >
                <h1
                    className="text-4xl sm:text-5xl font-bold mb-6 font-['Orbitron'] 
                    text-gray-900 dark:text-gray-100"
                >
                    {t('home.title')}
                </h1>

                <div className="flex justify-center mt-4">
                    <button
                        onClick={handleDownloadCV}
                        className="px-6 py-3 font-semibold text-sm rounded-xl 
                        text-white bg-gradient-to-r from-purple-600 to-blue-600 
                        hover:from-purple-500 hover:to-blue-500 
                        shadow-md hover:shadow-purple-500/50 transition-all 
                        duration-300 ease-in-out font-['JetBrains Mono']"
                    >
                        🚀 {t('Download CV') || 'Descargar CV'}
                    </button>
                </div>
            </motion.div>
        </section>
    );
});

export default HomeSection;