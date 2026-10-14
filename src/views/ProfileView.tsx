import React, { useState } from 'react';
import { UserProfile, Ticket, ActiveScreen } from '../types';
import {
  User,
  Ticket as TicketIcon,
  ShoppingBag,
  Car,
  Bell,
  Settings,
  LogOut,
  CheckCircle2,
  Clock,
  CarFront,
  ArrowRight,
  ShieldCheck,
  Save,
} from 'lucide-react';

interface ProfileViewProps {
  user: UserProfile;
  tickets: Ticket[];
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onSelectTicket: (ticket: Ticket) => void;
  onNavigate: (screen: ActiveScreen) => void;
  onLogout: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  tickets,
  onUpdateProfile,
  onSelectTicket,
  onNavigate,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'tickets' | 'orders' | 'vehicles'>('profile');
  const [subTab, setSubTab] = useState<'personal' | 'vehicles' | 'address'>('personal');

  // Form states
  const [fullName, setFullName] = useState(user.full_name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // New vehicle modal/state
  const [vehicles, setVehicles] = useState(user.vehicles || []);
  const [newVehicleModel, setNewVehicleModel] = useState('');
  const [newVehiclePlate, setNewVehiclePlate] = useState('');
  const [showAddVehicle, setShowAddVehicle] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      full_name: fullName,
      phone,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVehicleModel || !newVehiclePlate) return;
    const added = {
      id: `veh-${Date.now()}`,
      user_id: user.id,
      model: newVehicleModel,
      year: 2020,
      license_plate: newVehiclePlate.toUpperCase(),
      photo_url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=400&q=80',
    };
    const updated = [...vehicles, added];
    setVehicles(updated);
    onUpdateProfile({ vehicles: updated });
    setNewVehicleModel('');
    setNewVehiclePlate('');
    setShowAddVehicle(false);
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Left Sidebar Navigation */}
        <div className="md:col-span-1 space-y-2">
          {/* User mini summary badge */}
          <div className="bg-[#121212] border border-[#222] p-4 rounded-2xl flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-[#FF1A2D] text-white font-black text-lg flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(255,26,45,0.4)]">
              {user.full_name.charAt(0)}
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold truncate text-white">{user.full_name}</h3>
              <p className="text-[11px] text-zinc-400 truncate">{user.email}</p>
              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-semibold mt-0.5">
                <CheckCircle2 className="w-3 h-3" /> Verificado
              </span>
            </div>
          </div>

          <div className="bg-[#121212] border border-[#222] rounded-2xl p-2 space-y-1">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 transition ${
                activeTab === 'profile'
                  ? 'bg-[#FF1A2D] text-white shadow-[0_0_15px_rgba(255,26,45,0.4)]'
                  : 'text-zinc-400 hover:text-white hover:bg-[#181818]'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Meu Perfil</span>
            </button>

            <button
              onClick={() => setActiveTab('tickets')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 transition ${
                activeTab === 'tickets'
                  ? 'bg-[#FF1A2D] text-white shadow-[0_0_15px_rgba(255,26,45,0.4)]'
                  : 'text-zinc-400 hover:text-white hover:bg-[#181818]'
              }`}
            >
              <TicketIcon className="w-4 h-4" />
              <span>Meus Ingressos</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 transition ${
                activeTab === 'orders'
                  ? 'bg-[#FF1A2D] text-white shadow-[0_0_15px_rgba(255,26,45,0.4)]'
                  : 'text-zinc-400 hover:text-white hover:bg-[#181818]'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Meus Pedidos</span>
            </button>

            <button
              onClick={() => setActiveTab('vehicles')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 transition ${
                activeTab === 'vehicles'
                  ? 'bg-[#FF1A2D] text-white shadow-[0_0_15px_rgba(255,26,45,0.4)]'
                  : 'text-zinc-400 hover:text-white hover:bg-[#181818]'
              }`}
            >
              <Car className="w-4 h-4" />
              <span>Meus Veículos</span>
            </button>

            <button
              onClick={() => onNavigate('home')}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 text-zinc-400 hover:text-white hover:bg-[#181818] transition"
            >
              <Bell className="w-4 h-4" />
              <span>Notificações</span>
            </button>

            <button
              onClick={() => onNavigate('admin_payments')}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 text-zinc-400 hover:text-white hover:bg-[#181818] transition"
            >
              <Settings className="w-4 h-4" />
              <span>Configurações</span>
            </button>

            <div className="pt-2 border-t border-[#1e1e1e]">
              <button
                onClick={onLogout}
                className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 text-red-400 hover:bg-red-950/30 transition"
              >
                <LogOut className="w-4 h-4" />
                <span>Sair</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Main Content */}
        <div className="md:col-span-3 space-y-6">
          {activeTab === 'profile' && (
            <div className="bg-[#121212] border border-[#222] rounded-3xl p-6 sm:p-8">
              <h2 className="text-xl font-black uppercase tracking-tight text-white font-heading">
                Meu Perfil
              </h2>

              {/* Sub-tabs: Dados Pessoais | Meus Veículos | Endereço */}
              <div className="flex items-center gap-3 border-b border-[#222] mt-4 mb-6">
                <button
                  onClick={() => setSubTab('personal')}
                  className={`pb-2.5 text-xs font-bold uppercase tracking-wider transition border-b-2 ${
                    subTab === 'personal'
                      ? 'border-[#FF1A2D] text-[#FF1A2D]'
                      : 'border-transparent text-zinc-400 hover:text-white'
                  }`}
                >
                  Dados Pessoais
                </button>
                <button
                  onClick={() => setSubTab('vehicles')}
                  className={`pb-2.5 text-xs font-bold uppercase tracking-wider transition border-b-2 ${
                    subTab === 'vehicles'
                      ? 'border-[#FF1A2D] text-[#FF1A2D]'
                      : 'border-transparent text-zinc-400 hover:text-white'
                  }`}
                >
                  Meus Veículos ({vehicles.length})
                </button>
                <button
                  onClick={() => setSubTab('address')}
                  className={`pb-2.5 text-xs font-bold uppercase tracking-wider transition border-b-2 ${
                    subTab === 'address'
                      ? 'border-[#FF1A2D] text-[#FF1A2D]'
                      : 'border-transparent text-zinc-400 hover:text-white'
                  }`}
                >
                  Endereço
                </button>
              </div>

              {savedSuccess && (
                <div className="mb-4 bg-emerald-950/50 border border-emerald-500/50 text-emerald-200 text-xs p-3 rounded-xl flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Dados atualizados com sucesso no Supabase!</span>
                </div>
              )}

              {subTab === 'personal' && (
                <form onSubmit={handleSave} className="space-y-4 max-w-lg">
                  <div>
                    <label className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-[#181818] border border-[#2a2a2a] focus:border-[#FF1A2D] focus:outline-none rounded-xl px-3.5 py-2.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
                      E-mail (Supabase Auth)
                    </label>
                    <input
                      type="email"
                      disabled
                      value={email}
                      className="w-full bg-[#151515] border border-[#222] text-zinc-500 rounded-xl px-3.5 py-2.5 text-xs cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
                      Telefone
                    </label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#181818] border border-[#2a2a2a] focus:border-[#FF1A2D] focus:outline-none rounded-xl px-3.5 py-2.5 text-xs text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-[#FF1A2D] hover:bg-[#e00f21] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl shadow transition flex items-center gap-2 mt-4"
                  >
                    <Save className="w-4 h-4" />
                    <span>Atualizar Perfil</span>
                  </button>
                </form>
              )}

              {subTab === 'vehicles' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-zinc-400">
                      Cadastre seu projeto automotivo para encontros e exposições oficiais.
                    </p>
                    <button
                      onClick={() => setShowAddVehicle(!showAddVehicle)}
                      className="bg-[#181818] hover:bg-[#222] border border-[#333] text-xs font-semibold px-3 py-1.5 rounded-lg text-white"
                    >
                      + Adicionar Veículo
                    </button>
                  </div>

                  {showAddVehicle && (
                    <form onSubmit={handleAddVehicle} className="bg-[#181818] p-4 rounded-xl border border-[#2a2a2a] space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] text-zinc-400 uppercase block mb-1">Modelo do Carro</label>
                          <input
                            type="text"
                            placeholder="Ex: Chevrolet Classic 2012"
                            value={newVehicleModel}
                            onChange={(e) => setNewVehicleModel(e.target.value)}
                            className="w-full bg-[#121212] border border-[#333] text-xs p-2 rounded-lg text-white"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-zinc-400 uppercase block mb-1">Placa</label>
                          <input
                            type="text"
                            placeholder="Ex: KXX-1234"
                            value={newVehiclePlate}
                            onChange={(e) => setNewVehiclePlate(e.target.value)}
                            className="w-full bg-[#121212] border border-[#333] text-xs p-2 rounded-lg text-white uppercase"
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="bg-[#FF1A2D] text-xs font-bold text-white px-4 py-2 rounded-lg"
                      >
                        Salvar Veículo
                      </button>
                    </form>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {vehicles.map((v) => (
                      <div key={v.id} className="bg-[#181818] border border-[#262626] p-4 rounded-2xl flex items-center gap-3">
                        <img
                          src={v.photo_url || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=400&q=80'}
                          alt={v.model}
                          className="w-16 h-16 rounded-xl object-cover shrink-0 border border-[#333]"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-white truncate">{v.model}</h4>
                          <p className="text-[11px] text-zinc-400 mt-0.5">Placa: <span className="text-zinc-200 font-mono font-semibold">{v.license_plate}</span></p>
                          <button className="text-[10px] text-[#FF1A2D] font-bold uppercase mt-1 hover:underline">
                            Gerenciar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {subTab === 'address' && (
                <div className="text-xs text-zinc-400 py-6">
                  <p>Manhuaçu / MG — Brasil</p>
                  <p className="text-[11px] text-zinc-500 mt-1">Endereço principal salvo para emissão de notas fiscais e credenciais.</p>
                </div>
              )}
            </div>
          )}

          {/* Meus Ingressos Recentes (Screen 04 Bottom Module) */}
          <div className="bg-[#121212] border border-[#222] rounded-3xl p-6 sm:p-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-black uppercase tracking-tight text-white font-heading">
                Meus Ingressos Recentes
              </h3>
              <button
                onClick={() => onNavigate('digital_ticket')}
                className="text-xs text-[#FF1A2D] font-bold hover:underline"
              >
                Ver Todos →
              </button>
            </div>

            <div className="space-y-3">
              {tickets.map((tkt) => (
                <div
                  key={tkt.id}
                  className="bg-[#181818] border border-[#262626] hover:border-[#333] p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#222] flex items-center justify-center text-[#FF1A2D] shrink-0 border border-[#333]">
                      <TicketIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-white uppercase">{tkt.event_title}</h4>
                      <p className="text-xs text-zinc-400 mt-0.5">{tkt.event_date}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-[10px] font-mono text-zinc-400 bg-[#111] px-2 py-0.5 rounded border border-[#222]">
                          {tkt.code}
                        </span>
                        {tkt.status === 'paid' ? (
                          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Confirmado
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-amber-400 bg-amber-950/40 border border-amber-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Clock className="w-3 h-3" /> Pendente
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onSelectTicket(tkt);
                      onNavigate('digital_ticket');
                    }}
                    className="bg-[#242424] hover:bg-[#FF1A2D] hover:text-white text-zinc-200 text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl border border-[#333] hover:border-transparent transition flex items-center justify-center gap-1.5"
                  >
                    <span>Ver Ingresso</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
