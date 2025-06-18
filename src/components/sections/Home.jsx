import { forwardRef, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import '../../i18n/config'
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { b } from 'framer-motion/client';

const HomeSection = forwardRef((props, ref) => {
    const { t } = useTranslation();

    const handleDownloadCV = async () => {
        const currentLanguage = i18n.language;
        const cvFiles = {
            en: '/cv/CNEN.pdf',
            es: '/cv/CNES.pdf',
        };
        const cvPath = cvFiles[currentLanguage] || cvFiles.en;
        const fileName = currentLanguage === 'es' ? 'CV_ES.pdf' : 'CV_EN.pdf';

        try {
            const response = await fetch(cvPath);
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
        <section ref={ref} className="min-h-screen flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
            >
                <h1 className="text-5xl font-bold mb-6">{t('home.title')}</h1>
                <div className="flex gap-4 justify-center">
                    <button className="btn-secondary" onClick={handleDownloadCV}>Descargar CV</button>
                </div>
            </motion.div>
        </section>
    );
});

export default HomeSection;