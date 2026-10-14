import React, { useState } from 'react';
import { usePWAInstall } from '../../hooks/usePWAInstall';
import { Download, Share, X, Smartphone } from 'lucide-react';

export const PWAInstallPrompt: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  if (isInstalled || isDismissed) {
    return null;
  }

  return (
    <>
      {/* Chromium / Android install prompt */}
      {isInstallable && (
        <div className="fixed bottom-20 left-4 right-4 md:bottom-6 md:right-6 md:left-auto md:w-96 z-40 bg-[#141414] border border-[#2a2a2a] p-3.5 rounded-xl shadow-2xl flex items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#FF1A2D]/10 border border-[#FF1A2D]/30 flex items-center justify-center text-[#FF1A2D]">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">Instalar PX CUSTON</p>
              <p className="text-[11px] text-zinc-400">Acesse ingressos e check-in offline</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={install}
              className="bg-[#FF1A2D] hover:bg-[#e00f21] text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow transition"
            >
              <Download className="w-3.5 h-3.5" />
              Instalar
            </button>
            <button
              onClick={() => setIsDismissed(true)}
              className="text-zinc-500 hover:text-zinc-300 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* iOS Safari manual install banner */}
      {isIOS && !isInstallable && (
        <div className="fixed bottom-20 left-4 right-4 md:bottom-6 md:right-6 md:left-auto md:w-80 z-40 bg-[#141414] border border-[#2a2a2a] p-3 rounded-xl shadow-2xl flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Smartphone className="w-5 h-5 text-[#FF1A2D]" />
            <span className="text-xs text-zinc-300">Instale no seu iPhone</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowIOSModal(true)}
              className="bg-[#222222] hover:bg-[#2c2c2c] text-white text-xs px-2.5 py-1 rounded border border-[#333]"
            >
              Como instalar
            </button>
            <button onClick={() => setIsDismissed(true)} className="text-zinc-500">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* iOS Safari Modal instructions */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl bg-[#141414] border border-[#262626] p-6 text-white shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#222]">
              <h3 className="font-bold text-sm tracking-wide">Instalar no iPhone / iPad</h3>
              <button onClick={() => setShowIOSModal(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-4 space-y-3 text-xs text-zinc-300 leading-relaxed">
              <div className="flex items-start gap-3 bg-[#1c1c1c] p-3 rounded-lg">
                <Share className="w-5 h-5 text-[#FF1A2D] shrink-0 mt-0.5" />
                <p>1. Toque no botão de <strong>Compartilhar</strong> na barra do Safari inferior.</p>
              </div>
              <div className="flex items-start gap-3 bg-[#1c1c1c] p-3 rounded-lg">
                <div className="w-5 h-5 rounded border border-[#444] flex items-center justify-center text-[10px] shrink-0 font-bold text-[#FF1A2D]">+</div>
                <p>2. Role a lista e selecione <strong>Adicionar à Tela de Início</strong>.</p>
              </div>
            </div>
            <button
              onClick={() => setShowIOSModal(false)}
              className="mt-5 w-full rounded-lg bg-[#FF1A2D] py-2.5 text-xs font-bold text-white uppercase tracking-wider hover:bg-[#e00f21] transition"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </>
  );
};
