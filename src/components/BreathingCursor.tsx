import { useEffect, useState } from 'react';

interface CursorTrail {
  id: number;
  x: number;
  y: number;
  opacity: number;
  type: 'water' | 'flame';
}

export const BreathingCursor = () => {
  const [trails, setTrails] = useState<CursorTrail[]>([]);
  const [cursorType, setCursorType] = useState<'water' | 'flame'>('water');

  useEffect(() => {
    let trailId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const newTrail: CursorTrail = {
        id: trailId++,
        x: e.clientX,
        y: e.clientY,
        opacity: 1,
        type: cursorType
      };

      setTrails(prev => [...prev.slice(-10), newTrail]);
    };

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        setCursorType(prev => prev === 'water' ? 'flame' : 'water');
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('keypress', handleKeyPress);

    // Fade out trails
    const fadeInterval = setInterval(() => {
      setTrails(prev => 
        prev
          .map(trail => ({ ...trail, opacity: trail.opacity - 0.1 }))
          .filter(trail => trail.opacity > 0)
      );
    }, 50);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('keypress', handleKeyPress);
      clearInterval(fadeInterval);
    };
  }, [cursorType]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {trails.map(trail => (
        <div
          key={trail.id}
          className={`absolute w-4 h-4 rounded-full ${
            trail.type === 'water' 
              ? 'bg-secondary border-2 border-secondary/50' 
              : 'bg-destructive border-2 border-destructive/50'
          }`}
          style={{
            left: trail.x - 8,
            top: trail.y - 8,
            opacity: trail.opacity,
            transform: `scale(${trail.opacity})`,
            boxShadow: trail.type === 'water' 
              ? '0 0 20px hsl(190 85% 45%)' 
              : '0 0 20px hsl(15 85% 55%)',
            transition: 'all 0.1s ease-out'
          }}
        />
      ))}
    </div>
  );
};