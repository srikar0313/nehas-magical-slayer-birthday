import { useEffect, useState } from 'react';

interface Sticker {
  id: number;
  emoji: string;
  left: number;
  top: number;
  delay: number;
  duration: number;
}

export const FloatingStickers = () => {
  const [stickers, setStickers] = useState<Sticker[]>([]);

  useEffect(() => {
    // Mix of HP, Demon Slayer, and cute anime elements
    const stickerEmojis = ['✨', '🌸', '🦋', '⚡', '🔮', '🌙', '💫', '🎀', '🌺', '🪄', '⭐', '🎊'];
    
    const newStickers = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      emoji: stickerEmojis[Math.floor(Math.random() * stickerEmojis.length)],
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 4,
    }));

    setStickers(newStickers);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {stickers.map((sticker) => (
        <div
          key={sticker.id}
          className="absolute text-2xl opacity-20 animate-float-sticker"
          style={{
            left: `${sticker.left}%`,
            top: `${sticker.top}%`,
            animationDelay: `${sticker.delay}s`,
            animationDuration: `${sticker.duration}s`,
          }}
        >
          {sticker.emoji}
        </div>
      ))}
    </div>
  );
};
