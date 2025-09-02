import { useEffect, useState } from 'react';
import { fetchExperience, fetchConfig, Experience as ExperienceType } from '@/lib/api';

export const Experience = () => {
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);
  const [showSummary, setShowSummary] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [experienceData, config] = await Promise.all([
          fetchExperience(),
          fetchConfig()
        ]);
        setExperiences(experienceData);
        setShowSummary(config.experience.showSummary);
      } catch (error) {
        console.error('Failed to load experience data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const formatDate = (dateString: string) => {
    if (dateString === 'Present') return 'Present';
    const [year, month] = dateString.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  if (loading) {
    return (
      <div className="container-retro p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-bold text-primary mb-4">Work Experience</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 bg-secondary border border-primary animate-pulse">
              <div className="h-5 bg-muted mb-2 w-1/3"></div>
              <div className="h-4 bg-muted mb-2 w-1/2"></div>
              <div className="h-3 bg-muted mb-3 w-1/4"></div>
              <div className="h-3 bg-muted w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container-retro p-4 md:p-6">
      <h3 className="text-lg md:text-xl font-bold text-primary mb-4">Work Experience</h3>
      <div className="space-y-4">
        {experiences.map((experience, index) => (
          <div
            key={experience.id}
            className="p-4 bg-secondary border border-primary hover:bg-accent transition-colors duration-150 group"
            style={{ 
              boxShadow: '1px 1px 0px hsl(var(--pixel-shadow))',
              animationDelay: `${index * 100}ms`
            }}
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
              <div className="flex-1">
                <h4 className="text-base md:text-lg font-bold text-primary mb-1">
                  {experience.position}
                </h4>
                <div className="text-sm md:text-base font-semibold text-secondary-foreground mb-1">
                  {experience.company}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground">
                  {experience.location}
                </div>
              </div>
              <div className="text-xs md:text-sm text-muted-foreground mt-2 md:mt-0 md:text-right">
                {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
              </div>
            </div>
            {showSummary && (
              <p className="text-xs md:text-sm text-secondary-foreground leading-relaxed">
                {experience.summary}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
