import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', className, ...props }) => {
  const baseStyles = "relative px-8 py-4 font-bold tracking-wider transition-all duration-300 overflow-hidden group";
  
  const variants = {
    primary: "bg-purple-neon text-white hover:shadow-[0_0_20px_rgba(160,32,240,0.5)]",
    secondary: "border border-chrome-silver/30 text-chrome-silver hover:border-gold-line hover:text-gold-line"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className || ''}`}
      {...props}
    >
      <span className="relative z-10">{props.children}</span>
      
      {/* Metallic Shine Effect for Primary Button */}
      {variant === 'primary' && (
        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent w-full h-full z-0 pointer-events-none"></div>
      )}
    </button>
  );
};
