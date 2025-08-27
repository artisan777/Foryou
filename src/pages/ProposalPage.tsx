import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';

interface ProposalPageProps {
  onNext: () => void;
}

const ProposalPage: React.FC<ProposalPageProps> = ({ onNext }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noButtonClicks, setNoButtonClicks] = useState(0);

  const handleYes = () => {
    setShowConfetti(true);
    setTimeout(() => {
      onNext();
    }, 3000);
  };

  const handleNoAttempt = () => {
    setNoButtonClicks(prev => prev + 1);
    // Move button to random position
    const maxX = window.innerWidth - 150;
    const maxY = window.innerHeight - 100;
    setNoButtonPosition({
      x: Math.random() * maxX,
      y: Math.random() * maxY
    });
  };

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-100 to-blue-200 relative overflow-hidden flex items-center justify-center"
    >
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={200}
          recycle={false}
        />
      )}

      {/* Floating Hearts Background */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-3xl md:text-4xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 360],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: Math.random() * 6 + 4,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        >
          💖
        </motion.div>
      ))}

      <div className="text-center z-10 px-6 max-w-4xl relative">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12"
        >
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-12 leading-tight"
          >
            Will you be mine forever? 💍❤️
          </motion.h1>

          {!showConfetti ? (
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <motion.button
                onClick={handleYes}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white font-bold py-4 px-12 rounded-full text-xl shadow-lg transition-all duration-300"
              >
                Yes! 💕
              </motion.button>

              <motion.button
                animate={{
                  x: noButtonPosition.x,
                  y: noButtonPosition.y,
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                onClick={handleNoAttempt}
                whileHover={{ scale: 1.1 }}
                className="bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white font-bold py-4 px-12 rounded-full text-xl shadow-lg transition-all duration-300 absolute sm:relative"
                style={noButtonClicks > 0 ? { 
                  position: 'fixed',
                  left: noButtonPosition.x,
                  top: noButtonPosition.y,
                  zIndex: 50
                } : {}}
              >
                {noButtonClicks === 0 ? 'No' : 
                 noButtonClicks === 1 ? 'Try again!' :
                 noButtonClicks === 2 ? 'Really?' :
                 'You sure? 😏'}
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-3xl md:text-4xl font-bold text-pink-600"
              >
                YESSS! 🎉✨
              </motion.p>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-xl text-purple-700"
              >
                I'm so happy! 💖
              </motion.p>
            </motion.div>
          )}
        </motion.div>

        {noButtonClicks > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-4 left-4 text-purple-600 font-medium text-lg"
          >
            Hehe, you can't escape! 😄
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default ProposalPage;