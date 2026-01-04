/**
 * Navigation Component - Premium Glassmorphic Design
 * macOS Big Sur Inspired Shell with Theme & Language Support
 */

'use client';

import { useAuth } from '../contexts/auth-context';
import { useLanguage } from '../contexts/language-context';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Building2, 
  FileText, 
  BarChart3, 
  Bot, 
  ShoppingBag,
  Home,
  Settings,
  LogOut,
  Menu,
  X,
  Wallet,
  Search,
  Bell,
  ChevronDown,
  Sparkles,
  Zap,
  Briefcase,
  Target,
  Shield,
  Languages
} from 'lucide-react';
import { useState } from 'react';
import { ThemeSelector } from './ui/theme-selector';
import { LanguageSelector } from './ui/language-selector';

export function Navigation() {
  const { user, logout, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const pathname = usePathname();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!isAuthenticated) {
    return null;
  }

  const navItems = [
    { name: t('nav.dashboard'), href: '/dashboard', icon: Home },
    { name: t('nav.stores'), href: '/stores', icon: Building2 },
    { name: t('nav.leases'), href: '/leases', icon: FileText },
    { name: t('nav.expenses'), href: '/expenses', icon: Wallet },
    { name: t('nav.budget'), href: '/budget', icon: Target },
    { name: t('nav.risk'), href: '/risk', icon: Shield },
    { name: t('nav.analytics'), href: '/analytics', icon: BarChart3 },
    { name: t('nav.malls'), href: '/malls', icon: ShoppingBag },
    { name: t('nav.aiAssistant'), href: '/ai-assistant', icon: Bot, badge: 'AI' },
    { name: t('nav.translation'), href: '/translation', icon: Languages },
    { name: t('nav.leasingManager'), href: '/leasing-manager', icon: Briefcase },
  ];

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <>
      {/* TOP BAR - Glassmorphic */}
      <div className="fixed top-0 left-0 right-0 h-16 glass-strong border-b border-white/10 z-50 backdrop-blur-xl">
        <div className="h-full flex items-center justify-between px-6">
          {/* Left Section */}
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link href="/dashboard" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#00d4ff] to-[#00e5cc] flex items-center justify-center text-white font-bold text-lg shadow-xl glow-primary group-hover:scale-105 transition-transform">
                B
              </div>
              <div className="hidden lg:block">
                <span className="text-lg font-bold text-white text-shadow">BASIS</span>
              </div>
            </Link>

            {/* Version Badge */}
            <div className="badge-glass hidden md:flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#00d4ff]" />
              <span>v0.4.0</span>
            </div>
          </div>

          {/* Center Section - Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder={t('common.search')}
                className="w-full pl-12 pr-4 py-3 search-glass text-sm text-white placeholder-white/40 focus-glass transition-smooth rounded-full"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Theme Selector */}
            <div className="hidden md:block">
              <ThemeSelector />
            </div>

            {/* Language Selector */}
            <div className="hidden md:block">
              <LanguageSelector />
            </div>

            {/* Notifications */}
            <button 
              className="relative btn-glass !p-2.5"
              title={t('common.notifications')}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#ff006e] rounded-full glow-pink animate-pulse" />
            </button>

            {/* User Menu */}
            <div className="hidden md:flex items-center gap-3 glass-strong px-4 py-2 rounded-full hover:glass transition-smooth cursor-pointer group">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#00e5cc] flex items-center justify-center text-white font-semibold text-sm shadow-lg glow-primary">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-white">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-white/50">{user?.role}</p>
              </div>
              <ChevronDown className="w-4 h-4 text-white/50 group-hover:text-white/80 transition-colors" />
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden btn-glass !p-2.5"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* SIDEBAR - Glassmorphic */}
      <aside className={`fixed top-16 left-0 bottom-0 glass-strong border-r border-white/10 z-40 transition-all duration-300 hidden md:block backdrop-blur-xl ${
        sidebarCollapsed ? 'w-20' : 'w-64'
      }`}>
        <div className="h-full flex flex-col p-4">
          {/* Navigation Items */}
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-smooth group relative overflow-hidden ${
                  isActive(item.href)
                    ? 'nav-active'
                    : 'glass-light hover:glass'
                }`}
                title={sidebarCollapsed ? item.name : undefined}
              >
                {/* Active indicator glow */}
                {isActive(item.href) && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00d4ff]/10 to-transparent" />
                )}
                
                <div className={`relative z-10 w-6 h-6 flex items-center justify-center ${
                  isActive(item.href) ? 'text-[#00d4ff]' : 'text-white/60 group-hover:text-white'
                }`}>
                  <item.icon className="w-5 h-5" />
                </div>
                
                {!sidebarCollapsed && (
                  <>
                    <span className={`text-sm font-medium transition-smooth ${
                      isActive(item.href) ? 'text-white' : 'text-white/70 group-hover:text-white'
                    }`}>
                      {item.name}
                    </span>
                    
                    {item.badge && (
                      <div className="ml-auto badge-glass !px-2 !py-0.5 flex items-center gap-1">
                        <Zap className="w-3 h-3 text-[#00e5cc]" />
                        <span className="text-[10px] font-bold">{item.badge}</span>
                      </div>
                    )}
                  </>
                )}
              </Link>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div className="space-y-2 pt-4 border-t border-white/10">
            <Link
              href="/settings"
              className="flex items-center gap-3 px-4 py-3 glass-light rounded-2xl hover:glass transition-smooth group"
              title={sidebarCollapsed ? t('nav.settings') : undefined}
            >
              <Settings className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
              {!sidebarCollapsed && (
                <span className="text-sm font-medium text-white/70 group-hover:text-white">
                  {t('nav.settings')}
                </span>
              )}
            </Link>
            
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-3 glass-light rounded-2xl hover:bg-red-500/10 hover:border-red-500/30 transition-smooth group"
              title={sidebarCollapsed ? t('nav.logout') : undefined}
            >
              <LogOut className="w-5 h-5 text-white/60 group-hover:text-red-400 transition-colors" />
              {!sidebarCollapsed && (
                <span className="text-sm font-medium text-white/70 group-hover:text-red-400">
                  {t('nav.logout')}
                </span>
              )}
            </button>

            {/* Collapse Toggle */}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-full flex items-center justify-center py-2 glass-light rounded-2xl hover:glass transition-smooth"
            >
              <ChevronDown className={`w-4 h-4 text-white/60 transition-transform duration-300 ${
                sidebarCollapsed ? 'rotate-90' : '-rotate-90'
              }`} />
            </button>
          </div>
        </div>
      </aside>

      {/* MOBILE MENU - Glassmorphic */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 animate-fade-in">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="absolute top-16 left-0 right-0 glass-strong border-b border-white/10 backdrop-blur-xl">
            <div className="p-4 space-y-2 max-h-[calc(100vh-4rem)] overflow-y-auto">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-smooth ${
                    isActive(item.href)
                      ? 'nav-active'
                      : 'glass-light hover:glass'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${
                    isActive(item.href) ? 'text-[#00d4ff]' : 'text-white/60'
                  }`} />
                  <span className={`text-sm font-medium ${
                    isActive(item.href) ? 'text-white' : 'text-white/70'
                  }`}>
                    {item.name}
                  </span>
                  {item.badge && (
                    <div className="ml-auto badge-glass">
                      {item.badge}
                    </div>
                  )}
                </Link>
              ))}
              
              <div className="pt-3 mt-3 border-t border-white/10 space-y-2">
                {/* Mobile Theme & Language Selectors */}
                <div className="flex gap-2 px-4">
                  <div className="flex-1">
                    <ThemeSelector />
                  </div>
                  <div className="flex-1">
                    <LanguageSelector />
                  </div>
                </div>
                
                <Link
                  href="/settings"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 glass-light rounded-2xl hover:glass transition-smooth"
                >
                  <Settings className="w-5 h-5 text-white/60" />
                  <span className="text-sm font-medium text-white/70">{t('nav.settings')}</span>
                </Link>
                
                <button
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="w-full flex items-center gap-3 px-4 py-3 glass-light rounded-2xl hover:bg-red-500/10 hover:border-red-500/30 transition-smooth"
                >
                  <LogOut className="w-5 h-5 text-white/60" />
                  <span className="text-sm font-medium text-white/70">{t('nav.logout')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
