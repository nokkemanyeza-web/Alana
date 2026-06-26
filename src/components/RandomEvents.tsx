import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RandomEventsProps {
  event: 'star' | 'cat' | 'duck' | 'cookie' | 'sparkles' | 'rainbow' | null;
  onComplete: () => void;
}

const RandomEvents: React.FC<RandomEventsProps> = ({ event, onComplete }) => {
  const [activeEvent, setActiveEvent] = useState(event);

  useEffect(() => {
    if (event) {
      setActiveEvent(event);
      const timer = setTimeout(() => {
        setActiveEvent(null);
        onComplete();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [event, onComplete]);

  return (
    <AnimatePresence>
      {activeEvent === 'star' && (
        <motion.div
          key="star"
          initial={{ x: '100vw', y: '-20vh', opacity: 1, scale: 2 }}
          animate={{ x: '-20vw', y: '100vh', opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="fixed z-50 text-4xl"
        >
          ⭐
        </motion.div>
      )}

      {activeEvent === 'cat' && (
        <motion.div
          key="cat"
          initial={{ x: '-10vw', y: '80vh', opacity: 1, scale: 3 }}
          animate={{ x: '110vw', y: '80vh', opacity: 1 }}
          transition={{ duration: 2.5, ease: 'linear' }}
          className="fixed z-50 text-6xl"
        >
          🐱
        </motion.div>
      )}

      {activeEvent === 'duck' && (
        <motion.div
          key="duck"
          initial={{ y: '100vh', x: '50vw', opacity: 1, scale: 3 }}
          animate={{ y: '70vh', x: '50vw', opacity: 1 }}
          exit={{ y: '100vh', opacity: 0 }}
          transition={{ duration: 1.5, ease: 'backOut' }}
          className="fixed z-50 text-6xl"
        >
          🦆 👋
        </motion.div>
      )}

      {activeEvent === 'cookie' && (
        <motion.div
          key="cookie"
          initial={{ y: '-10vh', x: `${Math.random() * 80 + 10}vw`, opacity: 1, scale: 3 }}
          animate={{ y: '110vh', rotate: 360 }}
          transition={{ duration: 3, ease: 'easeIn' }}
          className="fixed z-50 text-5xl"
        >
          🍪
        </motion.div>
      )}

      {activeEvent === 'sparkles' && (
        <motion.div
          key="sparkles"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 2, 1] }}
          transition={{ duration: 2 }}
          className="fixed inset-0 z-50 flex items-center justify-center text-8xl"
        >
          ✨
        </motion.div>
      )}

      {activeEvent === 'rainbow' && (
        <motion.div
          key="rainbow"
          initial={{ opacity: 0, scale: 0.8, y: -50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.2 }}
          transition={{ duration: 2 }}
          className="fixed top-10 left-1/2 -translate-x-1/2 z-50 text-8xl"
        >
          🌈
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RandomEvents;
