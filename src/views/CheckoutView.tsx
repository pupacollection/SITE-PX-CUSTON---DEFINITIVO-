import React, { useState } from 'react';
import { EventItem, TicketBatch, PaymentMethod, Ticket, UserProfile, ActiveScreen } from '../types';
import {
  CreditCard,
  QrCode,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  AlertCircle,
} from 'lucide-react';

interface CheckoutViewProps {
  event: EventItem;
  selectedBatches: { batch: TicketBatch; quantity: number }[];
  user: UserProfile | null;
  onSuccess: (newTickets: Ticket[]) => void;
  onCancel: () => void;
  onNavigate: (screen: ActiveScreen) => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  event,
  selectedBatches,
  user,
  onSuccess,
  onCancel,
  onNavigate,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('pix');
  const [processing, setProcessing] = useState(false);
  const [buyerName, setBuyerName] = useState(user?.full_name || 'Deivid J. Silva');
  const [buyerEmail, setBuyerEmail] = useState(user?.email || 'deivid@gmail.com');
  const [buyerCpf, setBuyerCpf] = useState('123.456.789-00');

  // Compute totals
  const subtotal = selectedBatches.reduce(
    (acc, item) => acc + item.batch.price * item.quantity,
    0
  );
  const convenienceFee = subtotal > 0 ? 4.0 : 0;
  const pixDiscount = selectedMethod === 'pix' ? subtotal * 0.05 : 0;
  const total = Math.max(0, subtotal + convenienceFee - pixDiscount);

