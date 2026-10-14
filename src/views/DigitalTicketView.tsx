import React, { useEffect, useState, useRef } from 'react';
import QRCode from 'qrcode';
import { Ticket, ActiveScreen } from '../types';
import { PxLogo } from '../components/common/PxLogo';
import {
  Download,
  Share2,
  CheckCircle2,
  Clock,
  Calendar,
  MapPin,
  User,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface DigitalTicketViewProps {
  tickets: Ticket[];
  selectedTicket?: Ticket | null;
  onNavigate: (screen: ActiveScreen) => void;
}

export const DigitalTicketView: React.FC<DigitalTicketViewProps> = ({
  tickets,
  selectedTicket: initialTicket,
  onNavigate,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const ticketRef = useRef<HTMLDivElement>(null);

  const activeTicket = initialTicket || tickets[currentIdx] || tickets[0];

  useEffect(() => {
    if (activeTicket) {
      QRCode.toDataURL(activeTicket.qr_payload, {
        width: 320,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      })
        .then((url) => setQrDataUrl(url))
        .catch((err) => console.error('Erro ao gerar QR Code:', err));
    }
  }, [activeTicket]);

  const handleNext = () => {
    if (tickets.length > 1) {
      setCurrentIdx((prev) => (prev + 1) % tickets.length);
    }
  };

  const handlePrev = () => {
    if (tickets.length > 1) {
      setCurrentIdx((prev) => (prev - 1 + tickets.length) % tickets.length);
    }
  };

  const handleShare = () => {
    if (navigator.share && activeTicket) {
      navigator.share({
        title: `Ingresso Oficial PX CUSTON — ${activeTicket.event_title}`,
        text: `Meu ingresso oficial para o ${activeTicket.event_title} (${activeTicket.code}).`,
        url: window.location.href,
      });
    }
  };

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.download = `ingresso-${activeTicket.code}.png`;
    link.href = qrDataUrl;
    link.click();
  };

  if (!activeTicket) {
    return (
      <div className="min-h-screen bg-[#000000] text-white flex flex-col items-center justify-center p-6">
        <p className="text-zinc-400 text-sm mb-4">Você ainda não possui ingressos emitidos.</p>
        <button
          onClick={() => onNavigate('events')}
          className="bg-[#FF1A2D] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl"
        >
          Explorar Eventos
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#000000] text-white py-10 px-4 sm:px-6 flex flex-col items-center justify-center">
      {/* Switcher if multiple tickets exist */}
      {tickets.length > 1 && (
        <div className="flex items-center gap-4 mb-4 text-xs text-zinc-400">
          <button
            onClick={handlePrev}
            className="p-1.5 rounded-lg bg-[#141414] border border-[#2a2a2a] hover:text-white"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span>
            Ingresso <strong className="text-white">{currentIdx + 1}</strong> de{' '}
            <strong className="text-white">{tickets.length}</strong>
          </span>
          <button
            onClick={handleNext}
            className="p-1.5 rounded-lg bg-[#141414] border border-[#2a2a2a] hover:text-white"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Ticket Container Card (Screen 07 Master Representation) */}
      <div
        ref={ticketRef}
        className="w-full max-w-sm bg-[#111111] border border-[#262626] rounded-3xl overflow-hidden shadow-[0_0_35px_rgba(255,26,45,0.15)] flex flex-col"
      >
        {/* Top Header Badge */}
        <div className="bg-[#181818] border-b border-[#222] p-5 flex flex-col items-center text-center">
          <PxLogo size="md" />
          <h2 className="text-base font-black uppercase tracking-tight text-white mt-3 font-heading">
            {activeTicket.event_title}
          </h2>
          <p className="text-xs text-zinc-400 mt-1 flex items-center justify-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-[#FF1A2D]" />
            <span>{activeTicket.event_date}</span>
          </p>
        </div>

        {/* Center QR Code Section */}
        <div className="p-6 flex flex-col items-center bg-[#0d0d0d]">
          {/* High-Contrast White Surface for optical camera scanning */}
          <div className="p-4 bg-white rounded-2xl shadow-xl flex items-center justify-center border-4 border-[#222]">
            {qrDataUrl ? (
              <img
                src={qrDataUrl}
                alt={`QR Code ${activeTicket.code}`}
                className="w-56 h-56 object-contain"
              />
            ) : (
              <div className="w-56 h-56 flex items-center justify-center text-zinc-600 text-xs">
                Gerando QR Code...
              </div>
            )}
          </div>

          {/* Ticket Identification Code */}
          <div className="mt-5 text-center">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold block">
              CÓDIGO DO INGRESSO
            </span>
            <div className="text-sm font-mono font-black text-white tracking-widest mt-0.5 bg-[#181818] px-4 py-1.5 rounded-lg border border-[#2a2a2a] inline-block">
              {activeTicket.code}
            </div>
          </div>

          {/* Status Badge */}
          <div className="mt-3">
            {activeTicket.status === 'paid' ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1 rounded-full shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5" /> Confirmado
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 bg-amber-950/40 border border-amber-500/30 px-3 py-1 rounded-full">
                <Clock className="w-3.5 h-3.5" /> Aguardando Pagamento
              </span>
            )}
          </div>

          {/* Helper Instruction */}
          <p className="text-[11px] text-zinc-400 text-center mt-3 max-w-xs">
            Aponte o QR Code na entrada para validar seu ingresso oficial PX CUSTON.
          </p>
        </div>

        {/* Ticket Details Strip */}
        <div className="bg-[#141414] border-t border-[#1e1e1e] p-4 text-xs space-y-1.5 text-zinc-300">
          <div className="flex justify-between">
            <span className="text-zinc-500">Setor/Lote:</span>
            <span className="font-bold text-white uppercase">{activeTicket.batch_name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Titular:</span>
            <span className="font-bold text-white">{activeTicket.holder_name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Local:</span>
            <span className="text-zinc-300 truncate max-w-[200px]">{activeTicket.event_location}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 bg-[#111] border-t border-[#222] grid grid-cols-2 gap-3">
          <button
            onClick={handleDownload}
            className="bg-[#181818] hover:bg-[#222] border border-[#2a2a2a] text-zinc-200 text-xs font-semibold py-2.5 rounded-xl transition flex items-center justify-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-[#FF1A2D]" />
            <span>Salvar no Celular</span>
          </button>

          <button
            onClick={handleShare}
            className="bg-[#181818] hover:bg-[#222] border border-[#2a2a2a] text-zinc-200 text-xs font-semibold py-2.5 rounded-xl transition flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-3.5 h-3.5 text-[#FF1A2D]" />
            <span>Compartilhar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
