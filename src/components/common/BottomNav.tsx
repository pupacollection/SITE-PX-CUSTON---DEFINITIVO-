import React from 'react';
import { ActiveScreen } from '../../types';
import { Home, Calendar, Ticket, User, QrCode } from 'lucide-react';

interface BottomNavProps {
  currentScreen: ActiveScreen;
  onNavigate: (screen: ActiveScreen) => void;
  isOperator?: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentScreen,
  onNavigate,
  isOperator = true,
}) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0c0c0c]/95 backdrop-blur-lg border-t border-[#1c1c1c] px-2 py-2 flex items-center justify-around">
      <button
        onClick={() => onNavigate('home')}
        className={`flex flex-col items-center justify-center flex-1 py-1 transition ${
          currentScreen === 'home' ? 'text-[#FF1A2D]' : 'text-zinc-500 hover:text-zinc-300'
        }`}
      >
        <Home className="w-5 h-5 mb-0.5" />
        <span className="text-[10px] font-semibold">Início</span>
      </button>

      <button
        onClick={() => onNavigate('events')}
        className={`flex flex-col items-center justify-center flex-1 py-1 transition ${
          currentScreen === 'events' || currentScreen === 'event_detail'
            ? 'text-[#FF1A2D]'
            : 'text-zinc-500 hover:text-zinc-300'
        }`}
      >
        <Calendar className="w-5 h-5 mb-0.5" />
        <span className="text-[10px] font-semibold">Eventos</span>
      </button>

      {/* Floating Check-in Shortcut for Operators */}
      {isOperator && (
        <button
          onClick={() => onNavigate('checkin')}
          className={`flex flex-col items-center justify-center -mt-5 transition ${
            currentScreen === 'checkin' ? 'scale-105' : ''
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-[#FF1A2D] text-white flex items-center justify-center shadow-[0_0_15px_rgba(255,26,45,0.6)] border-2 border-[#0c0c0c]">
            <QrCode className="w-6 h-6" />
          </div>
          <span className="text-[9px] font-bold text-[#FF1A2D] mt-0.5">Check-in</span>
        </button>
      )}

      <button
        onClick={() => onNavigate('digital_ticket')}
        className={`flex flex-col items-center justify-center flex-1 py-1 transition ${
          currentScreen === 'digital_ticket' ? 'text-[#FF1A2D]' : 'text-zinc-500 hover:text-zinc-300'
        }`}
      >
        <Ticket className="w-5 h-5 mb-0.5" />
        <span className="text-[10px] font-semibold">Ingressos</span>
      </button>

      <button
        onClick={() => onNavigate('profile')}
        className={`flex flex-col items-center justify-center flex-1 py-1 transition ${
          currentScreen === 'profile' || currentScreen === 'auth'
            ? 'text-[#FF1A2D]'
            : 'text-zinc-500 hover:text-zinc-300'
        }`}
      >
        <User className="w-5 h-5 mb-0.5" />
        <span className="text-[10px] font-semibold">Perfil</span>
      </button>
    </nav>
  );
};
