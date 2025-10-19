import { useState } from 'react';
import { SortingHat } from './SortingHat';
import { ConfettiEffect } from './ConfettiEffect';

export const BirthdayHero = () => {
  const [showConfetti, setShowConfetti] = useState(false);

  const triggerCelebration = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 100);
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative px-4 cursor-water">
      <ConfettiEffect trigger={showConfetti} />
      
      {/* Sorting Hat */}
      <SortingHat />
      
      {/* Main Birthday Message */}
      <div className="text-center space-y-6 max-w-4xl">
        <h1 
          className="text-6xl md:text-8xl lg:text-9xl text-magical font-bold leading-tight breathing-water"
          onClick={triggerCelebration}
        >
          Happy 22nd Birthday
        </h1>
        
        <h2 className="text-4xl md:text-6xl lg:text-7xl text-japanese text-secondary breathing-flame font-bold">
          Neha
        </h2>
        
        <div className="text-xl md:text-2xl text-muted-foreground font-noto-jp mt-8">
          <p className="breathing-water">October 28, 2025</p>
          <p className="text-accent font-cinzel mt-2">✨ A Magical Celebration ✨</p>
        </div>
      </div>

      {/* Magical Scroll Button */}
      <div className="mt-16 space-y-4">
        <button
          onClick={triggerCelebration}
          className="btn-scroll"
        >
          Cast Birthday Magic! 🪄
        </button>
        
        <p className="text-sm text-muted-foreground font-noto-jp">
          Press space to switch breathing techniques
        </p>
      </div>

      {/* Floating magical orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-4 h-4 rounded-full ${
              i % 2 === 0 ? 'bg-accent' : 'bg-secondary'
            } opacity-60`}
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 30}%`,
              animation: `magicalPulse ${3 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>
    </section>
  );
};