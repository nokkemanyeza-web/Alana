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
          className="w-full h-3 bg-white/40 rounded-lg appearance-none cursor-pointer accent-purple-500"
        />
        <div className="flex justify-between w-full mt-2 text-sm text-gray-600 font-medium px-1">
          <span>1 (Not at all)</span>
          <span className="text-xl font-bold text-purple-700">{value}</span>
          <span>10 (Very)</span>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onSubmit(value)}
        className="w-full py-3 rounded-full font-semibold text-white bg-gradient-to-r from-purple-400 to-pink-400 shadow-lg transition-all"
      >
        Submit Verdict
      </motion.button>
    </div>
  );
};

export default Slider;
