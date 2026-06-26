import { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';

export type GameState = {
  clicks: number;
  emoji: string | null;
  message: string;
  buttonText: string;
  buttonState: 'normal' | 'wiggle' | 'away' | 'small' | 'huge' | 'hidden';
  screenShake: boolean;
  isFakeLoading: boolean;
  isBlackout: boolean;
  showDuck: boolean;
  isCrashed: boolean;
  showAchievement13: boolean;
  showFriendsPopup: boolean;
  isCalm: boolean;
  randomEvent: 'star' | 'cat' | 'duck' | 'cookie' | 'sparkles' | 'rainbow' | null;
  showAchievement25: boolean;
  showAchievement50: boolean;
};

const RANDOM_MESSAGES = [
  "You again? 😂",
  "I had a feeling you'd come back.",
  "This button is starting to feel appreciated.",
  "Still clicking? I respect the commitment.",
  "Curiosity level: Expert.",
  "Fun fact: This button now knows you better than I do.",
];

const RANDOM_EVENTS = ['star', 'cat', 'duck', 'cookie', 'sparkles', 'rainbow'] as const;

export const useGameLogic = () => {
  const [state, setState] = useState<GameState>({
    clicks: 0,
    emoji: '🤫',
    message: "This button definitely should NOT be pressed.",
    buttonText: "Don't Press Me",
    buttonState: 'normal',
    screenShake: false,
    isFakeLoading: false,
    isBlackout: false,
    showDuck: false,
    isCrashed: false,
    showAchievement13: false,
    showFriendsPopup: false,
    isCalm: false,
    randomEvent: null,
    showAchievement25: false,
    showAchievement50: false,
  });

  const [soundEnabled, setSoundEnabled] = useState(false);

  // Play basic sounds
  const playClickSound = useCallback(() => {
    if (!soundEnabled) return;
    // A real implementation would use small imported mp3/wav files
    // Since we don't have files right now, we can omit the actual play() or use a synthetic beep
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.1);
    } catch (e) {}
  }, [soundEnabled]);

  const playSuccessSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.setValueAtTime(1200, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.3);
    } catch (e) {}
  }, [soundEnabled]);

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const triggerFireworks = () => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff0000', '#00ff00', '#0000ff']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff0000', '#00ff00', '#0000ff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const handlePress = () => {
    playClickSound();
    
    setState(prev => {
      const nextClicks = prev.clicks + 1;
      let nextState: GameState = { ...prev, clicks: nextClicks, screenShake: false, randomEvent: null };

      // Random Event Logic (10% chance after click 15)
      if (nextClicks > 15 && Math.random() < 0.1) {
         nextState.randomEvent = RANDOM_EVENTS[Math.floor(Math.random() * RANDOM_EVENTS.length)];
      }

      switch (nextClicks) {
        case 1:
          nextState.buttonState = 'wiggle';
          nextState.emoji = null;
          nextState.message = "I literally just said don't press it.";
          nextState.buttonText = "Seriously...";
          break;
        case 2:
          nextState.buttonState = 'normal';
          nextState.screenShake = true;
          nextState.message = "So... we're ignoring instructions now? 😂";
          break;
        case 3:
          nextState.buttonState = 'away';
          nextState.message = "Hey! That's cheating.";
          break;
        case 4:
          nextState.buttonState = 'small';
          nextState.message = "Good luck clicking me now.";
          break;
        case 5:
          nextState.buttonState = 'huge';
          nextState.message = "Fine.\n\nHave your giant button.";
          break;
        case 6:
          nextState.buttonState = 'normal';
          triggerConfetti();
          playSuccessSound();
          nextState.message = "Congratulations!\n\nYou won absolutely nothing.";
          break;
        case 7:
          nextState.isFakeLoading = true;
          // Async update after 2 seconds handled below in useEffect/timeout
          break;
        case 8:
          nextState.isBlackout = true;
          break;
        case 9:
          nextState.showDuck = true;
          nextState.message = "Meet Gerald.\n\nHe's your emotional support duck.";
          break;
        case 10:
          nextState.showDuck = false;
          nextState.buttonText = "Okay...\nOne Last Time.";
          nextState.message = "";
          break;
        case 11:
          nextState.isCrashed = true;
          break;
        case 12:
          nextState.message = "At this point...\n\nI'm starting to admire your dedication.";
          nextState.buttonText = "Don't Press Me";
          break;
        case 13:
          triggerFireworks();
          playSuccessSound();
          nextState.showAchievement13 = true;
          break;
        case 14:
          nextState.showAchievement13 = false;
          nextState.showFriendsPopup = true;
          break;
        case 15:
          nextState.showFriendsPopup = false;
          nextState.isCalm = true;
          nextState.message = "Okay...\n\nYou win.\n\nThanks for making it all the way here.\n\nI hope this little website made you smile.\n\n❤️";
          nextState.buttonText = "Press Me";
          break;
        default:
          if (nextClicks === 25) {
             nextState.showAchievement25 = true;
             playSuccessSound();
          } else if (nextClicks === 50) {
             nextState.showAchievement50 = true;
             triggerFireworks();
             playSuccessSound();
          }
          nextState.message = RANDOM_MESSAGES[Math.floor(Math.random() * RANDOM_MESSAGES.length)];
          break;
      }

      return nextState;
    });
  };

  // Handle async state transitions (delays for specific clicks)
  useEffect(() => {
    if (state.isFakeLoading) {
      const timer = setTimeout(() => {
        setState(prev => ({
          ...prev,
          isFakeLoading: false,
          message: "Just kidding 😂"
        }));
      }, 2500);
      return () => clearTimeout(timer);
    }

    if (state.isBlackout) {
      const timer1 = setTimeout(() => {
        setState(prev => ({ ...prev, isBlackout: false, message: "BOO!" }));
        setTimeout(() => {
          setState(prev => ({ ...prev, message: "Sorry 😂" }));
        }, 1000);
      }, 700);
      return () => clearTimeout(timer1);
    }

    if (state.isCrashed) {
      const timer = setTimeout(() => {
        setState(prev => ({ ...prev, isCrashed: false }));
        // Move to click 12 automatically or wait for them? Instructions say:
        // "After three seconds everything restores automatically."
      }, 3000);
      return () => clearTimeout(timer);
    }
    
    if (state.showAchievement25) {
       const timer = setTimeout(() => {
         setState(prev => ({ ...prev, showAchievement25: false }));
       }, 4000);
       return () => clearTimeout(timer);
    }
  }, [state.isFakeLoading, state.isBlackout, state.isCrashed, state.showAchievement25]);

  return {
    state,
    handlePress,
    soundEnabled,
    setSoundEnabled,
    setState
  };
};
