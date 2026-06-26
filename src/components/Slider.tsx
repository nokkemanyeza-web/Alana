import { useState } from 'react';
import { motion } from 'framer-motion';

interface SliderProps {
  onSubmit: (val: number) => void;
}

const Slider = ({ onSubmit }: SliderProps) => {
  const [value, setValue] = useState(5);

  return (
    <div className="w-full max-w-sm mx-auto mt-8 flex flex-col items-center gap-8">
      <div className="w-full relative px-4">
        <input
          type="range"
          min="1"
          max="10"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="w-full h-4 bg-white/60 rounded-full appearance-none cursor-pointer accent-pink-500 shadow-inner"
        />
        <div className="flex justify-between w-full mt-3 text-sm text-gray-500 font-bold px-1">
          <span>1 (Not at all)</span>
          <span className="text-2xl font-bold text-pink-500 drop-shadow-sm">{value}</span>
          <span>10 (Very)</span>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onSubmit(value)}
        className="w-full py-4 rounded-full font-bold text-white bg-gradient-to-r from-pink-400 to-rose-400 shadow-[0_4px_14px_0_rgba(251,113,133,0.39)] hover:shadow-[0_6px_20px_rgba(251,113,133,0.23)] hover:bg-[rgba(251,113,133,0.9)] transition-all"
      >
        Submit Verdict ✨
      </motion.button>
    </div>
  );
};

export default Slider;
