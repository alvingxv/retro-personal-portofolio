import { useEffect, useState } from 'react';
import { ComingSoon } from '@/components/ComingSoon';
import { fetchProjects, getFeatureConfig, Project, FeatureConfig } from '@/lib/api';

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [featureConfig, setFeatureConfig] = useState<FeatureConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [projectsData, config] = await Promise.all([
          fetchProjects(),
          getFeatureConfig('projects')
        ]);
        setProjects(projectsData);
        setFeatureConfig(config);
      } catch (error) {
        console.error('Failed to load projects data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleProjectClick = (project: Project) => {
    if (project.link && project.link.trim() !== '') {
      window.open(project.link, '_blank', 'noopener,noreferrer');
    }
  };

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'planned':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  if (loading) {
    return (
      <div className="container-retro p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-muted mb-6 w-32"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-muted h-48"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!featureConfig?.enabled) {
    return (
      <ComingSoon 
        title="Projects" 
        message={featureConfig?.comingSoonMessage || "Project showcases coming soon!"}
        icon="🛠️"
      />
    );
  }

  return (
    <div className="container-retro p-8">
      <h1 className="text-3xl font-bold text-primary mb-6">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className={`bg-card border-2 border-primary p-6 transition-all duration-150 ${
              project.link ? 'cursor-pointer hover:bg-secondary hover:transform hover:translate-x-1 hover:translate-y-1' : ''
            }`}
            style={{boxShadow: 'var(--shadow-pixel)'}}
            onClick={() => handleProjectClick(project)}
            role={project.link ? "button" : undefined}
            tabIndex={project.link ? 0 : undefined}
            onKeyDown={(e) => {
              if (project.link && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                handleProjectClick(project);
              }
            }}
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-semibold text-primary">{project.title}</h3>
              <span className={`px-2 py-1 text-xs font-semibold border rounded ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
            </div>
            
            <p className="text-foreground mb-4 leading-relaxed">{project.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech) => (
                <span 
                  key={tech} 
                  className="px-2 py-1 bg-accent text-accent-foreground text-xs font-semibold border border-primary"
                >
                  {tech}
                </span>
              ))}
            </div>

            {project.link && (
              <div className="flex items-center text-sm text-primary font-medium">
                <span>View Project</span>
                <span className="ml-1">→</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;