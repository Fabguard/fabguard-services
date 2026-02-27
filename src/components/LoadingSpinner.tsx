
import { useState, useEffect } from "react";

const LoadingSpinner = () => {
  const [showRetry, setShowRetry] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowRetry(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="text-muted-foreground text-sm">Loading services...</p>
        {showRetry && (
          <div className="space-y-2 animate-in fade-in">
            <p className="text-muted-foreground text-xs">Taking longer than usual?</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-5 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:opacity-90 transition-opacity"
            >
              Reload Page
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingSpinner;
