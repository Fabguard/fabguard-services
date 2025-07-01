
import { ReactNode } from "react";

interface GoldenLayoutProps {
  children: ReactNode;
  className?: string;
}

export const GoldenLayout = ({ children, className = "" }: GoldenLayoutProps) => {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-5 gap-8 ${className}`}>
      {/* 30% - 2 columns */}
      <div className="lg:col-span-2">
        {/* Primary content */}
      </div>
      {/* 60% - 3 columns */}
      <div className="lg:col-span-3">
        {/* Secondary content */}
      </div>
    </div>
  );
};

export const GoldenRatioContainer = ({ children, className = "" }: GoldenLayoutProps) => {
  return (
    <div className={`max-w-7xl mx-auto px-4 ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-8 gap-8">
        {/* Following 30-60-90 rule */}
        <div className="lg:col-span-2">
          {/* 30% space */}
        </div>
        <div className="lg:col-span-5">
          {/* 60% space */}
        </div>
        <div className="lg:col-span-1">
          {/* 10% space */}
        </div>
      </div>
      {children}
    </div>
  );
};
