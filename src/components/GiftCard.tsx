import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Upload, Heart, Sparkles, Music, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/hooks/use-toast';
import { ConfettiEffect } from './ConfettiEffect';
import { FloatingStickers } from './FloatingStickers';
import { FloatingBalloons } from './FloatingBalloons';

const photoSlots = [
  { id: 1, placeholder: 'Memory 1' },
  { id: 2, placeholder: 'Memory 2' },
  { id: 3, placeholder: 'Memory 3' },
  { id: 4, placeholder: 'Memory 4' },
  { id: 5, placeholder: 'Memory 5' },
  { id: 6, placeholder: 'Memory 6' },
];

export const GiftCard = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);
  const [uploadedVideo, setUploadedVideo] = useState<string | null>(null);
  const [videoLoading, setVideoLoading] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedPhoto(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedVideo(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const totalPages = 3; // Cover, Quote/Video, Message

  const flipToNext = () => {
    if (currentPage < totalPages - 1 && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setIsFlipping(false);
      }, 700);
    }
  };

  const flipToPrev = () => {
    if (currentPage > 0 && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setIsFlipping(false);
      }, 700);
    }
  };

  const handleCoverClick = () => {
    setShowConfetti(true);
    flipToNext();
  };

  // Touch/Swipe handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe && currentPage < totalPages - 1) {
      flipToNext();
    }
    
    if (isRightSwipe && currentPage > 0) {
      flipToPrev();
    }
    
    // Reset
    setTouchStart(0);
    setTouchEnd(0);
  };


  // Reset video loading state when page changes
  useEffect(() => {
    if (currentPage === 1) {
      setVideoLoading(true);
    }
  }, [currentPage]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative bg-gradient-to-br from-background via-card to-muted/30">
      <FloatingStickers />
      <FloatingBalloons />
      {showConfetti && <ConfettiEffect trigger={showConfetti} />}
      
      {/* Hidden audio element for sound effect */}
      <audio ref={audioRef} src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYHG2a67OiaUQwOVqnl8LJeGAU7kdjyy3ksBy15yPDekEIJFF607eutWBQKSKHh8rpqHgUrgs3y2og2BhtmuvDpmlEMDVao5fCxXRgGPJHY8sp5LQUBN3vI8N2QQQkTbrbv7K1aFApIouHyumweBSyBzvLajDYHGmW77OmaUQwMV6nl8LFeGAY+ktjyx3lsBy16yPDekEIJEm627+ysWhQJSKHh8rprHgUrg87y2ogzBhtlvOzpmlEMDFap5fKyXRcGPpLZ88d5KwYseLvv3pBBCRJtt+/trVoUCkei4fK7bB4FK4PO8tuJMQYbZL3s6ZtRCw1Wq+TysmAdBzyT2fPIeisGLHm78N2RQQkSbrfv7a1aFApGouHyu2wdBSuEzvLbiDEGHGO77OmcUQ0OVqvm8rJgHgY9k9nzyHosBy16uvDdkUEJEm237+ysWhQJR6Lh8rttHgUrg87y24kxBh1ivO3pm1ENDlSs5fKzYB0GPZPZ88h6KwYteLrw3ZFBCRJuvO/srVsUCUej4fK7bR4FK4TO8tuJMQUcYbzu6p1RDQ5Eq+XytGAbBj+U2fPIeSwGLXe68N+RQAoSb73w7K1aFAlHo+LyvWwdBSuEzvPcizIFHGC877qeUQ0PU63k8LRfGwY/ldrzyXorBi12u/DflkALEnC98OytWhQJR6Pi8rxsHQYrhM7z24kxBRtfvO66n1ENDlOt5fC1YBoGQJXa88l6KgUsdbrx4JdADBBwvfDtrVkUB0ak4fO9bR0FK4TO89yKMgUbXr3t651PDw5TruXwtWAbBkGV2vLKeioGLHS78eCXQQsQcL7w7K1ZFOVUB0ak4vO9bh0FK4XO89uLMgUaXL3t651PDQ5QruXwtl8aBkCW2vLKeSkGLHO88eGYQQsQcr7w7K1ZFAVHpOLzvmwdBSuFzvTbiTIFF1298OueUQ0OU67k8LVfGgZAltryynoqBityu/PhmUILEHK+8O2uWhQFR6Ti8751HQYshM7z24kzBRddvO/qnlENDlCu5fC1YBsGQZba8sp6KgYrcbvz4plBCxByu/DtrlsUBUek4vK+dR0HLIXOs9uJNAUWXLvw6p5RDQ9RruXwtmAbBkGX2vLJeisGKnC68+OZQAsSc7vw7a9bFAVHpeLyvnYdByyGzvPchzQEFly77OmfUA0PUa/l8LZgHAZCmNvyyXkrBipwuvPjmUALE3O78e+vXBQER6Xj8r52HgcshsrzzwlEHC88eOaQAsTdL3y7q9cFAREp+Lzv3UeByyHzfPbiDMEFVu67OiRUAsPUbDl8bRgHAVCl9ryyXosB2pwuvPimkALE3O78O+vXBQER6Xj8r52Hgcshs3z24gyBRJcuu3pnVANDlKw5fG2YBwFQpfb88p6LAdqb7rz4ZpACxNzv/DwrmwUBUWm4/O/dx8GLIbN89uJMQQRW7ru6p5RDRA9AAAAVAAAAAEAAAABAAAAAgAAAAIAAAADAAAAAwAAAAMAAAADAAAAAwAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAQEAAAABAAAAAQAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=" />
      
      
      <div className="relative w-full max-w-4xl aspect-[4/3] z-10">
        {/* Navigation Buttons - Hidden on first page */}
        {currentPage > 0 && (
          <Button
            onClick={flipToPrev}
            className="absolute -left-4 md:left-4 top-1/2 -translate-y-1/2 z-50 btn-elegant shadow-lg"
            size="icon"
            disabled={isFlipping}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
        )}
        
        {currentPage > 0 && currentPage < totalPages - 1 && (
          <Button
            onClick={flipToNext}
            className="absolute -right-4 md:right-4 top-1/2 -translate-y-1/2 z-50 btn-elegant shadow-lg"
            size="icon"
            disabled={isFlipping}
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        )}

        {/* Card Container with swipe support */}
        <div 
          className="relative w-full h-full"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative w-full h-full">
            {/* Page 0: Cover */}
            <div
              className={`card-page absolute inset-0 transition-all duration-700 ease-out ${
                currentPage === 0 
                  ? 'opacity-100 scale-100 z-10' 
                  : currentPage > 0
                  ? 'scale-90 -translate-x-full z-0'
                  : 'scale-90 translate-x-full z-0'
              }`}
              onClick={currentPage === 0 ? handleCoverClick : undefined}
              style={{ cursor: currentPage === 0 ? 'pointer' : 'default', pointerEvents: currentPage === 0 ? 'auto' : 'none' }}
            >
              <div className="h-full flex flex-col items-center justify-center p-8 md:p-16 bg-gradient-to-br from-white via-primary/5 to-secondary/10 rounded-3xl soft-glow border-2 border-primary/20 relative overflow-hidden group transition-all duration-500 hover:shadow-2xl hover:border-primary/30 active:scale-95">
                {/* Decorative corners with anime stickers */}
                <div className="absolute top-6 left-6 text-3xl animate-bounce-slow">⚡</div>
                <div className="absolute top-6 right-6 text-3xl animate-bounce-slow" style={{ animationDelay: '0.5s' }}>🌸</div>
                <div className="absolute bottom-6 left-6 text-3xl animate-bounce-slow" style={{ animationDelay: '1s' }}>🔮</div>
                <div className="absolute bottom-6 right-6 text-3xl animate-bounce-slow" style={{ animationDelay: '1.5s' }}>🦋</div>
                
                {/* Center stickers */}
                <div className="absolute top-1/4 left-1/4 text-2xl opacity-30 rotate-12">🪄</div>
                <div className="absolute top-1/3 right-1/4 text-2xl opacity-30 -rotate-12">💫</div>
                
                <div className="shimmer inline-block mb-6 relative">
                  <Sparkles className="w-20 h-20 text-primary drop-shadow-lg" />
                </div>
                
                <h1 className="text-5xl md:text-7xl text-elegant font-playfair mb-4 text-center relative">
                  Happy 22nd Birthday
                  <span className="absolute -top-6 -right-6 text-3xl">✨</span>
                </h1>
                
                <div className="flex items-center gap-3 my-4">
                  <div className="w-16 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
                  <Star className="w-6 h-6 text-accent fill-accent" />
                  <div className="w-16 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
                </div>
                
                <h2 className="text-6xl md:text-8xl font-dancing text-primary mb-6 relative">
                  Neha
                  <span className="absolute -bottom-4 -left-4 text-2xl">🎀</span>
                  <span className="absolute -top-4 -right-4 text-2xl">🌺</span>
                </h2>
                
                <p className="text-base md:text-lg text-muted-foreground font-montserrat text-center max-w-md mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  Click to open your magical gift card ✨
                </p>
                
                {/* Music note decoration */}
                <div className="absolute bottom-12 right-12 opacity-20">
                  <Music className="w-8 h-8 text-secondary" />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none"></div>
              </div>
            </div>

            {/* Page 1: Video Page */}
            <div
              className={`card-page absolute inset-0 transition-all duration-700 ease-out ${
                currentPage === 1 
                  ? 'opacity-100 scale-100 z-10' 
                  : currentPage > 1
                  ? 'scale-90 -translate-x-full z-0'
                  : 'scale-90 translate-x-full z-0'
              }`}
              style={{ pointerEvents: currentPage === 1 ? 'auto' : 'none' }}
            >
              <div className="h-full p-4 md:p-6 bg-gradient-to-br from-white via-secondary/5 to-accent/10 rounded-3xl soft-glow border-2 border-primary/10 flex flex-col items-center justify-center relative overflow-hidden">
                
                <div className="w-full h-full flex items-center justify-center relative z-10">
                  {/* Video display area - maximized */}
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div className="relative w-full h-full max-h-[85vh]">
                      {/* Video container - full width */}
                      <div className="relative w-full h-full">
                        <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black border-2 border-primary/20 shadow-2xl">
                          {/* Video element */}
                          <video 
                            ref={videoRef}
                            src="/birthday-video.mp4"
                            controls
                            playsInline
                            preload="auto"
                            className="w-full h-full rounded-2xl object-cover shadow-lg"
                            onError={(e) => {
                              console.error('Video error:', e);
                              toast({
                                title: "Video unavailable",
                                description: "The birthday video couldn't be loaded.",
                                variant: "destructive",
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Page 2: Birthday Message */}
            <div
              className={`card-page absolute inset-0 transition-all duration-700 ease-out ${
                currentPage === 2 
                  ? 'opacity-100 scale-100 z-10' 
                  : currentPage > 2
                  ? 'scale-90 -translate-x-full z-0'
                  : 'scale-90 translate-x-full z-0'
              }`}
              style={{ pointerEvents: currentPage === 2 ? 'auto' : 'none' }}
            >
              <div className="h-full p-8 md:p-16 bg-gradient-to-br from-white via-accent/5 to-primary/10 rounded-3xl soft-glow border-2 border-primary/10 flex flex-col items-center justify-center relative overflow-hidden animate-slide-in-right">
                {/* Scattered decorative stickers */}
                <div className="absolute top-12 left-12 text-3xl opacity-20 rotate-12">⚡</div>
                <div className="absolute top-16 right-16 text-3xl opacity-20 -rotate-12">🌸</div>
                <div className="absolute bottom-20 left-20 text-3xl opacity-20 rotate-45">🔮</div>
                <div className="absolute bottom-16 right-12 text-3xl opacity-20 -rotate-45">🦋</div>
                <div className="absolute top-1/2 left-12 text-2xl opacity-15">🪄</div>
                <div className="absolute top-1/2 right-12 text-2xl opacity-15">💫</div>
                
                {/* Floating hearts */}
                {[...Array(8)].map((_, i) => (
                  <Heart
                    key={i}
                    className="absolute w-4 h-4 text-primary/10"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      transform: `rotate(${Math.random() * 360}deg)`,
                    }}
                  />
                ))}
                
                <div className="text-center space-y-6 max-w-2xl relative z-10">
                  <div className="flex justify-center gap-3">
                    <Sparkles className="w-16 h-16 text-primary shimmer" />
                    <Star className="w-16 h-16 text-accent fill-accent shimmer" style={{ animationDelay: '0.5s' }} />
                    <Sparkles className="w-16 h-16 text-secondary shimmer" style={{ animationDelay: '1s' }} />
                  </div>
                  
                  <h2 className="text-4xl md:text-6xl text-elegant font-playfair flex items-center justify-center gap-3">
                    <span className="text-3xl">✨</span>
                    Wishing You Magic
                    <span className="text-3xl">✨</span>
                  </h2>
                  
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-20 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
                    <span className="text-2xl">🎂</span>
                    <div className="w-20 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-primary/10 via-secondary/5 to-primary/10 p-8 md:p-10 rounded-2xl border-2 border-primary/20 relative">
                    <div className="absolute -top-4 -left-4 text-3xl">🎀</div>
                    <div className="absolute -top-4 -right-4 text-3xl">🌺</div>
                    
                    <p className="text-base md:text-lg text-foreground/80 leading-relaxed font-montserrat mb-4">
                      May your 22nd year be filled with endless joy, beautiful surprises, 
                      and all the love your heart can hold. Just like your favorite anime characters, 
                      may you have the courage to chase your dreams and the magic to make them come true! ✨
                    </p>
                    
                    <p className="text-base md:text-lg text-foreground/80 leading-relaxed font-montserrat">
                      Here's to new adventures, cherished moments, and memories that shine 
                      brighter than any spell or power! 🌟
                    </p>
                    
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-3xl">💝</div>
                  </div>
                  
                  <p className="text-2xl md:text-3xl font-dancing text-primary flex items-center justify-center gap-2">
                    <span>🥂</span>
                    Cheers to another amazing year!
                    <span>🎊</span>
                  </p>
                  
                  <div className="pt-6 flex flex-col items-center gap-2">
                    <p className="text-sm text-muted-foreground font-montserrat flex items-center gap-2">
                      Made with
                      <Heart className="w-4 h-4 text-primary fill-primary inline animate-pulse" />
                      just for you
                    </p>
                    <div className="flex gap-2 text-xl">
                      <span className="animate-bounce-slow">⚡</span>
                      <span className="animate-bounce-slow" style={{ animationDelay: '0.2s' }}>✨</span>
                      <span className="animate-bounce-slow" style={{ animationDelay: '0.4s' }}>🌸</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (!isFlipping && idx !== currentPage) {
                  setIsFlipping(true);
                  setTimeout(() => {
                    setCurrentPage(idx);
                    setIsFlipping(false);
                  }, 700);
                }
              }}
              className={`h-2 rounded-full transition-all ${
                idx === currentPage 
                  ? 'bg-primary w-8' 
                  : 'bg-primary/30 w-2 hover:bg-primary/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
