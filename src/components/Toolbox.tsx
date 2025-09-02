import { useEffect, useState } from 'react';
import { fetchToolbox, ToolboxItem } from '@/lib/api';
import * as SimpleIcons from 'simple-icons';

export const Toolbox = () => {
  const [tools, setTools] = useState<ToolboxItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadToolbox = async () => {
      try {
        const data = await fetchToolbox();
        setTools(data);
      } catch (error) {
        console.error('Failed to load toolbox:', error);
      } finally {
        setLoading(false);
      }
    };

    loadToolbox();
  }, []);

  const getIcon = (iconName: string) => {
    try {
      // Get the icon from Simple Icons
      const icon = SimpleIcons[`si${iconName.charAt(0).toUpperCase() + iconName.slice(1)}` as keyof typeof SimpleIcons];
      if (icon && typeof icon === 'object' && 'svg' in icon) {
        return {
          svg: icon.svg,
          hex: icon.hex
        };
      }
    } catch (error) {
      console.warn(`Icon not found for ${iconName}`);
    }
    return null;
  };

  if (loading) {
    return (
      <div className="container-retro p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-bold text-primary mb-4">Toolbox</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <div key={i} className="text-center p-3 md:p-4 bg-secondary border border-primary animate-pulse">
              <div className="w-6 h-6 md:w-8 md:h-8 bg-muted mx-auto mb-2"></div>
              <div className="h-3 bg-muted"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container-retro p-4 md:p-6">
      <h3 className="text-lg md:text-xl font-bold text-primary mb-4">Toolbox</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {tools.map((tool, index) => (
          <div
            key={tool.name}
            className="text-center p-3 md:p-4 bg-secondary border border-primary hover:bg-accent transition-colors duration-150 group"
            style={{ 
              boxShadow: '1px 1px 0px hsl(var(--pixel-shadow))',
              animationDelay: `${index * 100}ms`
            }}
          >
            <div className="text-xl md:text-2xl mb-2 group-hover:animate-pixel-bounce flex justify-center items-center">
              {(() => {
                const iconData = getIcon(tool.icon);
                if (iconData) {
                  return (
                    <div 
                      className="w-6 h-6 md:w-8 md:h-8"
                      style={{ color: `#${iconData.hex}` }}
                      dangerouslySetInnerHTML={{ __html: iconData.svg }}
                    />
                  );
                }
                // Fallback to emoji/text if icon not found
                return <span className="text-base md:text-lg">{tool.icon}</span>;
              })()}
            </div>
            <div className="text-xs font-semibold text-primary">
              {tool.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};