  const handleCheckout = async () => {
    setProcessing(true);

    // Call backend API or process verified payment
    try {
      // In production this connects to backend /api/payments/create-preference
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // Generate verified tickets
      const generatedTickets: Ticket[] = [];
      const timestampSuffix = Date.now().toString(36).toUpperCase().slice(-5);

      selectedBatches.forEach((item, bIndex) => {
        for (let i = 0; i < item.quantity; i++) {
          const code = `PX-7AI${bIndex}${i}${timestampSuffix}`;
          generatedTickets.push({
            id: `tkt-${Date.now()}-${bIndex}-${i}`,
            code,
            order_id: `ord-${Date.now()}`,
            user_id: user?.id || 'usr-guest',
            event_id: event.id,
            batch_id: item.batch.id,
            event_title: event.title,
            event_date: `${event.formatted_date} - ${event.city}/${event.state}`,
            event_location: `${event.location}, ${event.city}/${event.state}`,
            batch_name: item.batch.name,
            holder_name: buyerName,
            holder_doc: buyerCpf,
            price: item.batch.price,
            status: 'paid',
            qr_payload: `PXCUSTON:TKT:${code}:${event.id}:${encodeURIComponent(buyerName)}`,
            created_at: new Date().toISOString(),
          });
        }
      });

      onSuccess(generatedTickets);
    } catch (err) {
      console.error('Erro ao processar pagamento:', err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Stepper (1 Ingressos -> 2 Pagamento -> 3 Confirmação) */}
        <div className="flex items-center justify-center gap-4 sm:gap-8 border-b border-[#222] pb-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-bold flex items-center justify-center">
              ✓
            </div>
            <span className="text-xs text-zinc-400">1. Ingressos</span>
          </div>

          <div className="w-12 h-px bg-[#FF1A2D]"></div>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#FF1A2D] text-white font-bold text-xs flex items-center justify-center shadow-[0_0_10px_rgba(255,26,45,0.6)]">
              2
            </div>
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              2. Pagamento
            </span>
          </div>

          <div className="w-12 h-px bg-[#262626]"></div>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#181818] border border-[#333] text-zinc-500 text-xs font-bold flex items-center justify-center">
              3
            </div>
            <span className="text-xs text-zinc-500">3. Confirmação</span>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Column: Resumo do Pedido */}
          <div className="md:col-span-5 bg-[#121212] border border-[#222] rounded-3xl p-6 sm:p-7 space-y-5">
            <h3 className="text-sm font-black uppercase tracking-wider text-white font-heading">
              Resumo do Pedido
            </h3>

            {/* Event Header in Summary */}
            <div className="bg-[#181818] border border-[#262626] p-3.5 rounded-2xl flex items-center gap-3">
              <img
                src={event.cover_image}
                alt={event.title}
                className="w-14 h-14 rounded-xl object-cover shrink-0"
              />
              <div className="min-w-0">
                <h4 className="text-xs font-black uppercase text-white truncate">{event.title}</h4>
                <p className="text-[11px] text-zinc-400 mt-0.5">{event.formatted_date}</p>
                <p className="text-[10px] text-zinc-500 truncate">{event.city}/{event.state}</p>
              </div>
            </div>

            {/* Selected Items */}
            <div className="space-y-2.5 pt-2 border-t border-[#1e1e1e]">
              {selectedBatches.map((item) => (
                <div key={item.batch.id} className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-zinc-200">{item.batch.name}</span>
                    <span className="text-zinc-500 block text-[11px]">{item.quantity} unidade(s)</span>
                  </div>
                  <span className="font-bold text-white">
                    R$ {(item.batch.price * item.quantity).toFixed(2).replace('.', ',')}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div className="pt-4 border-t border-[#1e1e1e] space-y-2 text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Taxa de conveniência</span>
                <span>R$ {convenienceFee.toFixed(2).replace('.', ',')}</span>
              </div>
              {pixDiscount > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Desconto Pix (5%)</span>
                  <span>- R$ {pixDiscount.toFixed(2).replace('.', ',')}</span>
                </div>
              )}
              <div className="pt-3 border-t border-[#262626] flex justify-between items-center text-sm font-black">
                <span className="uppercase text-white">Total</span>
                <span className="text-[#FF1A2D] text-lg">
                  R$ {total.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-[#181818] border border-[#262626] p-3 rounded-xl flex items-center gap-2 text-[11px] text-zinc-400">
              <Lock className="w-3.5 h-3.5 text-[#FF1A2D] shrink-0" />
              <span>Ambiente criptografado. Seus dados nunca são compartilhados.</span>
            </div>
          </div>

          {/* Right Column: Métodos de Pagamento Mercado Pago */}
          <div className="md:col-span-7 bg-[#121212] border border-[#222] rounded-3xl p-6 sm:p-7 space-y-6">
            <div className="flex items-center justify-between border-b border-[#222] pb-4">
              <div>
                <h3 className="text-base font-black uppercase tracking-tight text-white font-heading">
                  Pagamento Oficial
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">Escolha uma forma de pagamento</p>
              </div>

              {/* Mercado Pago Badge */}
              <div className="flex items-center gap-2 bg-[#009ee3]/10 border border-[#009ee3]/30 px-3 py-1.5 rounded-xl">
                <div className="w-2 h-2 rounded-full bg-[#009ee3] animate-pulse"></div>
                <span className="text-xs font-bold text-[#009ee3] tracking-wide">
                  mercado pago
                </span>
              </div>
            </div>

            {/* Buyer Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] text-zinc-400 uppercase font-semibold block mb-1">
                  Nome do Titular
                </label>
                <input
                  type="text"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className="w-full bg-[#181818] border border-[#2a2a2a] rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-[10px] text-zinc-400 uppercase font-semibold block mb-1">
                  CPF
                </label>
                <input
                  type="text"
                  value={buyerCpf}
                  onChange={(e) => setBuyerCpf(e.target.value)}
                  className="w-full bg-[#181818] border border-[#2a2a2a] rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
            </div>

            {/* Payment Method Selector (Pix, Cartão, Boleto) */}
            <div className="space-y-3">
              {/* Option 1: Pix */}
              <div
                onClick={() => setSelectedMethod('pix')}
                className={`cursor-pointer p-4 rounded-2xl border transition flex items-center justify-between ${
                  selectedMethod === 'pix'
                    ? 'bg-[#181818] border-[#FF1A2D] shadow-[0_0_15px_rgba(255,26,45,0.2)]'
                    : 'bg-[#151515] border-[#262626] hover:border-[#383838]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      selectedMethod === 'pix'
                        ? 'border-[#FF1A2D] bg-[#FF1A2D]'
                        : 'border-[#444]'
                    }`}
                  >
                    {selectedMethod === 'pix' && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white uppercase">Pix</span>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                        5% de desconto
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-0.5">
                      Aprovação imediata e emissão automática do QR Code
                    </p>
                  </div>
                </div>
                <QrCode className="w-5 h-5 text-emerald-400" />
              </div>

              {/* Option 2: Cartão de Crédito */}
              <div
                onClick={() => setSelectedMethod('credit_card')}
                className={`cursor-pointer p-4 rounded-2xl border transition flex items-center justify-between ${
                  selectedMethod === 'credit_card'
                    ? 'bg-[#181818] border-[#FF1A2D] shadow-[0_0_15px_rgba(255,26,45,0.2)]'
                    : 'bg-[#151515] border-[#262626] hover:border-[#383838]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      selectedMethod === 'credit_card'
                        ? 'border-[#FF1A2D] bg-[#FF1A2D]'
                        : 'border-[#444]'
                    }`}
                  >
                    {selectedMethod === 'credit_card' && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white uppercase">Cartão de Crédito</span>
                    <p className="text-[11px] text-zinc-400 mt-0.5">
                      Parcelamento em até 12x via Mercado Pago
                    </p>
                  </div>
                </div>
                <CreditCard className="w-5 h-5 text-zinc-400" />
              </div>

              {/* Option 3: Boleto Bancário */}
              <div
                onClick={() => setSelectedMethod('boleto')}
                className={`cursor-pointer p-4 rounded-2xl border transition flex items-center justify-between ${
                  selectedMethod === 'boleto'
                    ? 'bg-[#181818] border-[#FF1A2D] shadow-[0_0_15px_rgba(255,26,45,0.2)]'
                    : 'bg-[#151515] border-[#262626] hover:border-[#383838]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      selectedMethod === 'boleto'
                        ? 'border-[#FF1A2D] bg-[#FF1A2D]'
                        : 'border-[#444]'
                    }`}
                  >
                    {selectedMethod === 'boleto' && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white uppercase">Boleto Bancário</span>
                    <p className="text-[11px] text-zinc-400 mt-0.5">
                      Compensação em até 1 a 3 dias úteis
                    </p>
                  </div>
                </div>
                <FileText className="w-5 h-5 text-zinc-400" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 space-y-3">
              <button
                onClick={handleCheckout}
                disabled={processing || subtotal === 0}
                className="w-full bg-[#FF1A2D] hover:bg-[#e00f21] disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-[0_0_20px_rgba(255,26,45,0.45)] transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                {processing ? (
                  <span>Processando com Mercado Pago...</span>
                ) : (
                  <>
                    <span>Finalizar Compra — R$ {total.toFixed(2).replace('.', ',')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>🔒 Pagamento seguro com Mercado Pago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
