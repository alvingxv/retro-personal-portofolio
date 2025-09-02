import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { fetchNavigation, NavItem } from '@/lib/api';

export const Sidebar = () => {
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const loadNavigation = async () => {
      try {
        const items = await fetchNavigation();
        setNavItems(items);
      } catch (error) {
        console.error('Failed to load navigation:', error);
      } finally {
        setLoading(false);
      }
    };

    loadNavigation();
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const NavContent = () => (
    <>
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex-1 md:flex-1 border-b border-primary last:border-b-0 p-4 flex flex-col items-center justify-center transition-all duration-150 hover:bg-nav-hover hover:transform hover:translate-x-1 hover:translate-y-1 hover:shadow-pixel-sm ${
              isActive 
                ? 'bg-nav-active text-accent-foreground shadow-pixel-inset' 
                : 'bg-secondary text-primary hover:bg-nav-hover'
            }`}
            style={{
              boxShadow: isActive ? 'var(--shadow-inset)' : '1px 1px 0px hsl(var(--pixel-shadow))'
            }}
          >
            <div className="text-3xl mb-3 transition-transform duration-200 group-hover:animate-pixel-bounce">
              {item.icon}
            </div>
            <div className="text-xs font-semibold leading-tight text-center">
              {item.title}
            </div>
          </Link>
        );
      })}
    </>
  );

  if (loading) {
    return (
      <>
        {/* Mobile Hamburger Button */}
        <button className="md:hidden fixed top-4 left-4 z-50 p-2 bg-secondary border-2 border-primary" style={{boxShadow: 'var(--shadow-pixel)'}}>
          <div className="w-6 h-6 flex flex-col justify-center space-y-1">
            <div className="w-full h-0.5 bg-primary"></div>
            <div className="w-full h-0.5 bg-primary"></div>
            <div className="w-full h-0.5 bg-primary"></div>
          </div>
        </button>

        {/* Desktop Sidebar */}
        <aside className="hidden md:flex w-40 bg-secondary border-r-2 border-primary h-screen flex-col flex-shrink-0">
          <div className="flex-1 flex flex-col">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex-1 border-b border-primary last:border-b-0 p-4 flex flex-col items-center justify-center animate-pulse">
                <div className="w-8 h-8 bg-muted mb-2"></div>
                <div className="h-3 bg-muted w-16"></div>
              </div>
            ))}
          </div>
        </aside>
      </>
    );
  }

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button 
        onClick={toggleMobileMenu}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-secondary border-2 border-primary hover:bg-nav-hover transition-colors duration-150"
        style={{boxShadow: 'var(--shadow-pixel)'}}
        aria-label="Toggle navigation menu"
      >
        <div className="w-6 h-6 flex flex-col justify-center space-y-1">
          <div className={`w-full h-0.5 bg-primary transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
          <div className={`w-full h-0.5 bg-primary transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
          <div className={`w-full h-0.5 bg-primary transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
        </div>
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50" onClick={toggleMobileMenu}>
          <aside className="w-40 bg-secondary border-r-2 border-primary h-screen flex flex-col animate-slide-in-left">
            <nav className="flex-1 flex flex-col">
              <NavContent />
            </nav>
          </aside>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-40 bg-secondary border-r-2 border-primary h-screen flex-col flex-shrink-0">
        <nav className="flex-1 flex flex-col">
          <NavContent />
        </nav>
      </aside>
    </>
  );
};