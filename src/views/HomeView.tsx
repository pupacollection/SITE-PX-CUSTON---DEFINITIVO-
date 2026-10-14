import React from 'react';
import { EventItem, ActiveScreen } from '../types';
import { Calendar, MapPin, ArrowRight, ShieldCheck, Zap, Flame, Trophy, Volume2 } from 'lucide-react';

interface HomeViewProps {
  events: EventItem[];
  onSelectEvent: (event: EventItem) => void;
  onNavigate: (screen: ActiveScreen) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  events,
  onSelectEvent,
  onNavigate,
}) => {
  const nextEvent = events[0];

  return (
    <div className="min-h-screen bg-[#000000] text-white">
      {/* 01. HERO BANNER */}
      <section className="relative min-h-[580px] md:min-h-[680px] flex items-center justify-center overflow-hidden border-b border-[#1a1a1a]">
        {/* Background Image with Dark Vignette & Red Automotive Glow */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 scale-105 transform transition duration-1000"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=2000&q=85)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#000000] via-transparent to-[#000000]" />
        
        {/* Ambient Red Glow Spotlight */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#FF1A2D]/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Left Text Block */}
          <div className="max-w-2xl text-left">
            {/* Exclusive Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181818] border border-[#2a2a2a] text-[#FF1A2D] text-xs font-bold uppercase tracking-wider mb-5">
              <Flame className="w-3.5 h-3.5" />
              <span>Plataforma Oficial de Eventos PX CUSTON</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight font-heading leading-[1.05]">
              EVENTOS, CARROS E{' '}
              <span className="text-[#FF1A2D] drop-shadow-[0_0_25px_rgba(255,26,45,0.6)]">
                EXPERIÊNCIAS
              </span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-zinc-300 max-w-xl font-normal leading-relaxed">
              Viva a cultura automotiva com a PX CUSTON. Eventos oficiais, encontros de rebaixados, competições de som e muito mais.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  if (nextEvent) onSelectEvent(nextEvent);
                }}
                className="bg-[#FF1A2D] hover:bg-[#e00f21] text-white text-sm font-bold uppercase tracking-wider px-7 py-3.5 rounded-xl shadow-[0_0_20px_rgba(255,26,45,0.45)] transition transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <span>Ver Próximos Eventos</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('events')}
                className="bg-[#141414] hover:bg-[#1f1f1f] border border-[#2a2a2a] text-zinc-200 text-sm font-semibold px-6 py-3.5 rounded-xl transition"
              >
                Saiba Mais
              </button>
            </div>
          </div>

          {/* Right Highlight Badge / Floating Next Event Card */}
          {nextEvent && (
            <div
              onClick={() => onSelectEvent(nextEvent)}
              className="cursor-pointer w-full md:w-80 bg-[#121212]/90 backdrop-blur-md border border-[#2a2a2a] hover:border-[#FF1A2D]/60 p-5 rounded-2xl shadow-2xl transition transform hover:scale-[1.02] group"
            >
              <div className="flex items-center gap-2.5 text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <Calendar className="w-4 h-4 text-[#FF1A2D]" />
                <span>PRÓXIMO EVENTO OFICIAL</span>
              </div>
              <h3 className="text-lg font-black text-white group-hover:text-[#FF1A2D] transition uppercase leading-snug">
                {nextEvent.title}
              </h3>
              <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#FF1A2D]" />
                {nextEvent.formatted_date} — {nextEvent.city}/{nextEvent.state}
              </p>
              <div className="mt-4 pt-3 border-t border-[#222] flex items-center justify-between text-xs">
                <span className="text-zinc-400">Ingressos a partir de</span>
                <span className="text-[#FF1A2D] font-bold text-sm">
                  R$ {nextEvent.min_price.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 02. SECTION: PRÓXIMOS EVENTOS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight font-heading">
              Próximos Eventos
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Garanta seu ingresso oficial com segurança e QR Code no celular
            </p>
          </div>
          <button
            onClick={() => onNavigate('events')}
            className="text-xs sm:text-sm font-semibold text-[#FF1A2D] hover:underline flex items-center gap-1 group"
          >
            <span>Ver Todos</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 3 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-[#121212] border border-[#222] hover:border-[#333] rounded-2xl overflow-hidden shadow-xl flex flex-col group transition duration-300"
            >
              {/* Event Cover Photo with Badge */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.cover_image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent" />
                
                {/* Red PX CUSTON badge */}
                <div className="absolute top-3 left-3 bg-[#FF1A2D] text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded shadow">
                  PX CUSTON
                </div>

                <div className="absolute bottom-3 left-3 text-xs font-semibold text-zinc-300 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#FF1A2D]" />
                  <span>{event.formatted_date}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-black uppercase tracking-tight text-white group-hover:text-[#FF1A2D] transition">
                    {event.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{event.location} • {event.city}/{event.state}</span>
                  </p>
                  <p className="text-xs text-zinc-400 mt-3 line-clamp-2 leading-relaxed">
                    {event.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#1f1f1f] flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-zinc-500 block">A partir de</span>
                    <span className="text-base font-extrabold text-[#FF1A2D]">
                      R$ {event.min_price.toFixed(2).replace('.', ',')}
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectEvent(event)}
                    className="bg-[#FF1A2D] hover:bg-[#e00f21] text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-lg shadow transition"
                  >
                    Comprar Ingressos
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 03. BRAND PILLARS & SECURITY */}
      <section className="bg-[#0b0b0b] border-y border-[#181818] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-[#121212] border border-[#222] p-5 rounded-xl flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#FF1A2D]/10 text-[#FF1A2D] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wide">Plataforma Exclusiva</h4>
              <p className="text-xs text-zinc-400 mt-1">
                Eventos geridos 100% pela equipe autorizada da PX CUSTON. Sem intermediários.
              </p>
            </div>
          </div>

          <div className="bg-[#121212] border border-[#222] p-5 rounded-xl flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#FF1A2D]/10 text-[#FF1A2D] flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wide">Ingresso Instantâneo</h4>
              <p className="text-xs text-zinc-400 mt-1">
                QR Code dinâmico liberado após confirmação oficial do pagamento Mercado Pago.
              </p>
            </div>
          </div>

          <div className="bg-[#121212] border border-[#222] p-5 rounded-xl flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#FF1A2D]/10 text-[#FF1A2D] flex items-center justify-center shrink-0">
              <Volume2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wide">Som & Performance</h4>
              <p className="text-xs text-zinc-400 mt-1">
                Estrutura de ponta com medições oficiais e arena dedicada aos projetos.
              </p>
            </div>
          </div>

          <div className="bg-[#121212] border border-[#222] p-5 rounded-xl flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#FF1A2D]/10 text-[#FF1A2D] flex items-center justify-center shrink-0">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wide">Check-in Confiável</h4>
              <p className="text-xs text-zinc-400 mt-1">
                Validação por câmera óptica no portão, antifraude e sem duplicidade de ingressos.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
