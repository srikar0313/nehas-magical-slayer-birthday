import sortingHatImage from '../assets/sorting-hat.png';

export const SortingHat = () => {
  return (
    <div className="relative flex justify-center mb-8">
      <div className="sorting-hat magical-glow">
        <img 
          src={sortingHatImage} 
          alt="Magical Sorting Hat" 
          className="w-32 h-32 md:w-40 md:h-40 object-contain"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-accent/20 to-transparent rounded-full blur-xl"></div>
      </div>
      
      {/* Floating sparkles around the hat */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="sparkle w-2 h-2 bg-accent rounded-full"
            style={{
              left: `${20 + Math.cos(i * 45 * Math.PI / 180) * 60}%`,
              top: `${50 + Math.sin(i * 45 * Math.PI / 180) * 60}%`,
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};