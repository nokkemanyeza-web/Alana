import { motion, AnimatePresence } from 'framer-motion';
import Background from './components/Background';
import GlassCard from './components/GlassCard';
import TextInput from './components/TextInput';
import Slider from './components/Slider';
import { useStoryLogic } from './hooks/useStoryLogic';

function App() {
  const { currentStep, nextStep, handleSliderSubmit, handleInputSubmit } = useStoryLogic();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden font-sans">
      <Background />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep.stepIndex}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full relative z-10 px-4"
        >
          <GlassCard>
            {currentStep.title && (
              <h2 className="text-xl font-semibold text-purple-800/60 mb-2 uppercase tracking-widest">
                {currentStep.title}
              </h2>
            )}
            
            <p className="text-2xl md:text-3xl font-medium text-gray-800 mb-8 whitespace-pre-line leading-relaxed">
              {currentStep.message}
            </p>

            {currentStep.type === 'options' && currentStep.options && (
              <div className="flex flex-col gap-4 w-full max-w-sm mx-auto">
                {currentStep.options.map((opt: { label: string; action: () => void }, i: number) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={opt.action}
                    className="w-full py-4 px-6 rounded-full bg-white/60 border-2 border-white/80 text-gray-800 font-bold shadow-sm hover:bg-white/80 hover:shadow-md hover:border-pink-200 transition-all text-left flex items-center justify-between"
                  >
                    {opt.label}
                  </motion.button>
                ))}
              </div>
            )}

            {currentStep.type === 'slider' && (
              <Slider onSubmit={handleSliderSubmit} />
            )}

            {currentStep.type === 'input' && (
              <TextInput onSubmit={handleInputSubmit} />
            )}

            {currentStep.showContinue && (
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextStep}
                className="mt-8 px-10 py-4 rounded-full font-bold text-white bg-gradient-to-r from-pink-400 to-rose-400 shadow-[0_4px_14px_0_rgba(251,113,133,0.39)] hover:shadow-[0_6px_20px_rgba(251,113,133,0.23)] hover:bg-[rgba(251,113,133,0.9)] transition-all"
              >
                {currentStep.stepIndex === 14 ? "Finish ✨" : "Continue ✨"}
              </motion.button>
            )}
          </GlassCard>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;
