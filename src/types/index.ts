/**
 * PX CUSTON — Tipos e Modelos de Domínio
 * Alinhado à arquitetura de banco de dados Supabase e especificações do sistema.
 */

export type UserRole = 'USER' | 'CHECKIN_OPERATOR' | 'ADMIN' | 'SUPER_ADMIN';

export type TicketStatus = 'pending' | 'paid' | 'cancelled' | 'refunded' | 'used' | 'expired';

export type PaymentMethod = 'pix' | 'credit_card' | 'boleto';

export type PaymentStatus = 'pending' | 'approved' | 'in_process' | 'rejected' | 'refunded' | 'cancelled';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  avatar_url?: string;
  cpf?: string;
  role: UserRole;
  is_verified: boolean;
  created_at: string;
  vehicles?: UserVehicle[];
}

export interface UserVehicle {
  id: string;
  user_id: string;
  model: string;
  year: number;
  license_plate: string;
  photo_url?: string;
}

export interface TicketBatch {
  id: string;
  event_id: string;
  name: string; // 'Pista', 'Camarote', 'VIP'
  description: string;
  price: number;
  total_quantity: number;
  available_quantity: number;
  is_active: boolean;
}

export interface EventItem {
  id: string;
  title: string;
  slug: string;
  subtitle?: string;
  date: string;
  formatted_date: string;
  location: string;
  city: string;
  state: string;
  min_price: number;
  cover_image: string;
  gallery_images?: string[];
  description: string;
  tags: string[];
  classification: string;
  rules: string[];
  is_official: boolean;
  status: 'draft' | 'published' | 'finished';
  ticket_batches: TicketBatch[];
}

export interface Ticket {
  id: string;
  code: string; // Ex: PX-7AI89C10
  order_id: string;
  user_id: string;
  event_id: string;
  batch_id: string;
  event_title: string;
  event_date: string;
  event_location: string;
  batch_name: string;
  holder_name: string;
  holder_doc?: string;
  price: number;
  status: TicketStatus;
  qr_payload: string;
  checkin_at?: string;
  created_at: string;
}

export interface OrderItem {
  batch_id: string;
  batch_name: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
}

export interface Order {
  id: string;
  user_id: string;
  event_id: string;
  event_title: string;
  items: OrderItem[];
  subtotal: number;
  convenience_fee: number;
  discount: number;
  total: number;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  mercado_pago_id?: string;
  created_at: string;
}

export interface MercadoPagoConfig {
  environment: 'sandbox' | 'production';
  public_key: string;
  access_token: string;
  webhook_secret: string;
  pix_enabled: boolean;
  pix_instant_enabled: boolean;
  credit_card_enabled: boolean;
  boleto_enabled: boolean;
  is_connected: boolean;
}

export interface CheckinStat {
  total_tickets: number;
  checked_in: number;
  remaining: number;
  last_checkins: {
    ticket_code: string;
    holder_name: string;
    batch_name: string;
    timestamp: string;
    status: 'success' | 'already_used' | 'invalid';
  }[];
}

export type ActiveScreen =
  | 'home'
  | 'mobile_app'
  | 'events'
  | 'event_detail'
  | 'auth'
  | 'profile'
  | 'checkout'
  | 'digital_ticket'
  | 'checkin'
  | 'admin_dashboard'
  | 'admin_payments'
  | 'admin_cache';
