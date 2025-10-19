import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Image, Video } from 'lucide-react';

export const MediaGallery = () => {
  const [activeTab, setActiveTab] = useState<'photos' | 'videos'>('photos');

  return (
    <section className="min-h-screen py-20 px-4 cursor-flame">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl text-magical font-bold mb-4">
            Memory Vault
          </h2>
          <p className="text-xl text-japanese text-muted-foreground">
            魔法の思い出 - Magical Memories
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('photos')}
              className={`btn-scroll flex items-center gap-2 ${
                activeTab === 'photos' ? 'opacity-100' : 'opacity-60'
              }`}
            >
              <Image size={20} />
              Photo Memories
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`btn-katana flex items-center gap-2 ${
                activeTab === 'videos' ? 'opacity-100' : 'opacity-60'
              }`}
            >
              <Video size={20} />
              Video Memories
            </button>
          </div>
        </div>

        {/* Gallery Content */}
        <div className="breathing-water">
          {activeTab === 'photos' ? <PhotoGallery /> : <VideoGallery />}
        </div>

        {/* Upload Section */}
        <div className="mt-16 text-center">
          <Card className="magical-glow border-accent/20 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <Upload className="w-16 h-16 text-accent mx-auto mb-4" />
              <h3 className="text-2xl font-cinzel text-magical mb-4">
                Upload Your Magical Memories
              </h3>
              <p className="text-muted-foreground font-noto-jp mb-6">
                Share photos and videos to add to Neha's birthday collection
              </p>
              <Button className="btn-scroll">
                Choose Files to Upload
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

const PhotoGallery = () => {
  // Placeholder for photos - will be populated when user uploads
  const placeholderPhotos = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    title: `Memory ${i + 1}`,
    placeholder: true
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {placeholderPhotos.map((photo) => (
        <Card key={photo.id} className="group magical-glow border-accent/20 bg-card/50 backdrop-blur-sm overflow-hidden">
          <CardContent className="p-0">
            <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <div className="text-center">
                <Image className="w-12 h-12 text-accent/60 mx-auto mb-2" />
                <p className="text-muted-foreground font-noto-jp text-sm">
                  {photo.title}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const VideoGallery = () => {
  // Placeholder for videos - will be populated when user uploads
  const placeholderVideos = Array.from({ length: 4 }, (_, i) => ({
    id: i,
    title: `Video Memory ${i + 1}`,
    placeholder: true
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {placeholderVideos.map((video) => (
        <Card key={video.id} className="group magical-glow border-accent/20 bg-card/50 backdrop-blur-sm overflow-hidden">
          <CardContent className="p-0">
            <div className="aspect-video bg-gradient-to-br from-secondary/20 to-destructive/20 flex items-center justify-center">
              <div className="text-center">
                <Video className="w-16 h-16 text-accent/60 mx-auto mb-2" />
                <p className="text-muted-foreground font-noto-jp">
                  {video.title}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};