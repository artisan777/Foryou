import React from 'react';
import { motion } from 'framer-motion';

interface ConfessionPageProps {
  onNext: () => void;
}

const ConfessionPage: React.FC<ConfessionPageProps> = ({ onNext }) => {
  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 relative overflow-hidden flex items-center justify-center"
    >
      {/* Rising Balloons */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl md:text-6xl"
          style={{
            left: `${Math.random() * 90 + 5}%`,
            bottom: '-100px',
          }}
          animate={{
            y: [0, -window.innerHeight - 200],
            x: [0, (Math.random() - 0.5) * 100],
            rotate: [0, Math.random() * 360],
          }}
          transition={{
            duration: Math.random() * 8 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeOut",
          }}
        >
          {['🎈', '🎀', '💝', '🌸'][Math.floor(Math.random() * 4)]}
        </motion.div>
      ))}

      {/* Main Content */}
      <div className="text-center z-10 px-6 max-w-3xl">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12"
        >
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold text-purple-800 mb-8"
          >
            I have one important{' '}
            <span className="text-pink-500">question</span>{' '}
            for you...
          </motion.h2>

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="space-y-4"
          >
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Are you ready to hear it? 💫
            </p>

            <motion.button
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              onClick={onNext}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 15px 35px rgba(168, 85, 247, 0.4)"
              }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-10 rounded-full text-xl shadow-lg transition-all duration-300"
            >
              What is it? 💜
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ConfessionPage;