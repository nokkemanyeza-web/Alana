import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const EMOJIS = ['✨', '🌸', '💖', '☁️', '⭐', '🎈'];

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  emoji: string;
}

const Background = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const particleCount = 20;
    const newParticles: Particle[] = Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 10,
      duration: Math.random() * 20 + 20,
      delay: Math.random() * 5,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute opacity-40 select-none pointer-events-none"
          initial={{
            x: `${p.x}vw`,
            y: `${p.y}vh`,
            scale: 0,
          }}
          animate={{
            x: [`${p.x}vw`, `${p.x + (Math.random() * 20 - 10)}vw`, `${p.x}vw`],
            y: [`${p.y}vh`, `${p.y - 30}vh`, `${p.y}vh`],
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            fontSize: `${p.size}px`,
            filter: 'blur(1px)',
          }}
        >
          {p.emoji}
        </motion.div>
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/30 via-transparent to-pink-200/10 pointer-events-none" />
    </div>
  );
};

export default Background;
