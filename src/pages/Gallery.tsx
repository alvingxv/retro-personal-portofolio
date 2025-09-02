import { useEffect, useState } from 'react';
import { ComingSoon } from '@/components/ComingSoon';
import { getFeatureConfig, FeatureConfig } from '@/lib/api';

const Gallery = () => {
  const [featureConfig, setFeatureConfig] = useState<FeatureConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeatureConfig = async () => {
      try {
        const config = await getFeatureConfig('gallery');
        setFeatureConfig(config);
      } catch (error) {
        console.error('Failed to load feature config:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFeatureConfig();
  }, []);

  if (loading) {
    return (
      <div className="container-retro p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-muted mb-6 w-32"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square bg-muted"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!featureConfig?.enabled) {
    return (
      <ComingSoon 
        title="Gallery" 
        message={featureConfig?.comingSoonMessage || "Gallery coming soon!"}
        icon="🖼️"
      />
    );
  }

  return (
    <div className="container-retro p-8">
      <h1 className="text-3xl font-bold text-primary mb-6">Gallery</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="aspect-square bg-card border-2 border-primary flex items-center justify-center" style={{boxShadow: 'var(--shadow-pixel)'}}>
            <div className="text-center">
              <div className="text-4xl mb-2">🖼️</div>
              <p className="text-xs text-muted-foreground">Image {i}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="text-center text-muted-foreground mt-8">
        Photography and creative work showcase!
      </p>
    </div>
  );
};

export default Gallery;