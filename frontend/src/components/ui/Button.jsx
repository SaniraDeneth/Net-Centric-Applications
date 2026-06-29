import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-medium transition-all duration-300";
  
  const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)]",
    secondary: "bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 hover:border-zinc-700",
    google: "bg-white text-zinc-900 hover:bg-zinc-100 shadow-md",
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
