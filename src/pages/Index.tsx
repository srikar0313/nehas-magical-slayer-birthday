import { GiftCard } from '@/components/GiftCard';
import { BirthdayHero } from '@/components/BirthdayHero';

const Index = () => {
  return (
    <div className="relative">
      {/* Birthday Hero with Video */}
      <BirthdayHero />
      
      {/* Gift Card */}
      <GiftCard />
    </div>
  );
};

export default Index;
