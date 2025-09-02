import { useEffect, useState } from 'react';
import { fetchProfile, ProfileData } from '@/lib/api';

export const Profile = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchProfile();
        setProfile(data);
      } catch (error) {
        console.error('Failed to load profile:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="container-retro p-4 md:p-8 mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
          <div className="flex-1">
            <div className="h-6 md:h-8 bg-muted mb-4 animate-pulse"></div>
            <div className="h-4 md:h-6 bg-muted mb-4 md:mb-6 w-32 md:w-48 animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-3 md:h-4 bg-muted animate-pulse"></div>
              <div className="h-3 md:h-4 bg-muted animate-pulse"></div>
              <div className="h-3 md:h-4 bg-muted w-3/4 animate-pulse"></div>
            </div>
          </div>
          <div className="hidden md:block w-48 h-48 bg-muted animate-pulse border-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container-retro p-8 mb-6">
        <p className="text-center text-muted-foreground">Failed to load profile</p>
      </div>
    );
  }

  return (
    <div className="container-retro p-4 md:p-8 mb-6">
      <div className="flex flex-col md:flex-row md:items-stretch gap-6 md:gap-8">
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-2xl md:text-4xl font-bold text-primary mb-2">
            {profile.name}
          </h1>
          <h2 className="text-lg md:text-xl text-accent-foreground mb-4 md:mb-6 font-semibold">
            {profile.title}
          </h2>
          <p className="text-sm md:text-base text-foreground leading-relaxed max-w-lg">
            {profile.bio}
          </p>
        </div>
        <div className="hidden md:block flex-shrink-0">
          <img
            src={profile.avatarUrl}
            alt={`${profile.name} - Profile Picture`}
            className="w-48 h-full object-cover"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
      </div>
    </div>
  );
};