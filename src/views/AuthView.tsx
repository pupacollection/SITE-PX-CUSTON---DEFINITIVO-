import React, { useState } from 'react';
import { PxLogo } from '../components/common/PxLogo';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { UserProfile } from '../types';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

interface AuthViewProps {
  onSuccess: (user: UserProfile) => void;
  onCancel: () => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ onSuccess, onCancel }) => {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessNotice(null);
    setLoading(true);

    try {
      if (isSupabaseConfigured) {
        if (mode === 'login') {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          if (error) throw error;
          if (data.user) {
            onSuccess({
              id: data.user.id,
              email: data.user.email || email,
              full_name: data.user.user_metadata?.full_name || 'Usuário PX',
              phone: data.user.user_metadata?.phone || '',
              role: (data.user.user_metadata?.role as any) || 'USER',
              is_verified: true,
              created_at: data.user.created_at,
            });
          }
        } else if (mode === 'register') {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                full_name: fullName,
                phone,
                role: 'USER',
              },
            },
          });
          if (error) throw error;
          setSuccessNotice('Cadastro iniciado! Verifique seu e-mail para confirmação.');
          if (data.user) {
            onSuccess({
              id: data.user.id,
              email: data.user.email || email,
              full_name: fullName || 'Novo Usuário',
              phone,
              role: 'USER',
              is_verified: false,
              created_at: new Date().toISOString(),
            });
          }
        } else if (mode === 'forgot') {
          const { error } = await supabase.auth.resetPasswordForEmail(email);
          if (error) throw error;
          setSuccessNotice('Instruções de recuperação de senha enviadas para seu e-mail.');
        }
      } else {
        // Fallback for Phase 1 preview before Supabase secrets are injected by user
        setTimeout(() => {
          onSuccess({
            id: 'usr-deivid-01',
            email: email || 'deivid@gmail.com',
            full_name: fullName || 'Deivid J. Silva',
            phone: phone || '(31) 9 9999-9999',
            role: 'SUPER_ADMIN',
            is_verified: true,
            created_at: new Date().toISOString(),
          });
        }, 600);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Erro ao realizar autenticação.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });
    } else {
      onSuccess({
        id: 'usr-google-deivid',
        email: 'deivid@gmail.com',
        full_name: 'Deivid J. Silva (Google)',
        phone: '(31) 9 9999-9999',
        role: 'SUPER_ADMIN',
        is_verified: true,
        created_at: new Date().toISOString(),
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background with Ambient Automotive Lighting */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1600&q=80)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/85 to-[#000000]/95" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#FF1A2D]/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Auth Card Container */}
      <div className="relative z-10 w-full max-w-md bg-[#111111]/90 backdrop-blur-xl border border-[#222] rounded-3xl p-6 sm:p-8 shadow-2xl">
        {/* Logo Badge */}
        <div className="flex flex-col items-center mb-6">
          <PxLogo size="lg" />
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white mt-4 font-heading text-center">
            {mode === 'login' && 'Seja bem-vindo!'}
            {mode === 'register' && 'Crie sua Conta'}
            {mode === 'forgot' && 'Recuperar Senha'}
          </h2>
          <p className="text-xs text-zinc-400 mt-1 text-center">
            {mode === 'login' && 'Acesse sua conta para continuar.'}
            {mode === 'register' && 'Cadastre-se para comprar ingressos oficiais PX CUSTON.'}
            {mode === 'forgot' && 'Informe seu e-mail para redefinir sua senha.'}
          </p>
        </div>

        {/* Notices */}
        {errorMessage && (
          <div className="mb-4 bg-red-950/50 border border-red-500/50 text-red-200 text-xs p-3 rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successNotice && (
          <div className="mb-4 bg-emerald-950/50 border border-emerald-500/50 text-emerald-200 text-xs p-3 rounded-xl flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{successNotice}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
                Nome Completo
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ex: Deivid J. Silva"
                className="w-full bg-[#181818] border border-[#2a2a2a] focus:border-[#FF1A2D] focus:outline-none rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 transition"
              />
            </div>
          )}

          <div>
            <label className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
              E-mail ou Usuário
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@exemplo.com"
                className="w-full bg-[#181818] border border-[#2a2a2a] focus:border-[#FF1A2D] focus:outline-none rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-zinc-500 transition"
              />
            </div>
          </div>

          {mode === 'register' && (
            <div>
              <label className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
                Telefone / WhatsApp
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(31) 9 9999-9999"
                className="w-full bg-[#181818] border border-[#2a2a2a] focus:border-[#FF1A2D] focus:outline-none rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 transition"
              />
            </div>
          )}

          {mode !== 'forgot' && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                  Senha
                </label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-[11px] text-[#FF1A2D] hover:underline"
                  >
                    Esqueceu sua senha?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#181818] border border-[#2a2a2a] focus:border-[#FF1A2D] focus:outline-none rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-zinc-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-zinc-500 hover:text-zinc-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FF1A2D] hover:bg-[#e00f21] disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl shadow-[0_0_15px_rgba(255,26,45,0.4)] transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <span>Processando...</span>
            ) : (
              <>
                <span>
                  {mode === 'login' && 'Entrar'}
                  {mode === 'register' && 'Cadastrar'}
                  {mode === 'forgot' && 'Enviar Link de Recuperação'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Divider "ou" */}
        {mode === 'login' && (
          <>
            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#262626]"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase">
                <span className="bg-[#111111] px-3 text-zinc-500 font-bold">ou</span>
              </div>
            </div>

            {/* Google Login */}
            <button
              onClick={handleGoogleLogin}
              type="button"
              className="w-full bg-[#181818] hover:bg-[#222] border border-[#2a2a2a] text-zinc-200 text-xs font-semibold py-2.5 rounded-xl transition flex items-center justify-center gap-3"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.4l3.7 2.9C6.5 7.4 9 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5.1 3.7-8.8z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.6 14.7c-.2-.7-.4-1.5-.4-2.3 0-.8.2-1.6.4-2.3L1.9 7.2C.7 9.6 0 12.2 0 15s.7 5.4 1.9 7.8l3.7-3.1z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.3L1.9 16c1.8 3.8 5.6 7 10.1 7z"
                />
              </svg>
              <span>Entrar com Google</span>
            </button>
          </>
        )}

        {/* Footer switch */}
        <div className="mt-6 text-center text-xs text-zinc-400">
          {mode === 'login' ? (
            <p>
              Não tem uma conta?{' '}
              <button
                onClick={() => setMode('register')}
                className="text-[#FF1A2D] font-bold hover:underline"
              >
                Cadastre-se
              </button>
            </p>
          ) : (
            <p>
              Já tem uma conta?{' '}
              <button
                onClick={() => setMode('login')}
                className="text-[#FF1A2D] font-bold hover:underline"
              >
                Voltar ao Login
              </button>
            </p>
          )}
        </div>

        <button
          onClick={onCancel}
          className="mt-4 w-full text-center text-xs text-zinc-500 hover:text-zinc-300 transition"
        >
          Continuar navegando como visitante
        </button>
      </div>
    </div>
  );
};
