import { useEffect, useState } from 'react';

interface Balloon {
  id: number;
  color: string;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

export const FloatingBalloons = () => {
  const [balloons, setBalloons] = useState<Balloon[]>([]);

  useEffect(() => {
    const colors = [
      'hsl(340, 75%, 65%)',  // primary
      'hsl(280, 50%, 75%)',  // secondary
      'hsl(45, 60%, 70%)',   // accent
      'hsl(320, 70%, 70%)',  // pink variant
    ];
    
    const newBalloons = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      color: colors[Math.floor(Math.random() * colors.length)],
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 12 + Math.random() * 6,
      size: 30 + Math.random() * 20,
    }));

    setBalloons(newBalloons);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {balloons.map((balloon) => (
        <div
          key={balloon.id}
          className="absolute animate-float-balloon"
          style={{
            left: `${balloon.left}%`,
            bottom: '-10%',
            animationDelay: `${balloon.delay}s`,
            animationDuration: `${balloon.duration}s`,
          }}
        >
          {/* Balloon body */}
          <div
            className="relative rounded-full opacity-60 shadow-lg"
            style={{
              width: `${balloon.size}px`,
              height: `${balloon.size * 1.2}px`,
              backgroundColor: balloon.color,
              animation: 'sway 3s ease-in-out infinite',
              animationDelay: `${balloon.delay}s`,
            }}
          >
            {/* Balloon highlight */}
            <div
              className="absolute top-2 left-2 rounded-full bg-white opacity-40"
              style={{
                width: `${balloon.size * 0.3}px`,
                height: `${balloon.size * 0.3}px`,
              }}
            />
          </div>
          
          {/* String */}
          <div
            className="absolute left-1/2 top-full w-0.5 bg-current opacity-40"
            style={{
              height: `${balloon.size * 0.8}px`,
              transform: 'translateX(-50%)',
              color: balloon.color,
            }}
          />
        </div>
      ))}
    </div>
  );
};
