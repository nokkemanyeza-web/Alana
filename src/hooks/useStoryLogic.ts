import { useState } from 'react';

export type StepType = 'message' | 'options' | 'slider' | 'input';

export interface StoryState {
  stepIndex: number;
  type: StepType;
  title: string;
  message?: string;
  showContinue?: boolean;
  options?: { label: string; action: () => void }[];
}

export interface Answers {
  dayFeelings?: string;
  nerdScore?: number;
  skill?: string;
  smile?: string;
  vibe?: string;
  spontaneous?: string;
  teleport?: string;
  stressResponse?: string;
  textingStyle?: string;
  lookUpTo?: string;
  pineapplePizza?: string;
}

export const useStoryLogic = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const nextStep = () => {
    setStep(s => {
      const next = s + 1;
      if (next === 15) {
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
              subject: "New responses from Lana!",
              dayFeelings: answers.dayFeelings || 'Not answered',
              nerdScore: answers.nerdScore || 'Not answered',
              skill: answers.skill || 'Not answered',
              smile: answers.smile || 'Not answered',
              vibe: answers.vibe || 'Not answered',
              spontaneous: answers.spontaneous || 'Not answered',
              teleport: answers.teleport || 'Not answered',
              stressResponse: answers.stressResponse || 'Not answered',
              textingStyle: answers.textingStyle || 'Not answered',
              lookUpTo: answers.lookUpTo || 'Not answered',
              pineapplePizza: answers.pineapplePizza || 'Not answered',
            }),
          }).catch(err => console.error("Formspree error:", err));
        } else {
          console.log("No Formspree URL configured. Answers:", answers);
        }
      }
      return next;
    });
  };

  const handleInput = (key: keyof Answers, val: string | number) => {
    setAnswers(prev => ({ ...prev, [key]: val }));
    nextStep();
  };

  const getStepData = (currentStep: number): StoryState => {
    switch (currentStep) {
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
          type: 'input',
          title: "First things first...",
          message: "How is your day going so far? How are you feeling?",
        };
      case 2:
        return {
          stepIndex: 2,
          type: 'options',
          title: "I'm glad. ✨",
          message: "Now, are you ready for a quick vibe check?",
          options: [
            { label: "Yes, let's do it! 🌸", action: nextStep },
            { label: "I was born ready 😎", action: nextStep }
          ]
        };
      case 3:
        return {
          stepIndex: 3,
          type: 'slider',
          title: 'Question 1',
          message: "On a scale of 1 to 10, how much of a nerd do you think I am for building this mini website just to say hi? 🤓",
        };
      case 4:
        return {
          stepIndex: 4,
          type: 'input',
          title: 'Question 2',
          message: "If you could instantly upload any random skill into your brain right now, what would it be?",
        };
      case 5:
        return {
          stepIndex: 5,
          type: 'input',
          title: 'Question 3',
          message: "What is one little thing that always makes you smile?",
        };
      case 6:
        return {
          stepIndex: 6,
          type: 'options',
          title: 'Almost done with the vibe check...',
          message: "Pick the energy that matches you best today:",
          options: [
            { label: "Cozy & Chill ☕", action: () => handleInput('vibe', 'Cozy') },
            { label: "Ready to conquer the world ✨", action: () => handleInput('vibe', 'Conquer') },
            { label: "A little chaotic but cute 🌪️", action: () => handleInput('vibe', 'Chaotic') }
          ]
        };
      case 7:
        return {
          stepIndex: 7,
          type: 'message',
          title: 'Okay, calculating your vibe...',
          message: "But wait! Before I give you the final results, I have a few very important questions to ask you.",
          showContinue: true,
        };
      case 8:
        return {
          stepIndex: 8,
          type: 'options',
          title: "Let's be honest...",
          message: "Are you more of a spontaneous 'let's go on an adventure right now' type of person, or a 'let's plan it out and chill' person?",
          options: [
            { label: "Spontaneous Adventure 🚗", action: () => handleInput('spontaneous', 'Spontaneous') },
            { label: "Plan & Chill 🛋️", action: () => handleInput('spontaneous', 'Plan & Chill') }
          ]
        };
      case 9:
        return {
          stepIndex: 9,
          type: 'input',
          title: 'Teleportation',
          message: "If you could instantly teleport to anywhere in the world for the weekend, where are we going?",
        };
      case 10:
        return {
          stepIndex: 10,
          type: 'options',
          title: 'Stress Check',
          message: "When you're having a really stressful day, do you prefer someone to try and fix the problem, or do you just want someone to listen and validate you?",
          options: [
            { label: "Fix the problem 🛠️", action: () => handleInput('stressResponse', 'Fix problem') },
            { label: "Just listen to me 👂", action: () => handleInput('stressResponse', 'Just listen') }
          ]
        };
      case 11:
        return {
          stepIndex: 11,
          type: 'options',
          title: 'Communication',
          message: "Are you a big texter throughout the day, or do you prefer to catch up on everything later in the evening?",
          options: [
            { label: "Big texter 📱", action: () => handleInput('textingStyle', 'Big texter') },
            { label: "Catch up later 🌙", action: () => handleInput('textingStyle', 'Catch up later') }
          ]
        };
      case 12:
        return {
          stepIndex: 12,
          type: 'input',
          title: 'Role Models',
          message: "Who is someone in your life you look up to the most?",
        };
      case 13:
        return {
          stepIndex: 13,
          type: 'options',
          title: 'The Ultimate Dealbreaker',
          message: "Okay, serious question: Does pineapple belong on pizza?",
          options: [
            { label: "Yes, obviously 🍍", action: () => handleInput('pineapplePizza', 'Yes') },
            { label: "Absolutely not 🛑", action: () => handleInput('pineapplePizza', 'No') }
          ]
        };
      case 14:
        return {
          stepIndex: 14,
          type: 'message',
          title: 'You survived the interrogation! 🎉',
          message: "Here is a little something for you:\n\n\"Let all that you do be done in love.\"\n– 1 Corinthians 16:14\n\nThank you for humoring me and playing along! ✨",
          showContinue: true,
        };
      default:
        return {
          stepIndex: 15,
          type: 'message',
          title: 'Fin.',
          message: "You can close this page now! 😊",
        };
    }
  };

  const handleInputSubmit = (val: string | number) => {
    switch(step) {
      case 1: handleInput('dayFeelings', val); break;
      case 4: handleInput('skill', val); break;
      case 5: handleInput('smile', val); break;
      case 9: handleInput('teleport', val); break;
      case 12: handleInput('lookUpTo', val); break;
    }
  };

  const handleSliderSubmit = (val: number) => {
    if (step === 3) handleInput('nerdScore', val);
  };

  return {
    step,
    currentStep: getStepData(step),
    nextStep,
    handleSliderSubmit,
    handleInputSubmit
  };
};
