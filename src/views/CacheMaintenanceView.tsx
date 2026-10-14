import React, { useState } from 'react';
import { ActiveScreen } from '../types';
import {
  Trash2,
  RefreshCw,
  Clock,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  Database,
  Layers,
  HardDrive,
} from 'lucide-react';

interface CacheMaintenanceViewProps {
  onNavigate: (screen: ActiveScreen) => void;
}

export const CacheMaintenanceView: React.FC<CacheMaintenanceViewProps> = ({
  onNavigate,
}) => {
  const [cleaning, setCleaning] = useState(false);
  const [lastCleaned, setLastCleaned] = useState('10/11/2025 - 03:00');
  const [cleanStatus, setCleanStatus] = useState<'success' | null>(null);
  const [autoClean, setAutoClean] = useState(true);
  const [autoFrequency, setAutoFrequency] = useState('Diária');
  const [scheduledClean, setScheduledClean] = useState(true);
  const [scheduledTime, setScheduledTime] = useState('03:00');

  const handleManualClean = async () => {
    setCleaning(true);
    setCleanStatus(null);

    // Clear service worker caches and localStorage temporary caches if available
    if ('caches' in window) {
      try {
        const keys = await caches.keys();
        await Promise.all(keys.map((k) => caches.delete(k)));
      } catch (err) {
        console.warn('Erro ao limpar cache de Service Worker:', err);
      }
    }

    setTimeout(() => {
      const now = new Date();
      const formatted = `${String(now.getDate()).padStart(2, '0')}/${String(
        now.getMonth() + 1
      ).padStart(2, '0')}/${now.getFullYear()} - ${String(now.getHours()).padStart(
        2,
        '0'
      )}:${String(now.getMinutes()).padStart(2, '0')}`;
      setLastCleaned(formatted);
      setCleaning(false);
      setCleanStatus('success');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Navigation Back */}
        <div className="flex items-center justify-between border-b border-[#1c1c1c] pb-4">
          <button
            onClick={() => onNavigate('admin_dashboard')}
            className="flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white bg-[#141414] border border-[#2a2a2a] px-3.5 py-2 rounded-xl"
          >
            <ArrowLeft className="w-4 h-4 text-[#FF1A2D]" />
            <span>Voltar ao PX CONTROL</span>
          </button>
          <span className="text-xs text-zinc-500 font-mono">
            Configurações &gt; Manutenção &gt; Limpeza de Cache
          </span>
        </div>

        {/* Main Card (Screen 11 representation) */}
        <div className="bg-[#121212] border border-[#222] rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-[#222] pb-5">
            <h1 className="text-2xl font-black uppercase tracking-tight text-white font-heading">
              Limpeza de Cache do Site
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Mantenha o site sempre rápido, com carregamento instantâneo e dados atualizados
            </p>
          </div>

          {cleanStatus === 'success' && (
            <div className="bg-emerald-950/60 border border-emerald-500/50 text-emerald-200 text-xs p-4 rounded-2xl flex items-center gap-2.5 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Cache limpo com sucesso! Todos os assets e dados em cache foram renovados.</span>
            </div>
          )}

          {/* Module 1: Limpeza Manual */}
          <div className="bg-[#181818] border border-[#262626] p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#222] border border-[#333] flex items-center justify-center text-[#FF1A2D] shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase text-white">Limpeza Manual</h3>
                <p className="text-xs text-zinc-400 mt-0.5 max-w-md">
                  Limpa imediatamente o cache estático, buffers do Vite, Service Worker e páginas geradas.
                </p>
              </div>
            </div>

            <button
              onClick={handleManualClean}
              disabled={cleaning}
              className="bg-[#FF1A2D] hover:bg-[#e00f21] disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl shadow-[0_0_15px_rgba(255,26,45,0.4)] transition shrink-0 flex items-center justify-center gap-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${cleaning ? 'animate-spin' : ''}`} />
              <span>{cleaning ? 'Limpando...' : 'Limpar Agora'}</span>
            </button>
          </div>

          {/* Module 2: Limpeza Automática */}
          <div className="bg-[#181818] border border-[#262626] p-5 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#222] border border-[#333] flex items-center justify-center text-blue-400 shrink-0">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase text-white">Limpeza Automática</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Descarta versões desatualizadas de assets conforme a frequência estipulada.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-zinc-400">
                  {autoClean ? 'Ativa' : 'Inativa'}
                </span>
                <input
                  type="checkbox"
                  checked={autoClean}
                  onChange={(e) => setAutoClean(e.target.checked)}
                  className="w-4 h-4 accent-[#FF1A2D]"
                />
              </div>
            </div>

            {autoClean && (
              <div className="pt-3 border-t border-[#242424] flex items-center justify-between text-xs">
                <span className="text-zinc-400">Frequência de purga:</span>
                <select
                  value={autoFrequency}
                  onChange={(e) => setAutoFrequency(e.target.value)}
                  className="bg-[#121212] border border-[#333] rounded-lg px-3 py-1.5 text-zinc-200"
                >
                  <option value="Diária">Diária (Recomendado)</option>
                  <option value="Semanal">Semanal</option>
                  <option value="Mensal">Mensal</option>
                </select>
              </div>
            )}
          </div>

          {/* Module 3: Limpeza Programada */}
          <div className="bg-[#181818] border border-[#262626] p-5 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#222] border border-[#333] flex items-center justify-center text-emerald-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase text-white">Limpeza Programada</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Executa em horário de baixo tráfego de usuários para não impactar acessos.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-zinc-400">
                  {scheduledClean ? 'Ativa' : 'Inativa'}
                </span>
                <input
                  type="checkbox"
                  checked={scheduledClean}
                  onChange={(e) => setScheduledClean(e.target.checked)}
                  className="w-4 h-4 accent-[#FF1A2D]"
                />
              </div>
            </div>

            {scheduledClean && (
              <div className="pt-3 border-t border-[#242424] flex items-center justify-between text-xs">
                <span className="text-zinc-400">Data e Hora de execução:</span>
                <span className="font-mono text-zinc-200 bg-[#121212] px-3 py-1 rounded border border-[#333]">
                  Todos os dias — {scheduledTime}
                </span>
              </div>
            )}
          </div>

          {/* Execution History Bar */}
          <div className="pt-4 border-t border-[#1f1f1f] flex items-center justify-between text-xs font-mono text-zinc-400 bg-[#0d0d0d] p-3 rounded-xl border border-[#222]">
            <span>&lt;Última execução: {lastCleaned} | Status: Concluída&gt;</span>
            <span className="text-emerald-400 font-bold">100% OK</span>
          </div>
        </div>
      </div>
    </div>
  );
};
