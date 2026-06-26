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
              <div className="flex flex-col gap-3 w-full max-w-sm mx-auto">
                {currentStep.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={opt.action}
                    className="w-full py-4 px-6 rounded-2xl bg-white/40 border border-white/50 text-gray-800 font-medium shadow-sm hover:bg-white/60 hover:shadow-md transition-all text-left"
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
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextStep}
                className="mt-8 px-8 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-purple-400 to-pink-400 shadow-lg hover:shadow-xl transition-all"
              >
                Continue
              </motion.button>
            )}
          </GlassCard>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;
