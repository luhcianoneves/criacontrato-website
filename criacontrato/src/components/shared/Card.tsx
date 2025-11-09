import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  highlight?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', highlight = false }) => {
  const highlightStyles = highlight ? 'border-brand-secondary border-2 ring-4 ring-indigo-100' : 'border-gray-200';
  
  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 md:p-8 border ${highlightStyles} ${className}`}>
      {children}
    </div>
  );
};

export default Card;