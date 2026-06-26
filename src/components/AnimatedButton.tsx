import { useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import type { Variants } from 'framer-motion';

interface AnimatedButtonProps {
  onClick: () => void;
  text: string;
  buttonState: 'normal' | 'wiggle' | 'away' | 'small' | 'huge' | 'hidden';
}

const AnimatedButton = ({ onClick, text, buttonState }: AnimatedButtonProps) => {
  const controls = useAnimation();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const variants: Variants = {
    normal: { scale: 1, x: 0, y: 0, rotate: 0 },
    wiggle: { 
      x: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.4 }
    },
    away: { 
      x: 100, 
      y: -50,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    },
    small: { 
      scale: 0.7,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    },
    huge: { 
      scale: 2.5,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    },
    hidden: {
      opacity: 0,
      scale: 0,
      transition: { duration: 0.3 }
    }
  };

  const handleHover = () => {
    if (buttonState === 'away') {
      // Keep moving it away on hover if it's in the 'away' state
      controls.start({
        x: Math.random() * 200 - 100,
        y: Math.random() * 200 - 100,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      });
    }
  };

  if (buttonState === 'hidden') return null;

  return (
    <motion.button
      ref={buttonRef}
      onClick={onClick}
      onMouseEnter={handleHover}
      variants={variants}
      animate={buttonState === 'away' ? controls : buttonState}
      whileHover={buttonState !== 'away' ? { scale: buttonState === 'huge' ? 2.6 : 1.05 } : undefined}
      whileTap={buttonState !== 'away' ? { scale: buttonState === 'huge' ? 2.4 : 0.95 } : undefined}
      className={`
        relative px-8 py-4 rounded-full font-semibold text-lg
        bg-white/10 border border-white/20
        text-white shadow-[0_0_15px_rgba(255,255,255,0.2)]
        backdrop-blur-md overflow-hidden
        transition-colors hover:bg-white/20
      `}
    >
      <span className="relative z-10">{text}</span>
      
      {/* Soft pulse animation for normal state */}
      {buttonState === 'normal' && (
        <motion.div
          className="absolute inset-0 rounded-full border border-white/30"
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </motion.button>
  );
};

export default AnimatedButton;
