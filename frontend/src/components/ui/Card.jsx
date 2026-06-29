import React from 'react';

const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden ${className}`}>
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default Card;
