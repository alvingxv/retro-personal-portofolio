import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex items-center justify-center min-h-full">
      <div className="text-center container-retro p-8">
        <div className="text-8xl mb-6">🚧</div>
        <h1 className="text-4xl font-bold text-primary mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-4">Oops! Page not found</p>
        <a href="/" className="btn-pixel px-6 py-3 text-sm">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
