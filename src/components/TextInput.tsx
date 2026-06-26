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
        className="w-full px-6 py-4 rounded-2xl bg-white/40 border border-white/50 text-gray-800 placeholder-gray-500 shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all text-lg"
        autoFocus
        onKeyDown={(e) => {
          if (e.key === 'Enter' && value.trim()) {
            onSubmit(value);
          }
        }}
      />
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={!value.trim()}
        onClick={() => onSubmit(value)}
        className="w-full py-3 rounded-full font-semibold text-white bg-gradient-to-r from-purple-400 to-pink-400 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transition-all"
      >
        Send
      </motion.button>
    </div>
  );
};

export default TextInput;
