import React, { useState, useRef, useEffect } from 'react';
import { Ticket, ActiveScreen } from '../types';
import {
  Camera,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  QrCode,
  Flashlight,
  RefreshCw,
  Search,
  ArrowLeft,
  Volume2,
  VolumeX,
} from 'lucide-react';

interface CheckinViewProps {
  tickets: Ticket[];
  onNavigate: (screen: ActiveScreen) => void;
}

export const CheckinView: React.FC<CheckinViewProps> = ({ tickets, onNavigate }) => {
  const [manualCode, setManualCode] = useState('');
  const [cameraActive, setCameraActive] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [lastValidation, setLastValidation] = useState<{
    status: 'success' | 'used' | 'invalid';
    message: string;
    ticket?: Ticket;
  } | null>(null);

  // Counters matching screen 08 mockups
  const [validCount, setValidCount] = useState(245);
  const [usedCount, setUsedCount] = useState(245);
  const [remainingCount, setRemainingCount] = useState(755);

  const videoRef = useRef<HTMLVideoElement>(null);

  const startCamera = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setCameraActive(true);
        }
      } else {
        alert('Câmera não suportada neste dispositivo.');
      }
    } catch (err) {
      console.warn('Permissão de câmera negada ou câmera não disponível:', err);
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const handleValidate = (codeToTest: string) => {
    const cleanCode = codeToTest.trim().toUpperCase();
    if (!cleanCode) return;

    // Check in database/memory
    const found = tickets.find((t) => t.code.toUpperCase() === cleanCode);

    if (!found) {
      setLastValidation({
        status: 'invalid',
        message: `Ingresso ${cleanCode} inválido ou não encontrado no sistema.`,
      });
      return;
    }

    if (found.status === 'used') {
      setLastValidation({
        status: 'used',
        message: `ALERTA: Ingresso ${cleanCode} já foi utilizado anteriormente!`,
        ticket: found,
      });
      return;
    }

    // Success check-in
    found.status = 'used';
    found.checkin_at = new Date().toISOString();
    setValidCount((prev) => prev + 1);
    setUsedCount((prev) => prev + 1);
    setRemainingCount((prev) => Math.max(0, prev - 1));

    setLastValidation({
      status: 'success',
      message: `CHECK-IN REALIZADO COM SUCESSO!`,
      ticket: found,
    });

    setManualCode('');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white py-6 px-4 sm:px-6 flex flex-col items-center">
      <div className="w-full max-w-md space-y-5">
        {/* Top Operator Header */}
        <div className="flex items-center justify-between border-b border-[#1c1c1c] pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('home')}
              className="p-1.5 rounded-lg bg-[#141414] border border-[#262626] text-zinc-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black tracking-widest text-[#FF1A2D] uppercase">
                  PX CHECK-IN
                </span>
                <span className="text-[10px] bg-red-950/60 text-red-300 border border-red-500/30 px-2 py-0.2 rounded-full font-bold">
                  Operador
                </span>
              </div>
              <p className="text-[11px] text-zinc-400">Valide os ingressos rapidamente</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-lg bg-[#141414] border border-[#2a2a2a] text-zinc-300"
              title={soundEnabled ? 'Silenciar bip' : 'Ativar som'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={() => (cameraActive ? stopCamera() : startCamera())}
              className="p-2 rounded-lg bg-[#141414] border border-[#2a2a2a] text-zinc-300"
              title="Reiniciar Câmera"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Viewfinder Box (Screen 08 Scanner View) */}
        <div className="relative w-full aspect-square max-h-[380px] bg-[#0c0c0c] border border-[#222] rounded-3xl overflow-hidden flex items-center justify-center shadow-2xl">
          {/* Active Camera Video */}
          <video
            ref={videoRef}
            playsInline
            autoPlay
            muted
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              cameraActive ? 'opacity-80' : 'opacity-0 pointer-events-none'
            }`}
          />

          {/* Scanner Overlay Guide */}
          <div className="relative z-10 w-64 h-64 border-2 border-dashed border-[#FF1A2D]/50 rounded-2xl flex items-center justify-center">
            {/* 4 Neon Red Corner Brackets */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#FF1A2D] -mt-1 -ml-1 rounded-tl-lg drop-shadow-[0_0_8px_#FF1A2D]" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#FF1A2D] -mt-1 -mr-1 rounded-tr-lg drop-shadow-[0_0_8px_#FF1A2D]" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#FF1A2D] -mb-1 -ml-1 rounded-bl-lg drop-shadow-[0_0_8px_#FF1A2D]" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#FF1A2D] -mb-1 -mr-1 rounded-br-lg drop-shadow-[0_0_8px_#FF1A2D]" />

            {/* Red Laser Scan Line */}
            <div className="absolute left-2 right-2 h-0.5 bg-[#FF1A2D] shadow-[0_0_12px_#FF1A2D] animate-scanline" />

            {/* Target QR Code Icon */}
            <div className="text-[#FF1A2D]/80 flex flex-col items-center pointer-events-none">
              <QrCode className="w-16 h-16 stroke-[1.5]" />
            </div>
          </div>

          {/* Instruction pill */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-xs text-zinc-300 shadow">
            Aponte a câmera para o QR Code
          </div>
        </div>

        {/* Validation Result Notice */}
        {lastValidation && (
          <div
            className={`p-4 rounded-2xl border text-xs flex items-start gap-3 animate-fade-in ${
              lastValidation.status === 'success'
                ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200'
                : lastValidation.status === 'used'
                ? 'bg-red-950/70 border-red-500/60 text-red-200'
                : 'bg-amber-950/60 border-amber-500/50 text-amber-200'
            }`}
          >
            {lastValidation.status === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />}
            {lastValidation.status === 'used' && <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />}
            {lastValidation.status === 'invalid' && <XCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />}
            <div className="flex-1">
              <p className="font-bold text-sm uppercase">{lastValidation.message}</p>
              {lastValidation.ticket && (
                <div className="mt-1 text-[11px] opacity-90">
                  <p><strong>Titular:</strong> {lastValidation.ticket.holder_name}</p>
                  <p><strong>Setor:</strong> {lastValidation.ticket.batch_name} — <strong>Código:</strong> {lastValidation.ticket.code}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Manual Code Input Form */}
        <div className="bg-[#121212] border border-[#222] p-4 rounded-2xl space-y-2">
          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
            Validação Manual por Código
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ex: PX-7AI89C10"
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value)}
              className="flex-1 bg-[#181818] border border-[#2a2a2a] focus:border-[#FF1A2D] rounded-xl px-3 py-2 text-xs text-white font-mono uppercase"
            />
            <button
              onClick={() => handleValidate(manualCode)}
              className="bg-[#FF1A2D] hover:bg-[#e00f21] text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl transition"
            >
              Validar
            </button>
          </div>
          {/* Quick test buttons for operator preview */}
          <div className="flex items-center gap-2 pt-1 text-[11px] text-zinc-500">
            <span>Testar:</span>
            <button
              onClick={() => handleValidate('PX-7AI89C10')}
              className="underline hover:text-white"
            >
              PX-7AI89C10
            </button>
            <span>|</span>
            <button
              onClick={() => handleValidate('PX-4M29L8X1')}
              className="underline hover:text-white"
            >
              PX-4M29L8X1
            </button>
          </div>
        </div>

        {/* Metric Counters Strip (Screen 08 Bottom Module) */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-[#121212] border border-[#222] p-3 rounded-2xl text-center">
            <div className="flex items-center justify-center gap-1 text-emerald-400 text-xs font-bold mb-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Válidos</span>
            </div>
            <span className="text-xl font-black text-white font-heading">{validCount}</span>
          </div>

          <div className="bg-[#121212] border border-[#222] p-3 rounded-2xl text-center">
            <div className="flex items-center justify-center gap-1 text-[#FF1A2D] text-xs font-bold mb-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Utilizados</span>
            </div>
            <span className="text-xl font-black text-white font-heading">{usedCount}</span>
          </div>

          <div className="bg-[#121212] border border-[#222] p-3 rounded-2xl text-center">
            <div className="flex items-center justify-center gap-1 text-zinc-400 text-xs font-bold mb-1">
              <QrCode className="w-3.5 h-3.5" />
              <span>Restantes</span>
            </div>
            <span className="text-xl font-black text-white font-heading">{remainingCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
