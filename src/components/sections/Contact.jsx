import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail, MdSend } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../context/ThemeContext';
import emailjs from '@emailjs/browser';

const ContactSection = () => {
  const form = useRef();
  const [isSent, setIsSent] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const { darkMode } = useTheme();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(false);
    setErrorMessage('');

    const formData = new FormData(form.current);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    if (!name || !email || !message) {
      setErrorMessage(t('contact.validation.required'));
      setIsError(true);
      setIsLoading(false);
      return;
    }
    if (!validateEmail(email)) {
      setErrorMessage(t('contact.validation.invalid_email'));
      setIsError(true);
      setIsLoading(false);
      return;
    }
    if (message.length < 10) {
      setErrorMessage(t('contact.validation.short_message'));
      setIsError(true);
      setIsLoading(false);
      return;
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error('EmailJS configuration is missing!');
      setErrorMessage(t('contact.error.configuration'));
      setIsError(true);
      setIsLoading(false);
      return;
    }

    emailjs.sendForm(serviceId, templateId, form.current, publicKey)
      .then(() => {
        setIsSent(true);
        setIsError(false);
        setTimeout(() => setIsSent(false), 5000);
        form.current.reset();
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        setErrorMessage(t('contact.error.general'));
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  };

  const textColor = darkMode ? 'text-gray-200' : 'text-gray-800';
  const inputBg = darkMode ? 'bg-gray-800' : 'bg-white';
  const inputBorder = darkMode ? 'border-purple-500/40' : 'border-purple-400/30';
  const buttonBg = darkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-500 hover:bg-purple-600';
  const glowEffect = darkMode ? 'hover:shadow-purple-500/30' : 'hover:shadow-blue-500/30';

  return (
    <section id="contact" className="py-20 px-4 max-w-4xl mx-auto relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-20 blur-sm z-0">
      </div>
      <div className="relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`text-3xl font-bold text-center mb-12 font-orbitron relative inline-block ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}
        >
          <span className="before:content-['>_'] before:mr-2 before:text-green-400 dark:before:text-green-300 font-jetbrains">
            {t('contact.title')}
          </span>
          <span className="animate-pulse text-green-400">|</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.form
            ref={form}
            onSubmit={sendEmail}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {['name', 'email', 'message'].map((field) => (
              <div className="space-y-1" key={field}>
                <label htmlFor={field} className={`block text-sm font-medium ${textColor} font-space-grotesk`}>
                  {t(`contact.${field}`)} <span className="text-red-500">*</span>
                </label>
                {field !== 'message' ? (
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    id={field}
                    name={field}
                    required
                    className={`w-full px-4 py-2 rounded-lg border ${inputBorder} ${inputBg} ${textColor} focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all hover:shadow-[0_0_12px_rgba(124,58,237,0.6)]`}
                  />
                ) : (
                  <textarea
                    id={field}
                    name={field}
                    rows="5"
                    required
                    minLength="10"
                    className={`w-full px-4 py-2 rounded-lg border ${inputBorder} ${inputBg} ${textColor} focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all hover:shadow-[0_0_12px_rgba(124,58,237,0.6)]`}
                  ></textarea>
                )}
              </div>
            ))}

            {isSent && <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-500 text-center animate-fade-in">{t('contact.success')}</div>}
            {isError && <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-center animate-fade-in">{errorMessage}</div>}

            <motion.button
              whileHover={{ scale: 1.05, rotate: [-1, 1, -1, 0] }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isLoading || isSent}
              className={`relative flex items-center justify-center gap-2 w-full py-3 px-6 rounded-lg ${buttonBg} text-white font-bold tracking-wide uppercase overflow-hidden transition-all hover:shadow-lg ${glowEffect} ${(isLoading || isSent) ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              <span className="z-10 relative">
                {isLoading ? t('contact.sending') : isSent ? t('contact.sent') : t('contact.send')}
              </span>
              <span className="absolute top-0 left-0 w-full h-full bg-purple-800 opacity-20 mix-blend-overlay animate-glitch" />
              {!isLoading && !isSent && <MdSend className="text-lg z-10" />}
            </motion.button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col items-center md:items-start space-y-8"
          >
            <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800/50' : 'bg-gray-100/50'} border ${inputBorder} w-full`}>
              <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-purple-400' : 'text-purple-600'} font-orbitron`}>
                {t('contact.connect')}
              </h3>

              <div className="flex flex-col space-y-4">
                <motion.a
                  whileHover={{ x: 5 }}
                  href={`https://github.com/${import.meta.env.VITE_GITHUB_USERNAME || 'SystemX25'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 ${textColor} hover:text-purple-500 transition-colors`}
                >
                  <div className={`p-3 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} hover:shadow-lg ${glowEffect}`}>
                    <FaGithub className="text-2xl" />
                  </div>
                  <span className="font-space-grotesk">GitHub</span>
                </motion.a>

                <motion.a
                  whileHover={{ x: 5 }}
                  href={`https://linkedin.com/in/${import.meta.env.VITE_LINKEDIN_USERNAME || 'yourprofile'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 ${textColor} hover:text-blue-500 transition-colors`}
                >
                  <div className={`p-3 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} hover:shadow-lg ${glowEffect.replace('purple', 'blue')}`}>
                    <FaLinkedin className="text-2xl" />
                  </div>
                  <span className="font-space-grotesk">LinkedIn</span>
                </motion.a>

                <motion.div
                  whileHover={{ x: 5 }}
                  className={`flex items-center gap-3 ${textColor}`}
                >
                  <div className={`p-3 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} hover:shadow-lg ${glowEffect}`}>
                    <MdEmail className="text-2xl" />
                  </div>
                  <span className="font-space-grotesk">
                    {import.meta.env.VITE_CONTACT_EMAIL || 'contact@example.com'}
                  </span>
                </motion.div>

                <motion.a
                  whileHover={{ x: 5 }}
                  href="https://github.com/SystemX25/my-portfolio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 ${textColor} hover:text-purple-500 transition-colors`}
                >
                  <div className={`p-3 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} hover:shadow-lg ${glowEffect}`}>
                    <FaGithub className="text-2xl" />
                  </div>
                  <span className="font-space-grotesk">{t('contact.githubRepo')}</span>
                </motion.a>
              </div>
            </div>

            <div className={`text-sm italic ${darkMode ? 'text-gray-400' : 'text-gray-600'} text-center md:text-left font-space-grotesk`}>
              <p>{t('contact.footer')}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;