import { useState } from 'react';
import confetti from 'canvas-confetti';

export type StepType = 'message' | 'options' | 'slider' | 'input';

export interface StoryState {
  stepIndex: number;
  type: StepType;
  title: string;
  message?: string;
  options?: { label: string; action: () => void }[];
  inputValue?: string;
  sliderValue?: number;
  showContinue?: boolean;
}

export const useStoryLogic = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const nextStep = () => {
    setStep(s => {
      const next = s + 1;
      if (next === 10) {
        // Send answers to Formspree (Email)
        const formspreeUrl = import.meta.env.VITE_FORMSPREE_URL;
        if (formspreeUrl) {
          fetch(formspreeUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              subject: "New responses from the Icebreaker!",
              vibe: answers.vibe || 'Not answered',
              nerdScore: answers.nerdScore || 'Not answered',
              skill: answers.skill || 'Not answered',
              smile: answers.smile || 'Not answered',
            }),
          }).catch(err => console.error("Formspree error:", err));
        } else {
          console.log("No Formspree URL configured. Answers:", answers);
        }
      }
      return next;
    });
  };

  const getStepData = (): StoryState => {
    switch (step) {
      case 0:
        return {
          stepIndex: 0,
          type: 'message',
          title: 'Heyy Lana 🥰',
          message: "Since we just met, I thought a normal 'hey' was a bit too boring.\n\nSo I built this ✨",
          showContinue: true,
        };
      case 1:
        return {
          stepIndex: 1,
          type: 'options',
          title: 'First things first...',
          message: "Honestly, how's your day going so far?",
          options: [
            { label: '🌟 Great', action: () => { setAnswers({ ...answers, vibe: 'Great' }); nextStep(); } },
            { label: '🙂 Pretty good', action: () => { setAnswers({ ...answers, vibe: 'Good' }); nextStep(); } },
            { label: '🥱 A bit sleepy', action: () => { setAnswers({ ...answers, vibe: 'Sleepy' }); nextStep(); } },
            { label: '☕ Need coffee', action: () => { setAnswers({ ...answers, vibe: 'Coffee' }); nextStep(); } },
          ]
        };
      case 2:
        let response = "I love hearing that. Let's make it even better.";
        if (answers.vibe === 'Sleepy') response = "Hopefully this wakes you up a little bit! 😂";
        if (answers.vibe === 'Coffee') response = "Noted. I legally owe you a coffee now. ☕";
        
        return {
          stepIndex: 2,
          type: 'message',
          title: 'Got it.',
          message: response,
          showContinue: true,
        };
      case 3:
        return {
          stepIndex: 3,
          type: 'slider',
          title: 'Self-Awareness Check',
          message: "On a scale of 1 to 10, how incredibly extra/nerdy is it that I made a mini-website just to say hi?",
        };
      case 4:
        let sliderRes = "You're too kind. I know it's at least a 7. 😂";
        if (answers.nerdScore >= 5) sliderRes = "Fair enough. I fully accept the judgment. 🤓";

        return {
          stepIndex: 4,
          type: 'message',
          title: 'Verdict:',
          message: sliderRes,
          showContinue: true,
        };
      case 5:
        return {
          stepIndex: 5,
          type: 'input',
          title: 'Important Question:',
          message: "If you could instantly master one completely random skill (no matter how useless), what would it be?",
        };
      case 6:
        return {
          stepIndex: 6,
          type: 'message',
          title: 'Wait, really?',
          message: `"${answers.skill || 'That'}"? I didn't see that coming, but I completely respect it.`,
          showContinue: true,
        };
      case 7:
        return {
          stepIndex: 7,
          type: 'message',
          title: 'Just saying...',
          message: "I have to admit... I've really enjoyed chatting with you so far. You have a really great energy about you.",
          showContinue: true,
        };
      case 8:
        return {
          stepIndex: 8,
          type: 'input',
          title: 'One more thing:',
          message: "What's one little thing that *always* makes you smile, no matter what?",
        };
      case 9:
        return {
          stepIndex: 9,
          type: 'options',
          title: 'Hypothetically...',
          message: "If we were to hang out sometime, what's your ideal vibe?",
          options: [
            { label: '☕ Chill coffee & talking', action: () => { nextStep(); } },
            { label: '🌮 Finding the best street food', action: () => { nextStep(); } },
            { label: '🎮 Friendly arcade competition', action: () => { nextStep(); } },
            { label: '🌳 A walk somewhere nice', action: () => { nextStep(); } },
          ]
        };
      case 10:
        triggerConfetti();
        return {
          stepIndex: 10,
          type: 'message',
          title: 'Noted. 📝',
          message: "Thanks for humoring me and playing along.\n\nI can't wait to learn more about you. Have an amazing rest of your day! 😊",
          showContinue: false,
        };
      default:
        return {
          stepIndex: 10,
          type: 'message',
          title: '',
          message: "You've reached the end!",
          showContinue: false,
        };
    }
  };

  const handleSliderSubmit = (val: number) => {
    setAnswers({ ...answers, nerdScore: val });
    nextStep();
  };

  const handleInputSubmit = (val: string) => {
    if (step === 5) {
      setAnswers({ ...answers, skill: val });
    } else if (step === 8) {
      setAnswers({ ...answers, smile: val });
    }
    nextStep();
  };

  return {
    currentStep: getStepData(),
    nextStep,
    handleSliderSubmit,
    handleInputSubmit,
  };
};
