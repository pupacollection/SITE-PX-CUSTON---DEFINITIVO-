import React, { useState } from 'react';
import { ActiveScreen, EventItem } from '../types';
import { PxLogo } from '../components/common/PxLogo';
import {
  LayoutDashboard,
  Calendar,
  Ticket,
  ShoppingBag,
  Users,
  DollarSign,
  Settings,
  Trash2,
  LogOut,
  TrendingUp,
  Download,
  CheckCircle2,
  Clock,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';

interface AdminDashboardViewProps {
  events: EventItem[];
  onNavigate: (screen: ActiveScreen) => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  events,
  onNavigate,
}) => {
  const [dateRange, setDateRange] = useState('01/11/2025 - 30/11/2025');

  return (
    <div className="min-h-screen bg-[#000000] text-white flex flex-col md:flex-row">
      {/* Sidebar: PX CONTROL */}
      <aside className="w-full md:w-64 bg-[#0d0d0d] border-b md:border-b-0 md:border-r border-[#1c1c1c] p-4 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          {/* Brand header */}
          <div className="flex items-center gap-2 px-2 pt-2">
            <span className="text-base font-black tracking-widest text-[#FF1A2D] uppercase font-heading">
              PX CONTROL
            </span>
          </div>

          {/* Navigation menu */}
          <nav className="space-y-1 text-xs">
            <button
              onClick={() => onNavigate('admin_dashboard')}
              className="w-full text-left px-3.5 py-2.5 rounded-xl font-bold flex items-center gap-3 bg-[#FF1A2D] text-white shadow-[0_0_15px_rgba(255,26,45,0.4)]"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => onNavigate('events')}
              className="w-full text-left px-3.5 py-2.5 rounded-xl font-medium flex items-center gap-3 text-zinc-400 hover:text-white hover:bg-[#181818] transition"
            >
              <Calendar className="w-4 h-4" />
              <span>Eventos</span>
            </button>

            <button
              onClick={() => onNavigate('digital_ticket')}
              className="w-full text-left px-3.5 py-2.5 rounded-xl font-medium flex items-center gap-3 text-zinc-400 hover:text-white hover:bg-[#181818] transition"
            >
              <Ticket className="w-4 h-4" />
              <span>Ingressos</span>
            </button>

            <button
              onClick={() => onNavigate('admin_dashboard')}
              className="w-full text-left px-3.5 py-2.5 rounded-xl font-medium flex items-center gap-3 text-zinc-400 hover:text-white hover:bg-[#181818] transition"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Pedidos</span>
            </button>

            <button
              onClick={() => onNavigate('profile')}
              className="w-full text-left px-3.5 py-2.5 rounded-xl font-medium flex items-center gap-3 text-zinc-400 hover:text-white hover:bg-[#181818] transition"
            >
              <Users className="w-4 h-4" />
              <span>Usuários</span>
            </button>

            <button
              onClick={() => onNavigate('admin_payments')}
              className="w-full text-left px-3.5 py-2.5 rounded-xl font-medium flex items-center gap-3 text-zinc-400 hover:text-white hover:bg-[#181818] transition"
            >
              <DollarSign className="w-4 h-4" />
              <span>Financeiro</span>
            </button>

            <button
              onClick={() => onNavigate('admin_payments')}
              className="w-full text-left px-3.5 py-2.5 rounded-xl font-medium flex items-center gap-3 text-zinc-400 hover:text-white hover:bg-[#181818] transition"
            >
              <Settings className="w-4 h-4" />
              <span>Configurações</span>
            </button>

            <button
              onClick={() => onNavigate('admin_cache')}
              className="w-full text-left px-3.5 py-2.5 rounded-xl font-medium flex items-center gap-3 text-zinc-400 hover:text-white hover:bg-[#181818] transition"
            >
              <Trash2 className="w-4 h-4" />
              <span>Limpeza de Cache</span>
            </button>
          </nav>
        </div>

        <div className="pt-4 border-t border-[#1c1c1c]">
          <button
            onClick={() => onNavigate('home')}
            className="w-full text-left px-3.5 py-2 rounded-xl text-xs text-zinc-400 hover:text-white flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Voltar ao Site</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Dashboard */}
      <main className="flex-1 p-4 sm:p-8 space-y-8 overflow-y-auto">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1c1c1c] pb-6">
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tight text-white font-heading">
              Dashboard Geral
            </h1>
            <p className="text-xs text-zinc-400 mt-0.5">
              Visão consolidada de receitas, ingressos e ocupação dos eventos PX CUSTON
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-[#141414] border border-[#2a2a2a] px-3.5 py-2 rounded-xl text-xs text-zinc-300">
              {dateRange}
            </div>

            <button
              onClick={() => alert('Exportando relatório consolidado PX CONTROL (CSV/PDF)...')}
              className="bg-[#FF1A2D] hover:bg-[#e00f21] text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl shadow-[0_0_15px_rgba(255,26,45,0.4)] transition flex items-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar Relatório</span>
            </button>
          </div>
        </div>

        {/* 4 Metrics Cards (Screen 09 representation) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Card 1: Vendas Totais */}
          <div className="bg-[#121212] border border-[#222] p-5 rounded-2xl">
            <span className="text-xs text-zinc-400 uppercase font-semibold">Vendas Totais</span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-black text-white font-heading">R$ 48.750,00</span>
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> +12%
              </span>
            </div>
            <p className="text-[10px] text-zinc-500 mt-2">Período selecionado</p>
          </div>

          {/* Card 2: Ingressos Vendidos */}
          <div className="bg-[#121212] border border-[#222] p-5 rounded-2xl">
            <span className="text-xs text-zinc-400 uppercase font-semibold">Ingressos Vendidos</span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-black text-white font-heading">1.248</span>
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> +18%
              </span>
            </div>
            <p className="text-[10px] text-zinc-500 mt-2">Total emitido com QR Code</p>
          </div>

          {/* Card 3: Eventos Ativos */}
          <div className="bg-[#121212] border border-[#222] p-5 rounded-2xl">
            <span className="text-xs text-zinc-400 uppercase font-semibold">Eventos Ativos</span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-black text-white font-heading">3</span>
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> +1
              </span>
            </div>
            <p className="text-[10px] text-zinc-500 mt-2">100% oficiais PX CUSTON</p>
          </div>

          {/* Card 4: Usuários Cadastrados */}
          <div className="bg-[#121212] border border-[#222] p-5 rounded-2xl">
            <span className="text-xs text-zinc-400 uppercase font-semibold">Usuários Cadastrados</span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-black text-white font-heading">892</span>
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> +15%
              </span>
            </div>
            <p className="text-[10px] text-zinc-500 mt-2">Perfis no Supabase</p>
          </div>
        </div>

        {/* Charts & Activity Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Chart: Vendas por Período */}
          <div className="lg:col-span-8 bg-[#121212] border border-[#222] p-6 rounded-3xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black uppercase text-white font-heading">
                  Vendas por Período
                </h3>
                <p className="text-xs text-zinc-400">Evolução diária de faturamento com ingressos</p>
              </div>
              <span className="text-xs font-bold text-[#FF1A2D] bg-[#FF1A2D]/10 px-2.5 py-1 rounded-full border border-[#FF1A2D]/30">
                Mercado Pago Conectado
              </span>
            </div>

            {/* Glowing Line Chart Representation */}
            <div className="h-64 w-full relative flex items-end pt-8 pb-4">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150">
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FF1A2D" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#FF1A2D" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Area */}
                <path
                  d="M 0 140 L 40 120 L 90 125 L 140 100 L 200 110 L 250 60 L 310 75 L 370 45 L 430 35 L 500 20 L 500 150 L 0 150 Z"
                  fill="url(#chartGrad)"
                />
                {/* Glowing Line */}
                <path
                  d="M 0 140 L 40 120 L 90 125 L 140 100 L 200 110 L 250 60 L 310 75 L 370 45 L 430 35 L 500 20"
                  fill="none"
                  stroke="#FF1A2D"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                {/* Highlight Point */}
                <circle cx="500" cy="20" r="5" fill="#FFFFFF" stroke="#FF1A2D" strokeWidth="3" />
              </svg>
            </div>

            <div className="flex justify-between text-[11px] text-zinc-500 font-mono border-t border-[#1c1c1c] pt-2">
              <span>01/11</span>
              <span>05/11</span>
              <span>10/11</span>
              <span>15/11</span>
              <span>20/11</span>
              <span>25/11</span>
              <span>30/11</span>
            </div>
          </div>

          {/* Right Chart: Ingressos por Status (Donut) */}
          <div className="lg:col-span-4 bg-[#121212] border border-[#222] p-6 rounded-3xl space-y-4 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-black uppercase text-white font-heading">
                Ingressos por Status
              </h3>
              <p className="text-xs text-zinc-400">Distribuição geral no sistema</p>
            </div>

            <div className="flex items-center justify-center my-4">
              <div className="relative w-40 h-40">
                <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                  {/* Utilizados 45% */}
                  <circle
                    cx="18"
                    cy="18"
                    r="15.915"
                    fill="transparent"
                    stroke="#FF1A2D"
                    strokeWidth="4.5"
                    strokeDasharray="45 55"
                    strokeDashoffset="0"
                  />
                  {/* Vendidos 35% */}
                  <circle
                    cx="18"
                    cy="18"
                    r="15.915"
                    fill="transparent"
                    stroke="#10b981"
                    strokeWidth="4.5"
                    strokeDasharray="35 65"
                    strokeDashoffset="-45"
                  />
                  {/* Disponíveis 15% */}
                  <circle
                    cx="18"
                    cy="18"
                    r="15.915"
                    fill="transparent"
                    stroke="#3b82f6"
                    strokeWidth="4.5"
                    strokeDasharray="15 85"
                    strokeDashoffset="-80"
                  />
                  {/* Cancelados 5% */}
                  <circle
                    cx="18"
                    cy="18"
                    r="15.915"
                    fill="transparent"
                    stroke="#71717a"
                    strokeWidth="4.5"
                    strokeDasharray="5 95"
                    strokeDashoffset="-95"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xs font-bold text-zinc-400 uppercase">Total</span>
                  <span className="text-lg font-black text-white font-heading">1.248</span>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 text-xs pt-3 border-t border-[#1c1c1c]">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF1A2D]" />
                <span className="text-zinc-300">Utilizados: <strong>45%</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-zinc-300">Vendidos: <strong>35%</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <span className="text-zinc-300">Disponíveis: <strong>15%</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-500" />
                <span className="text-zinc-300">Cancelados: <strong>5%</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Eventos Recentes List */}
        <div className="bg-[#121212] border border-[#222] p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black uppercase text-white font-heading">
              Eventos Oficiais Recentes
            </h3>
            <button
              onClick={() => onNavigate('events')}
              className="text-xs text-[#FF1A2D] font-bold hover:underline"
            >
              Gerenciar Eventos →
            </button>
          </div>

          <div className="space-y-3">
            {events.map((evt) => (
              <div
                key={evt.id}
                className="bg-[#181818] border border-[#262626] p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={evt.cover_image}
                    alt={evt.title}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div>
                    <h4 className="text-sm font-black text-white uppercase">{evt.title}</h4>
                    <p className="text-xs text-zinc-400">
                      {evt.formatted_date} — {evt.city}/{evt.state}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1 rounded-full font-bold">
                    Publicado
                  </span>
                  <button
                    onClick={() => onNavigate('event_detail')}
                    className="bg-[#222] hover:bg-[#333] text-white text-xs px-3 py-1.5 rounded-lg border border-[#333]"
                  >
                    Editar Lotes
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
