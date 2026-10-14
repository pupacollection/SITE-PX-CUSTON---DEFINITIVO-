import React, { useState } from 'react';
import { EventItem, ActiveScreen } from '../types';
import { Search, Calendar, MapPin, Filter, ArrowRight } from 'lucide-react';

interface EventsCatalogViewProps {
  events: EventItem[];
  onSelectEvent: (event: EventItem) => void;
  onNavigate: (screen: ActiveScreen) => void;
}

export const EventsCatalogView: React.FC<EventsCatalogViewProps> = ({
  events,
  onSelectEvent,
  onNavigate,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('Todos');

  const allTags = ['Todos', 'Carros Rebaixados', 'Som Automotivo', 'Carros Antigos'];

  const filteredEvents = events.filter((e) => {
    const matchesSearch =
      e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag =
      selectedTag === 'Todos' || e.tags.some((t) => t.toLowerCase().includes(selectedTag.toLowerCase()));
    return matchesSearch && matchesTag;
  });

  return (
    <div className="min-h-screen bg-[#000000] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-[#1c1c1c] pb-6">
          <span className="text-xs font-black tracking-widest text-[#FF1A2D] uppercase">
            CALENDÁRIO OFICIAL PX CUSTON
          </span>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white font-heading mt-1">
            Eventos, Encontros & Experiências
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl">
            Acompanhe o cronograma exclusivo de eventos da PX CUSTON. Ingressos digitais com validação instantânea na portaria.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Buscar evento, cidade ou atração..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#121212] border border-[#262626] focus:border-[#FF1A2D] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 transition"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`text-xs px-3.5 py-2 rounded-xl font-medium whitespace-nowrap transition border ${
                  selectedTag === tag
                    ? 'bg-[#FF1A2D] border-[#FF1A2D] text-white font-bold shadow-[0_0_12px_rgba(255,26,45,0.4)]'
                    : 'bg-[#141414] border-[#262626] text-zinc-400 hover:text-white hover:bg-[#1a1a1a]'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Cards */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-16 bg-[#111111] border border-[#222] rounded-3xl p-8">
            <p className="text-zinc-400 text-sm">Nenhum evento oficial encontrado com os critérios selecionados.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedTag('Todos');
              }}
              className="mt-4 text-xs text-[#FF1A2D] font-bold hover:underline"
            >
              Limpar filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredEvents.map((evt) => (
              <div
                key={evt.id}
                className="bg-[#121212] border border-[#222] hover:border-[#383838] rounded-3xl overflow-hidden shadow-2xl flex flex-col group transition duration-300"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={evt.cover_image}
                    alt={evt.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 bg-[#FF1A2D] text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded shadow">
                    PX CUSTON
                  </div>
                  <div className="absolute bottom-3 left-3 text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#FF1A2D]" />
                    <span>{evt.formatted_date}</span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-black uppercase tracking-tight text-white group-hover:text-[#FF1A2D] transition">
                      {evt.title}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                      <span>{evt.location} — {evt.city}/{evt.state}</span>
                    </p>
                    <p className="text-xs text-zinc-400 mt-3 line-clamp-2 leading-relaxed">
                      {evt.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#1f1f1f] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-zinc-500 block uppercase">A partir de</span>
                      <span className="text-base font-extrabold text-[#FF1A2D]">
                        R$ {evt.min_price.toFixed(2).replace('.', ',')}
                      </span>
                    </div>

                    <button
                      onClick={() => onSelectEvent(evt)}
                      className="bg-[#FF1A2D] hover:bg-[#e00f21] text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl shadow transition"
                    >
                      Comprar Ingressos
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
