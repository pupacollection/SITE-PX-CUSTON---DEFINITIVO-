import React from 'react';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';
import { WifiOff } from 'lucide-react';

export const OfflineBanner: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed top-16 left-0 right-0 z-50 bg-[#FF1A2D] text-white text-xs font-semibold px-4 py-2 flex items-center justify-center gap-2 shadow-lg animate-pulse">
      <WifiOff className="w-4 h-4" />
      <span>Modo Offline — Ingressos salvos no dispositivo continuam acessíveis. Pagamentos requerem internet.</span>
    </div>
  );
};
