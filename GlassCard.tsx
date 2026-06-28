import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  onClick,
  hoverEffect = false 
}) => {
  return (
    <div 
      onClick={onClick}
      className={`bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-sm p-6 ${
        hoverEffect ? 'hover:shadow-md hover:border-blue-300 transition-all cursor-pointer' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
