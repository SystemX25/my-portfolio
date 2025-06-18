import { motion, AnimatePresence } from "framer-motion";

export default function EclipseTransition({ isVisible, isDarkMode }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative w-40 h-40">
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-300 via-white to-yellow-300 shadow-2xl"
              animate={{ scale: 1.1 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute w-full h-full rounded-full bg-black"
              initial={{ x: isDarkMode ? "-100%" : "0%" }}
              animate={{ x: isDarkMode ? "0%" : "100%" }}
              exit={{ x: isDarkMode ? "0%" : "100%" }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}