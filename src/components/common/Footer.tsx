import React from 'react';
import { PxLogo } from './PxLogo';
import { ActiveScreen } from '../../types';
import { Instagram, Youtube, Facebook, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (screen: ActiveScreen) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#080808] border-t border-[#1a1a1a] text-zinc-400 text-xs pt-12 pb-24 md:pb-12">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center text-center">
        {/* Brand Emblem */}
        <div
          onClick={() => onNavigate('home')}
          className="cursor-pointer mb-3 transition hover:opacity-90"
        >
          <PxLogo size="lg" showSubtitle={true} />
        </div>

        {/* Mandatory Institutional Credit */}
        <div className="mt-8 mb-6 flex flex-col items-center">
          <p className="text-zinc-300 text-xs sm:text-sm font-medium tracking-wide">
            Este app Web foi desenvolvido 100% por{' '}
            <span className="text-white font-bold hover:text-[#FF1A2D] transition">Pupa Labs</span>.
          </p>
          
          <div className="mt-3 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141414] border border-[#262626]">
            <span className="text-[10px] tracking-widest text-[#FF1A2D] font-black uppercase">
              PUPA LABS
            </span>
            <span className="w-1 h-1 rounded-full bg-zinc-600"></span>
            <span className="text-[11px] text-zinc-400">Engenharia Digital & Software</span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-zinc-400 my-4">
          <button onClick={() => onNavigate('home')} className="hover:text-white transition">
            Início
          </button>
          <button onClick={() => onNavigate('events')} className="hover:text-white transition">
            Eventos
          </button>
          <button onClick={() => onNavigate('home')} className="hover:text-white transition">
            Sobre
          </button>
          <span className="text-zinc-700">|</span>
          <button onClick={() => onNavigate('home')} className="hover:text-white transition">
            Termos de Uso
          </button>
          <button onClick={() => onNavigate('home')} className="hover:text-white transition">
            Privacidade
          </button>
          <button onClick={() => onNavigate('home')} className="hover:text-white transition">
            Suporte
          </button>
          <span className="text-zinc-700">|</span>
          <button
            onClick={() => onNavigate('admin_dashboard')}
            className="text-zinc-500 hover:text-[#FF1A2D] transition flex items-center gap-1"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            PX CONTROL
          </button>
        </div>

        {/* Social Icons */}
        <div className="flex items-center justify-center gap-4 mt-4 mb-8">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-[#141414] hover:bg-[#FF1A2D] text-zinc-400 hover:text-white border border-[#242424] flex items-center justify-center transition"
            aria-label="Instagram PX CUSTON"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-[#141414] hover:bg-[#FF1A2D] text-zinc-400 hover:text-white border border-[#242424] flex items-center justify-center transition"
            aria-label="YouTube PX CUSTON"
          >
            <Youtube className="w-4 h-4" />
          </a>
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-[#141414] hover:bg-[#FF1A2D] text-zinc-400 hover:text-white border border-[#242424] flex items-center justify-center transition"
            aria-label="TikTok PX CUSTON"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.27 6.27 0 0 0 1.96-4.52V8.92a8.28 8.28 0 0 0 4.81 1.54V7.02c-.34-.02-.68-.13-1-.33z"/>
            </svg>
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-[#141414] hover:bg-[#FF1A2D] text-zinc-400 hover:text-white border border-[#242424] flex items-center justify-center transition"
            aria-label="Facebook PX CUSTON"
          >
            <Facebook className="w-4 h-4" />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-[11px] text-zinc-600">
          © {new Date().getFullYear()} PX CUSTON. Todos os direitos reservados. Plataforma oficial exclusiva.
        </p>
      </div>
    </footer>
  );
};
