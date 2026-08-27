import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '',
  isLoading = false,
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
      className={`${baseStyles} ${variants[variant]} ${widthStyle} ${className} ${(isLoading || props.disabled) ? 'opacity-70 cursor-not-allowed' : ''}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;
