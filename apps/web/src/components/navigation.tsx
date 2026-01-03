/**
 * Navigation Component
 * Sidebar navigation with menu items
 * 
 * Navigasyon Component'i
 * Menü öğeleri ile sidebar navigasyon
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../app/auth-context';
import {
  LayoutDashboard,
  Building2,
  FileText,
  Wallet,
  BarChart3,
  Bot,
  FileCheck,
  Settings,
  Menu,
  X,
  LogOut,
  ShoppingBag,
} from 'lucide-react';

const menuItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/stores', icon: Building2, label: 'Mağazalar' },
  { href: '/leases', icon: FileText, label: 'Sözleşmeler' },
  { href: '/expenses', icon: Wallet, label: 'Giderler' },
  { href: '/analytics', icon: BarChart3, label: 'Analitik' },
  { href: '/malls', icon: ShoppingBag, label: "AVM'ler" },
  { href: '/leasing-manager', icon: FileText, label: 'Kiralama Yön.' },
  { href: '/ai-assistant', icon: Bot, label: 'AI Asistan' },
  { href: '/translation', icon: FileCheck, label: 'Çeviri' },
  { href: '/settings', icon: Settings, label: 'Ayarlar' },
];

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 text-white"
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-white/10 backdrop-blur-lg border-r border-white/20 z-40 transform transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full p-6">
          {/* Logo */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white">BASIS</h1>
            <p className="text-sm text-white/70">Rental Management</p>
          </div>

          {/* User Info */}
          {user && (
            <div className="mb-6 p-3 bg-white/5 rounded-lg">
              <p className="text-white font-medium text-sm">{user.firstName} {user.lastName}</p>
              <p className="text-white/70 text-xs">{user.email}</p>
            </div>
          )}

          {/* Menu Items */}
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition mt-auto"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Çıkış Yap</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
