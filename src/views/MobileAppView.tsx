import React from 'react';
import { EventItem, UserProfile, ActiveScreen } from '../types';
import { PxLogo } from '../components/common/PxLogo';
import {
  Bell,
  Ticket,
  User,
  Calendar,
  MapPin,
  ArrowRight,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';

interface MobileAppViewProps {
  events: EventItem[];
  user: UserProfile | null;
  onSelectEvent: (event: EventItem) => void;
  onNavigate: (screen: ActiveScreen) => void;
}

export const MobileAppView: React.FC<MobileAppViewProps> = ({
  events,
  user,
  onSelectEvent,
  onNavigate,
}) => {
  const nextEvent = events[0];

  return (
    <div className="min-h-screen bg-[#000000] text-white pb-20">
      {/* Top Mobile Bar */}
      <div className="max-w-md mx-auto px-4 pt-4 pb-2 flex items-center justify-between border-b border-[#1a1a1a]">
        <div className="flex items-center gap-2">
          <PxLogo size="sm" />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('digital_ticket')}
            className="w-9 h-9 rounded-full bg-[#141414] border border-[#2a2a2a] flex items-center justify-center text-zinc-300 relative"
          >
            <Ticket className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#FF1A2D] rounded-full"></span>
          </button>
          <button
            onClick={() => onNavigate('checkout')}
            className="w-9 h-9 rounded-full bg-[#141414] border border-[#2a2a2a] flex items-center justify-center text-zinc-300"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-4 space-y-6">
        {/* User Greeting Block */}
        <div className="flex items-center justify-between bg-[#121212] border border-[#222] p-4 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[#FF1A2D] text-white font-black text-sm flex items-center justify-center shadow-[0_0_12px_rgba(255,26,45,0.4)]">
              {user ? user.full_name.charAt(0) : 'PX'}
            </div>
            <div>
              <p className="text-xs text-zinc-400">Olá, {user ? user.full_name.split(' ')[0] : 'Visitante'}!</p>
              <p className="text-sm font-bold text-white tracking-wide">Bem-vindo de volta.</p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('profile')}
            className="text-[11px] font-semibold text-[#FF1A2D] bg-[#FF1A2D]/10 px-3 py-1.5 rounded-full border border-[#FF1A2D]/20"
          >
            Ver Conta
          </button>
        </div>

        {/* Featured Event Hero Banner */}
        {nextEvent && (
          <div className="relative rounded-2xl overflow-hidden border border-[#FF1A2D]/40 shadow-[0_0_25px_rgba(255,26,45,0.2)] bg-[#121212]">
            <div className="relative h-44">
              <img
                src={nextEvent.cover_image}
                alt={nextEvent.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/60 to-transparent" />
              
              <div className="absolute top-3 left-3 bg-[#FF1A2D] text-white text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded">
                Próximo Evento
              </div>
            </div>

            <div className="p-4 -mt-6 relative z-10">
              <h2 className="text-lg font-black uppercase tracking-tight text-white leading-tight">
                {nextEvent.title}
              </h2>
              <div className="flex items-center gap-3 text-xs text-zinc-300 mt-2">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#FF1A2D]" />
                  {nextEvent.formatted_date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#FF1A2D]" />
                  {nextEvent.city}/{nextEvent.state}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-zinc-400 block">Ingresso a partir de</span>
                  <span className="text-sm font-extrabold text-[#FF1A2D]">
                    R$ {nextEvent.min_price.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <button
                  onClick={() => onSelectEvent(nextEvent)}
                  className="bg-[#FF1A2D] hover:bg-[#e00f21] text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-lg shadow transition"
                >
                  Ver Detalhes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quick Action Grid (Meus Ingressos, Meu Perfil, Notificações) */}
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => onNavigate('digital_ticket')}
            className="bg-[#121212] hover:bg-[#181818] border border-[#222] p-3.5 rounded-xl flex flex-col items-center justify-center text-center transition group"
          >
            <div className="w-10 h-10 rounded-full bg-[#1c1c1c] group-hover:bg-[#FF1A2D] text-zinc-300 group-hover:text-white flex items-center justify-center mb-2 transition">
              <Ticket className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-zinc-200">Meus Ingressos</span>
          </button>

          <button
            onClick={() => onNavigate('profile')}
            className="bg-[#121212] hover:bg-[#181818] border border-[#222] p-3.5 rounded-xl flex flex-col items-center justify-center text-center transition group"
          >
            <div className="w-10 h-10 rounded-full bg-[#1c1c1c] group-hover:bg-[#FF1A2D] text-zinc-300 group-hover:text-white flex items-center justify-center mb-2 transition">
              <User className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-zinc-200">Meu Perfil</span>
          </button>

          <button
            onClick={() => onNavigate('home')}
            className="bg-[#121212] hover:bg-[#181818] border border-[#222] p-3.5 rounded-xl flex flex-col items-center justify-center text-center transition group"
          >
            <div className="w-10 h-10 rounded-full bg-[#1c1c1c] group-hover:bg-[#FF1A2D] text-zinc-300 group-hover:text-white flex items-center justify-center mb-2 transition">
              <Bell className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-zinc-200">Notificações</span>
          </button>
        </div>

        {/* Eventos em Destaque */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-black uppercase tracking-wider text-white">
              Eventos em Destaque
            </h3>
            <button
              onClick={() => onNavigate('events')}
              className="text-xs font-semibold text-[#FF1A2D] flex items-center gap-1"
            >
              <span>Ver Todos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {events.slice(1).map((evt) => (
              <div
                key={evt.id}
                onClick={() => onSelectEvent(evt)}
                className="bg-[#121212] border border-[#222] hover:border-[#333] p-3 rounded-xl flex items-center gap-3 cursor-pointer group transition"
              >
                <img
                  src={evt.cover_image}
                  alt={evt.title}
                  className="w-20 h-20 rounded-lg object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] text-[#FF1A2D] font-bold uppercase tracking-wider">
                    {evt.formatted_date}
                  </div>
                  <h4 className="text-sm font-black text-white group-hover:text-[#FF1A2D] transition truncate uppercase">
                    {evt.title}
                  </h4>
                  <p className="text-[11px] text-zinc-400 truncate">{evt.city}/{evt.state}</p>
                  <p className="text-xs font-bold text-zinc-200 mt-1">
                    A partir de R$ {evt.min_price.toFixed(2).replace('.', ',')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
