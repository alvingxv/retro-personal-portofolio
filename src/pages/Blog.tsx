import { useEffect, useState } from 'react';
import { ComingSoon } from '@/components/ComingSoon';
import { getFeatureConfig, FeatureConfig } from '@/lib/api';

const Blog = () => {
  const [featureConfig, setFeatureConfig] = useState<FeatureConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeatureConfig = async () => {
      try {
        const config = await getFeatureConfig('blog');
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
          <div className="h-8 bg-muted mb-6 w-24"></div>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-muted h-32"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!featureConfig?.enabled) {
    return (
      <ComingSoon 
        title="Blog" 
        message={featureConfig?.comingSoonMessage || "Blog coming soon!"}
        icon="📝"
      />
    );
  }

  const posts = [
    { id: 1, title: "Building Retro UIs with Modern Tech", date: "2024-03-15", excerpt: "How to combine pixel-perfect aesthetics with contemporary web development practices." },
    { id: 2, title: "The Art of Clean Code", date: "2024-03-10", excerpt: "Best practices for writing maintainable and readable code that stands the test of time." },
    { id: 3, title: "From Backend to Frontend", date: "2024-03-05", excerpt: "My journey as a full-stack developer and lessons learned along the way." }
  ];

  return (
    <div className="container-retro p-8">
      <h1 className="text-3xl font-bold text-primary mb-6">Blog</h1>
      <div className="space-y-6">
        {posts.map((post) => (
          <article key={post.id} className="bg-card border-2 border-primary p-6 hover:bg-secondary transition-colors duration-150" style={{boxShadow: 'var(--shadow-pixel)'}}>
            <h2 className="text-xl font-semibold text-primary mb-2">{post.title}</h2>
            <div className="text-sm text-muted-foreground mb-3">{post.date}</div>
            <p className="text-foreground">{post.excerpt}</p>
            <button className="btn-pixel mt-4 px-4 py-2 text-sm">
              Read More →
            </button>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blog;