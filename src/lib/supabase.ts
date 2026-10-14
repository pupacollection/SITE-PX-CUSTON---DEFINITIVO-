import { createClient } from '@supabase/supabase-js';

// Environment variables for Supabase integration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured && typeof window !== 'undefined') {
  // Inform developer/administrator that Supabase credentials are in pending configuration state
  console.info(
    'ℹ️ [PX CUSTON] Supabase: Variáveis VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY não detectadas. O sistema está preparado para conectar assim que configuradas na Fase 2.'
  );
}

// Fallback dummy URL to prevent createClient throwing immediately when initializing in development mode
const effectiveUrl = isSupabaseConfigured ? supabaseUrl : 'https://px-custon-placeholder.supabase.co';
const effectiveKey = isSupabaseConfigured ? supabaseAnonKey : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy';

export const supabase = createClient(effectiveUrl, effectiveKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
