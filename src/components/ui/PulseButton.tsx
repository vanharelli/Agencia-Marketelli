import React from 'react';

interface PulseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const PulseButton: React.FC<PulseButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <button 
      className={`
        relative group overflow-hidden px-10 py-5
        border border-[#E5E4E2] text-[#E5E4E2] font-bold tracking-[0.2em]
        bg-transparent transition-all duration-500
        hover:border-[#A020F0] hover:text-white
        hover:shadow-[0_0_30px_rgba(160,32,240,0.5),inset_0_0_20px_rgba(160,32,240,0.2)]
        active:scale-95
        ${className}
      `}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
      
      {/* Background Fill on Hover */}
      <div className="absolute inset-0 bg-[#A020F0]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Moving Shine Effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent w-full h-full z-0 pointer-events-none"></div>
    </button>
  );
};
