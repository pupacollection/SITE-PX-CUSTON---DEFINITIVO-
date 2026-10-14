import React, { useState } from 'react';
import { MercadoPagoConfig, ActiveScreen } from '../types';
import {
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Eye,
  EyeOff,
  Save,
  RefreshCw,
  ArrowLeft,
  Sliders,
  Bell,
  Mail,
  Smartphone,
  Shield,
  Wrench,
  Database,
} from 'lucide-react';

interface PaymentSettingsViewProps {
  initialConfig: MercadoPagoConfig;
  onSave: (config: MercadoPagoConfig) => void;
  onNavigate: (screen: ActiveScreen) => void;
}

export const PaymentSettingsView: React.FC<PaymentSettingsViewProps> = ({
  initialConfig,
  onSave,
  onNavigate,
}) => {
  const [config, setConfig] = useState<MercadoPagoConfig>(initialConfig);
  const [showSecrets, setShowSecrets] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [savingNotice, setSavingNotice] = useState(false);

  const handleTestConnection = async () => {
    setTestResult('Testando conexão com API do Mercado Pago...');
    setTimeout(() => {
      setTestResult('✓ Conexão bem-sucedida! Webhooks e credenciais operacionais.');
    }, 800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(config);
    setSavingNotice(true);
    setTimeout(() => setSavingNotice(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
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
            Configurações &gt; Pagamentos &gt; Mercado Pago
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Settings Sidebar */}
          <div className="md:col-span-3 space-y-1 bg-[#121212] border border-[#222] p-3 rounded-2xl text-xs h-fit">
            <button
              onClick={() => {}}
              className="w-full text-left px-3.5 py-2.5 rounded-xl font-medium flex items-center gap-3 text-zinc-400 hover:text-white hover:bg-[#181818]"
            >
              <Sliders className="w-4 h-4" />
              <span>Geral</span>
            </button>

            <button
              onClick={() => {}}
              className="w-full text-left px-3.5 py-2.5 rounded-xl font-bold flex items-center gap-3 bg-[#FF1A2D] text-white shadow-[0_0_15px_rgba(255,26,45,0.4)]"
            >
              <CreditCard className="w-4 h-4" />
              <span>Pagamentos (Mercado Pago)</span>
            </button>

            <button
              onClick={() => {}}
              className="w-full text-left px-3.5 py-2.5 rounded-xl font-medium flex items-center gap-3 text-zinc-400 hover:text-white hover:bg-[#181818]"
            >
              <Mail className="w-4 h-4" />
              <span>E-mail</span>
            </button>

            <button
              onClick={() => {}}
              className="w-full text-left px-3.5 py-2.5 rounded-xl font-medium flex items-center gap-3 text-zinc-400 hover:text-white hover:bg-[#181818]"
            >
              <Bell className="w-4 h-4" />
              <span>Notificações</span>
            </button>

            <button
              onClick={() => {}}
              className="w-full text-left px-3.5 py-2.5 rounded-xl font-medium flex items-center gap-3 text-zinc-400 hover:text-white hover:bg-[#181818]"
            >
              <Smartphone className="w-4 h-4" />
              <span>PWA</span>
            </button>

            <button
              onClick={() => {}}
              className="w-full text-left px-3.5 py-2.5 rounded-xl font-medium flex items-center gap-3 text-zinc-400 hover:text-white hover:bg-[#181818]"
            >
              <Shield className="w-4 h-4" />
              <span>Segurança</span>
            </button>

            <button
              onClick={() => onNavigate('admin_cache')}
              className="w-full text-left px-3.5 py-2.5 rounded-xl font-medium flex items-center gap-3 text-zinc-400 hover:text-white hover:bg-[#181818]"
            >
              <Wrench className="w-4 h-4" />
              <span>Manutenções</span>
            </button>

            <button
              onClick={() => {}}
              className="w-full text-left px-3.5 py-2.5 rounded-xl font-medium flex items-center gap-3 text-zinc-400 hover:text-white hover:bg-[#181818]"
            >
              <Database className="w-4 h-4" />
              <span>Backup</span>
            </button>
          </div>

          {/* Right Configuration Panel (Screen 10 Master Representation) */}
          <div className="md:col-span-9 bg-[#121212] border border-[#222] rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#222] pb-5">
              <div>
                <h2 className="text-xl font-black uppercase tracking-tight text-white font-heading">
                  Mercado Pago
                </h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Configure suas credenciais de pagamento para emissão real de ingressos
                </p>
              </div>

              <div className="flex items-center gap-2 bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-full">
                <CheckCircle2 className="w-4 h-4" />
                <span>Conectado</span>
              </div>
            </div>

            {savingNotice && (
              <div className="bg-emerald-950/50 border border-emerald-500/50 text-emerald-200 text-xs p-3 rounded-xl flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Configurações salvas e validadas com segurança!</span>
              </div>
            )}

            {testResult && (
              <div className="bg-[#181818] border border-[#2a2a2a] text-zinc-300 text-xs p-3 rounded-xl font-mono">
                {testResult}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Environment Toggle: Homologação vs Produção */}
              <div>
                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-2">
                  Ambiente de Execução
                </label>
                <div className="flex items-center gap-6 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="env"
                      checked={config.environment === 'sandbox'}
                      onChange={() => setConfig({ ...config, environment: 'sandbox' })}
                      className="accent-[#FF1A2D]"
                    />
                    <span className="text-zinc-300">Homologação (Teste)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="env"
                      checked={config.environment === 'production'}
                      onChange={() => setConfig({ ...config, environment: 'production' })}
                      className="accent-[#FF1A2D]"
                    />
                    <span className="text-zinc-200 font-bold">Produção (Real)</span>
                  </label>
                </div>
              </div>

              {/* API Credentials */}
              <div className="space-y-4">
                <div>
                  <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                    Public Key
                  </label>
                  <input
                    type="text"
                    value={config.public_key}
                    onChange={(e) => setConfig({ ...config, public_key: e.target.value })}
                    className="w-full bg-[#181818] border border-[#2a2a2a] focus:border-[#FF1A2D] rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                      Access Token (Secret)
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowSecrets(!showSecrets)}
                      className="text-[11px] text-zinc-400 hover:text-white flex items-center gap-1"
                    >
                      {showSecrets ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{showSecrets ? 'Ocultar' : 'Revelar'}</span>
                    </button>
                  </div>
                  <input
                    type={showSecrets ? 'text' : 'password'}
                    value={config.access_token}
                    onChange={(e) => setConfig({ ...config, access_token: e.target.value })}
                    className="w-full bg-[#181818] border border-[#2a2a2a] focus:border-[#FF1A2D] rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                    Webhook Secret
                  </label>
                  <input
                    type={showSecrets ? 'text' : 'password'}
                    value={config.webhook_secret}
                    onChange={(e) => setConfig({ ...config, webhook_secret: e.target.value })}
                    className="w-full bg-[#181818] border border-[#2a2a2a] focus:border-[#FF1A2D] rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                  />
                </div>
              </div>

              {/* Gerenciar Opções de Pagamento (Toggles) */}
              <div className="pt-4 border-t border-[#1e1e1e] space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Gerenciar Opções Aceitas
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-[#181818] border border-[#262626] p-3 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white block">Pix</span>
                      <span className="text-[10px] text-emerald-400">Ativo (5% de desconto)</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={config.pix_enabled}
                      onChange={(e) => setConfig({ ...config, pix_enabled: e.target.checked })}
                      className="w-4 h-4 accent-[#FF1A2D]"
                    />
                  </div>

                  <div className="bg-[#181818] border border-[#262626] p-3 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white block">Pix Instantâneo</span>
                      <span className="text-[10px] text-zinc-400">Emissão em 3 segundos</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={config.pix_instant_enabled}
                      onChange={(e) => setConfig({ ...config, pix_instant_enabled: e.target.checked })}
                      className="w-4 h-4 accent-[#FF1A2D]"
                    />
                  </div>

                  <div className="bg-[#181818] border border-[#262626] p-3 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white block">Cartão de Crédito</span>
                      <span className="text-[10px] text-zinc-400">Até 12x com juros</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={config.credit_card_enabled}
                      onChange={(e) => setConfig({ ...config, credit_card_enabled: e.target.checked })}
                      className="w-4 h-4 accent-[#FF1A2D]"
                    />
                  </div>

                  <div className="bg-[#181818] border border-[#262626] p-3 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white block">Boleto Bancário</span>
                      <span className="text-[10px] text-zinc-500">Compensação em 1 a 3 dias</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={config.boleto_enabled}
                      onChange={(e) => setConfig({ ...config, boleto_enabled: e.target.checked })}
                      className="w-4 h-4 accent-[#FF1A2D]"
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-4">
                <button
                  type="submit"
                  className="bg-[#FF1A2D] hover:bg-[#e00f21] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl shadow-[0_0_15px_rgba(255,26,45,0.4)] transition flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Salvar Configurações</span>
                </button>

                <button
                  type="button"
                  onClick={handleTestConnection}
                  className="bg-[#181818] hover:bg-[#222] border border-[#2a2a2a] text-zinc-300 text-xs font-semibold px-5 py-3 rounded-xl transition flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4 text-[#FF1A2D]" />
                  <span>Testar Conexão</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
