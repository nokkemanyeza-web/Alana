import { useState } from 'react';
import { motion } from 'framer-motion';

interface TextInputProps {
  onSubmit: (val: string) => void;
  placeholder?: string;
}

const TextInput = ({ onSubmit, placeholder = "Type here..." }: TextInputProps) => {
  const [value, setValue] = useState('');

  return (
    <div className="w-full max-w-sm mx-auto mt-6 flex flex-col gap-4">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full px-6 py-4 rounded-full bg-white/60 border-2 border-white/80 text-gray-800 placeholder-gray-400 shadow-inner focus:outline-none focus:ring-4 focus:ring-pink-300/50 transition-all text-lg font-medium"
        autoFocus
        onKeyDown={(e) => {
          if (e.key === 'Enter' && value.trim()) {
            onSubmit(value);
          }
        }}
      />
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        disabled={!value.trim()}
        onClick={() => onSubmit(value)}
        className="w-full py-4 rounded-full font-bold text-white bg-gradient-to-r from-pink-400 to-rose-400 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_14px_0_rgba(251,113,133,0.39)] hover:shadow-[0_6px_20px_rgba(251,113,133,0.23)] hover:bg-[rgba(251,113,133,0.9)] transition-all"
      >
        Send ✨
      </motion.button>
    </div>
  );
};

export default TextInput;
