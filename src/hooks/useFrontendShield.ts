import { useEffect } from 'react';

export function useFrontendShield() {
  useEffect(() => {
    // 1. Bloqueio de Menu de Contexto (Botão Direito)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // 2. Trava de Engenharia Reversa e Atalhos (F12, Ctrl+Shift+I/J/C, Ctrl+U, Ctrl+C/S/P)
    const handleKeyDown = (e: KeyboardEvent) => {
      // Bloqueio do F12
      if (e.key === 'F12') {
        e.preventDefault();
      }

      if (e.ctrlKey) {
        // Bloqueio de cópia, salvar e imprimir
        if (e.key === 'c' || e.key === 'C' || e.key === 's' || e.key === 'S' || e.key === 'p' || e.key === 'P') {
          e.preventDefault();
        }
        // Bloqueio de exibição de código-fonte (Ctrl+U)
        if (e.key === 'u' || e.key === 'U') {
          e.preventDefault();
        }
      }

      // Bloqueio de atalhos de DevTools (Ctrl+Shift+I/J/C)
      if (e.ctrlKey && e.shiftKey) {
        if (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c') {
          e.preventDefault();
        }
      }
    };

    // 3. Trava de Arraste de Elementos
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
    };

    // 4. Verificação de Domínio (Domain Lock)
    const allowedDomains = ['localhost', '127.0.0.1', 'agencia-marketelli.vercel.app'];
    const currentDomain = window.location.hostname;
    const isAllowed = allowedDomains.some(domain => currentDomain.includes(domain));

    if (!isAllowed) {
      window.location.href = 'about:blank';
    }

    // Montagem dos Listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('dragstart', handleDragStart);

    // Limpeza na desmontagem
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dragstart', handleDragStart);
    };
  }, []);
}
