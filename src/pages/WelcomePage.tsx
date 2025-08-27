import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface WelcomePageProps {
  onNext: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onNext }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden flex items-center justify-center"
    >
      {/* Starry Background */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-70"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Floating Hearts */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`heart-${i}`}
          className="absolute text-pink-300"
          style={{
            left: `${Math.random() * 90 + 5}%`,
            top: `${Math.random() * 90 + 5}%`,
          }}
          animate={{
            y: [-10, 10, -10],
            rotate: [0, 5, -5, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          <Heart size={Math.random() * 20 + 15} fill="currentColor" />
        </motion.div>
      ))}

      {/* Main Content */}
      <div className="text-center z-10 px-6 max-w-2xl">
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight"
        >
          Hey, I made something{' '}
          <span className="text-pink-300">special</span>{' '}
          for you 💕
        </motion.h1>

        <motion.button
          initial={{ y: 30, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(255, 182, 193, 0.4)" }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          className="bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white font-semibold py-4 px-8 rounded-full text-xl shadow-lg transition-all duration-300"
        >
          Open Surprise ✨
        </motion.button>
      </div>
    </motion.div>
  );
};

export default WelcomePage;