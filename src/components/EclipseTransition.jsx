import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";


export default function EclipseTransition({ isVisible, isDarkMode }) {
  const [theme, setTheme] = useState(isDarkMode ? 'dark' : 'light');

  useEffect(() => {
    setTheme(isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 w-screen h-screen z-[9999] flex items-center justify-center bg-black/70 pointer-events-none"
          style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Contenedor centrado con transformaciones */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative w-64 h-64"> {/* Aumenté el tamaño para mejor visibilidad */}
              {/* Sol (fondo estático) */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-300 via-white to-yellow-300 shadow-2xl"
                animate={{ scale: 1.1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />

              {/* Luna (animación condicional) */}
              {theme === 'dark' ? (
                <motion.div
                  className="absolute w-full h-full rounded-full bg-black"
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  exit={{ x: "100%" }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                />
              ) : (
                <motion.div
                  className="absolute w-full h-full rounded-full bg-black"
                  initial={{ x: "-100%" }}
                  animate={{ x: "-100%" }}
                  exit={{ x: "0%" }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                />
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}