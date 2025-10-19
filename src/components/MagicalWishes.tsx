import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Sparkles, Heart, Star } from 'lucide-react';

interface Wish {
  id: number;
  name: string;
  message: string;
  emoji: string;
}

export const MagicalWishes = () => {
  const [wishes, setWishes] = useState<Wish[]>([
    {
      id: 1,
      name: "The Sorting Hat",
      message: "May your 22nd year be filled with courage, wisdom, and magical adventures! 🎓",
      emoji: "🎩"
    },
    {
      id: 2,
      name: "Tanjiro Kamado",
      message: "Your kindness is like water breathing - gentle yet powerful. Happy Birthday! 🌊",
      emoji: "⚔️"
    }
  ]);

  const [newWish, setNewWish] = useState({ name: '', message: '' });

  const addWish = () => {
    if (newWish.name && newWish.message) {
      const emojis = ['✨', '🎂', '🎉', '💫', '🌟', '🎈'];
      setWishes([
        ...wishes,
        {
          id: Date.now(),
          name: newWish.name,
          message: newWish.message,
          emoji: emojis[Math.floor(Math.random() * emojis.length)]
        }
      ]);
      setNewWish({ name: '', message: '' });
    }
  };

  return (
    <section className="py-20 px-4 cursor-water">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl text-magical font-bold mb-4">
            Magical Wishes
          </h2>
          <p className="text-xl text-japanese text-muted-foreground">
            魔法の祝福 - Birthday Blessings
          </p>
        </div>

        {/* Wishes Display */}
        <div className="space-y-6 mb-12">
          {wishes.map((wish) => (
            <Card 
              key={wish.id} 
              className="magical-glow border-accent/20 bg-card/50 backdrop-blur-sm breathing-water"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{wish.emoji}</div>
                  <div className="flex-1">
                    <h3 className="font-cinzel font-semibold text-accent text-lg mb-2">
                      {wish.name}
                    </h3>
                    <p className="text-foreground font-noto-jp leading-relaxed">
                      {wish.message}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <Sparkles className="w-4 h-4 text-accent animate-pulse" />
                    <Heart className="w-4 h-4 text-destructive animate-pulse" />
                    <Star className="w-4 h-4 text-secondary animate-pulse" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add New Wish */}
        <Card className="magical-glow border-accent/20 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-8">
            <h3 className="text-2xl font-cinzel text-magical mb-6 text-center">
              Cast Your Birthday Spell
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-noto-jp font-medium text-accent mb-2">
                  Your Name
                </label>
                <Input
                  value={newWish.name}
                  onChange={(e) => setNewWish({ ...newWish, name: e.target.value })}
                  placeholder="Enter your name..."
                  className="bg-background/50 border-accent/30 focus:border-accent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-noto-jp font-medium text-accent mb-2">
                  Your Magical Message
                </label>
                <Textarea
                  value={newWish.message}
                  onChange={(e) => setNewWish({ ...newWish, message: e.target.value })}
                  placeholder="Write your birthday wish for Neha..."
                  className="bg-background/50 border-accent/30 focus:border-accent min-h-[120px]"
                />
              </div>
              
              <Button 
                onClick={addWish}
                className="btn-scroll w-full"
                disabled={!newWish.name || !newWish.message}
              >
                Send Birthday Magic ✨
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};