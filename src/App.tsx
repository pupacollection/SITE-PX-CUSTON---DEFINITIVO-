import React, { useState } from 'react';
import {
  ActiveScreen,
  EventItem,
  Ticket,
  TicketBatch,
  UserProfile,
  MercadoPagoConfig,
} from './types';
import {
  INITIAL_EVENTS,
  INITIAL_USER,
  INITIAL_TICKETS,
  INITIAL_MERCADO_PAGO_CONFIG,
} from './data/initialData';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { BottomNav } from './components/common/BottomNav';
import { PWAInstallPrompt } from './components/common/PWAInstallPrompt';
import { OfflineBanner } from './components/common/OfflineBanner';

// Views
import { HomeView } from './views/HomeView';
import { MobileAppView } from './views/MobileAppView';
import { EventsCatalogView } from './views/EventsCatalogView';
import { EventDetailView } from './views/EventDetailView';
import { AuthView } from './views/AuthView';
import { ProfileView } from './views/ProfileView';
import { CheckoutView } from './views/CheckoutView';
import { DigitalTicketView } from './views/DigitalTicketView';
import { CheckinView } from './views/CheckinView';
import { AdminDashboardView } from './views/AdminDashboardView';
import { PaymentSettingsView } from './views/PaymentSettingsView';
import { CacheMaintenanceView } from './views/CacheMaintenanceView';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ActiveScreen>('home');
  const [user, setUser] = useState<UserProfile | null>(INITIAL_USER);
  const [events, setEvents] = useState<EventItem[]>(INITIAL_EVENTS);
  const [selectedEvent, setSelectedEvent] = useState<EventItem>(INITIAL_EVENTS[0]);
  const [selectedBatches, setSelectedBatches] = useState<{ batch: TicketBatch; quantity: number }[]>([
    { batch: INITIAL_EVENTS[0].ticket_batches[0], quantity: 2 },
  ]);
  const [tickets, setTickets] = useState<Ticket[]>(INITIAL_TICKETS);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(INITIAL_TICKETS[0]);
  const [mercadoPagoConfig, setMercadoPagoConfig] = useState<MercadoPagoConfig>(INITIAL_MERCADO_PAGO_CONFIG);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Navigation handlers
  const handleNavigate = (screen: ActiveScreen) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectEvent = (event: EventItem) => {
    setSelectedEvent(event);
    setSelectedBatches([
      { batch: event.ticket_batches[0], quantity: 2 },
    ]);
    setCurrentScreen('event_detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProceedToCheckout = (
    event: EventItem,
    batches: { batch: TicketBatch; quantity: number }[]
  ) => {
    setSelectedEvent(event);
    setSelectedBatches(batches);
    setCurrentScreen('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCheckoutSuccess = (newTickets: Ticket[]) => {
    setTickets((prev) => [...newTickets, ...prev]);
    setSelectedTicket(newTickets[0]);
    setCurrentScreen('digital_ticket');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateProfile = (updated: Partial<UserProfile>) => {
    if (user) {
      setUser({ ...user, ...updated });
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen('home');
  };

  // Check if current screen is admin or standalone to conditionally adapt footer/header
  const isDedicatedAdmin = currentScreen === 'admin_dashboard';

  return (
    <div className="min-h-screen bg-[#000000] text-white flex flex-col font-sans selection:bg-[#FF1A2D] selection:text-white">
      {/* Network offline warning */}
      <OfflineBanner />

      {/* PWA Install Button & iOS guide */}
      <PWAInstallPrompt />

      {/* Header bar (shown on all views except full admin dashboard which has dedicated sidebar) */}
      {!isDedicatedAdmin && (
        <Header
          currentScreen={currentScreen}
          onNavigate={handleNavigate}
          user={user}
          onOpenAuth={() => setAuthModalOpen(true)}
          onLogout={handleLogout}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1">
        {currentScreen === 'home' && (
          <HomeView
            events={events}
            onSelectEvent={handleSelectEvent}
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === 'mobile_app' && (
          <MobileAppView
            events={events}
            user={user}
            onSelectEvent={handleSelectEvent}
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === 'events' && (
          <EventsCatalogView
            events={events}
            onSelectEvent={handleSelectEvent}
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === 'event_detail' && (
          <EventDetailView
            event={selectedEvent}
            onBack={() => handleNavigate('events')}
            onProceedToCheckout={handleProceedToCheckout}
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === 'auth' && (
          <AuthView
            onSuccess={(loggedUser) => {
              setUser(loggedUser);
              handleNavigate('profile');
            }}
            onCancel={() => handleNavigate('home')}
          />
        )}

        {currentScreen === 'profile' && user && (
          <ProfileView
            user={user}
            tickets={tickets}
            onUpdateProfile={handleUpdateProfile}
            onSelectTicket={(tkt) => {
              setSelectedTicket(tkt);
              handleNavigate('digital_ticket');
            }}
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />
        )}

        {currentScreen === 'checkout' && (
          <CheckoutView
            event={selectedEvent}
            selectedBatches={selectedBatches}
            user={user}
            onSuccess={handleCheckoutSuccess}
            onCancel={() => handleNavigate('event_detail')}
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === 'digital_ticket' && (
          <DigitalTicketView
            tickets={tickets}
            selectedTicket={selectedTicket}
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === 'checkin' && (
          <CheckinView
            tickets={tickets}
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === 'admin_dashboard' && (
          <AdminDashboardView
            events={events}
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === 'admin_payments' && (
          <PaymentSettingsView
            initialConfig={mercadoPagoConfig}
            onSave={(cfg) => setMercadoPagoConfig(cfg)}
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === 'admin_cache' && (
          <CacheMaintenanceView
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Floating Auth Modal when triggered via header */}
      {authModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md">
            <AuthView
              onSuccess={(loggedUser) => {
                setUser(loggedUser);
                setAuthModalOpen(false);
              }}
              onCancel={() => setAuthModalOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Bottom Nav for mobile screens */}
      {!isDedicatedAdmin && (
        <BottomNav
          currentScreen={currentScreen}
          onNavigate={handleNavigate}
          isOperator={user?.role === 'CHECKIN_OPERATOR' || user?.role === 'SUPER_ADMIN'}
        />
      )}

      {/* Footer with official Pupa Labs credit and brand links */}
      {!isDedicatedAdmin && <Footer onNavigate={handleNavigate} />}
    </div>
  );
}
