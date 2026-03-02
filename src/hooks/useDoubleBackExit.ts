import { useEffect } from 'react';

export function useDoubleBackExit() {
  useEffect(() => {
    let lastBackPressTime = 0;

    // Push initial state to trap the first back navigation
    window.history.pushState({ preventExit: true }, '');

    const handlePopState = () => {
      const currentTime = new Date().getTime();
      
      if (currentTime - lastBackPressTime < 2000) {
        // Second press within 2s - allow exit
        window.history.back();
      } else {
        // First press - block and warn
        window.history.pushState({ preventExit: true }, '');
        lastBackPressTime = currentTime;
        showRetentionToast();
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);
}

function showRetentionToast() {
  const toastId = 'elite-retention-toast';
  const existing = document.getElementById(toastId);
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = toastId;
  toast.className = 'fixed bottom-12 left-1/2 -translate-x-1/2 bg-[#0B1A30] text-white px-6 py-3 rounded-md text-sm font-medium tracking-wide border border-[#D4AF37]/40 shadow-[0_4px_20px_rgba(0,0,0,0.5)] z-[9999] opacity-0 transition-opacity duration-300 pointer-events-none text-center whitespace-nowrap';
  toast.innerText = 'Pressione voltar novamente para sair';
  
  document.body.appendChild(toast);
  
  // Trigger fade in
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
  });
  
  // Trigger fade out and cleanup
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}