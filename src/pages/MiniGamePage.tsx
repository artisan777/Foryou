import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface MiniGamePageProps {
  onNext: () => void;
}

interface FallingHeart {
  id: number;
  x: number;
  y: number;
  size: number;
}

const MiniGamePage: React.FC<MiniGamePageProps> = ({ onNext }) => {
  const [hearts, setHearts] = useState<FallingHeart[]>([]);
  const [clickCount, setClickCount] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [heartIdCounter, setHeartIdCounter] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (clickCount < 5) {
        setHearts(prev => [...prev, {
          id: heartIdCounter,
          x: Math.random() * (window.innerWidth - 50),
          y: -50,
          size: Math.random() * 20 + 25
        }]);
        setHeartIdCounter(prev => prev + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [clickCount, heartIdCounter]);

  React.useEffect(() => {
    const cleanup = setInterval(() => {
      setHearts(prev => prev.filter(heart => heart.y < window.innerHeight + 100));
    }, 100);

    return () => clearInterval(cleanup);
  }, []);

  React.useEffect(() => {
    if (clickCount >= 5 && !gameComplete) {
      setGameComplete(true);
      setHearts([]);
    }
  }, [clickCount, gameComplete]);

  const handleHeartClick = useCallback((heartId: number) => {
    setHearts(prev => prev.filter(heart => heart.id !== heartId));
    setClickCount(prev => prev + 1);
  }, []);

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-br from-blue-100 via-pink-50 to-purple-100 relative overflow-hidden"
    >
      {/* Game Hearts */}
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ x: heart.x, y: heart.y, scale: 0 }}
          animate={{ 
            y: window.innerHeight + 100,
            scale: 1,
            rotate: [0, 15, -15, 0]
          }}
          transition={{ 
            y: { duration: 6, ease: "linear" },
            scale: { duration: 0.3 },
            rotate: { duration: 2, repeat: Infinity }
          }}
          className="absolute cursor-pointer select-none z-10 touch-manipulation pointer-events-auto"
          style={{ fontSize: `${heart.size}px` }}
          onPointerDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleHeartClick(heart.id);
          }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
        >
          💖
        </motion.div>
      ))}

      <div className="relative z-20 flex items-center justify-center min-h-screen p-6 pointer-events-none">
        <div className="text-center max-w-2xl pointer-events-auto">
          <motion.h2
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-purple-800 mb-6"
          >
            Catch My Hearts! 💕
          </motion.h2>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-lg md:text-xl text-purple-600 mb-8"
          >
            Click on the falling hearts to catch them!
          </motion.p>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="bg-white/90 rounded-2xl p-6 shadow-lg mb-8"
          >
            <p className="text-2xl font-semibold text-purple-700">
              Hearts caught: {clickCount}/5
            </p>
          </motion.div>

          {gameComplete && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-2xl md:text-3xl text-pink-600 font-medium"
              >
                Looks like you've caught my heart already ❤️
              </motion.p>

              <motion.button
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                onClick={onNext}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white font-semibold py-4 px-8 rounded-full text-lg shadow-lg transition-all duration-300"
              >
                Next ➝
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MiniGamePage;