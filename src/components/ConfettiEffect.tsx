import { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  rotation: number;
  rotationSpeed: number;
  fallSpeed: number;
  color: string;
  shape: 'circle' | 'square' | 'triangle';
}

export const ConfettiEffect = ({ trigger }: { trigger: boolean }) => {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (!trigger) return;

    const colors = ['#FFD700', '#9C27B0', '#006064', '#D84315', '#2E7D32'];
    const shapes: ('circle' | 'square' | 'triangle')[] = ['circle', 'square', 'triangle'];
    
    const newConfetti: ConfettiPiece[] = [];
    for (let i = 0; i < 100; i++) {
      newConfetti.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -10,
        rotation: 0,
        rotationSpeed: (Math.random() - 0.5) * 10,
        fallSpeed: Math.random() * 3 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)]
      });
    }
    
    setConfetti(newConfetti);

    const animateConfetti = () => {
      setConfetti(prev => 
        prev
          .map(piece => ({
            ...piece,
            y: piece.y + piece.fallSpeed,
            x: piece.x + Math.sin(piece.y * 0.01) * 0.5,
            rotation: piece.rotation + piece.rotationSpeed
          }))
          .filter(piece => piece.y < window.innerHeight + 100)
      );
    };

    const interval = setInterval(animateConfetti, 50);
    
    // Clear after 5 seconds
    const timeout = setTimeout(() => {
      setConfetti([]);
      clearInterval(interval);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [trigger]);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {confetti.map(piece => (
        <div
          key={piece.id}
          className={`absolute w-3 h-3 ${
            piece.shape === 'circle' ? 'rounded-full' :
            piece.shape === 'square' ? 'rounded-sm' :
            'w-0 h-0 border-l-[6px] border-r-[6px] border-b-[10px] border-l-transparent border-r-transparent'
          }`}
          style={{
            left: `${piece.x}px`,
            top: `${piece.y}px`,
            backgroundColor: piece.shape !== 'triangle' ? piece.color : 'transparent',
            borderBottomColor: piece.shape === 'triangle' ? piece.color : 'transparent',
            transform: `rotate(${piece.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
};