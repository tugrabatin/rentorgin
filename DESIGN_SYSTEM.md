# LeaseOps AI Design System
## macOS Big Sur Inspired Glassmorphism

**Version:** 0.4.0  
**Style:** Premium Glassmorphic Desktop SaaS  
**Inspiration:** macOS Big Sur, Adobe CC, Modern Enterprise Apps

---

## 🎨 Color Tokens

### Background
```css
--color-bg-gradient-start: #0a0e27  /* Deep Navy */
--color-bg-gradient-end: #1a0b2e    /* Dark Purple */
```

### Primary Colors
```css
--color-primary: #00d4ff           /* Electric Cyan */
--color-primary-glow: rgba(0, 212, 255, 0.5)
--color-secondary: #00e5cc         /* Teal */
```

### Accent Colors
```css
--color-accent-pink: #ff006e      /* Magenta */
--color-accent-orange: #ff6b35    /* Vibrant Orange */
```

### Glass Tokens
```css
--glass-bg: rgba(255, 255, 255, 0.05)
--glass-bg-strong: rgba(255, 255, 255, 0.08)
--glass-border: rgba(255, 255, 255, 0.1)
--glass-border-strong: rgba(255, 255, 255, 0.18)
--glass-shadow: rgba(0, 0, 0, 0.3)
```

---

## 🧩 Components

### 1. Glass Panel
**Usage:** Sidebar, Top bar, Cards

**Properties:**
- Background: `rgba(255, 255, 255, 0.05)`
- Backdrop blur: `20px`
- Border: `1px solid rgba(255, 255, 255, 0.1)`
- Border radius: `16px`
- Shadow: `0 8px 32px rgba(0, 0, 0, 0.3)`

**Variants:**
- `.glass` - Default glass panel
- `.glass-strong` - More opaque for main containers
- `.glass-light` - More transparent for subtle elements

**Hover State:**
- Background: `rgba(255, 255, 255, 0.08)`
- Border: `rgba(255, 255, 255, 0.2)`
- Shadow: `0 12px 48px rgba(0, 0, 0, 0.4)`
- Transform: `translateY(-2px) scale(1.01)`

---

### 2. KPI Metric Card
**Purpose:** Display key performance indicators

**Structure:**
```tsx
<div className="glass-card metric-blue">
  <Icon gradient="from-blue-500 to-cyan-500" />
  <TrendIndicator value="+2" direction="up" />
  <Label>Toplam Mağaza</Label>
  <Value>12</Value>
</div>
```

**Gradient Variants:**
- `metric-blue` - Stores, General metrics
- `metric-green` - Active contracts, Success
- `metric-yellow` - Pending items, Warnings
- `metric-purple` - Malls, Premium features

---

### 3. Quick Access Tile
**Purpose:** Navigation shortcuts

**Features:**
- Floating icon bubble with gradient
- Title & description
- Arrow button on hover
- Background gradient on hover
- Smooth scale animation

**States:**
- Default: Glass background, subtle shadow
- Hover: Gradient overlay, icon rotation, arrow slide
- Active: Brightness increase, glow effect

---

### 4. Hero Banner
**Purpose:** Dashboard greeting area

**Elements:**
- Gradient background with animated blobs
- Badge pills with icons
- Large greeting text with gradient name
- Subtitle text
- Floating decorative elements

**Animation:**
- Rotating gradient background (20s)
- Floating blobs (3s ease-in-out)

---

### 5. Navigation Sidebar
**Structure:**
- Fixed position, 64px from top
- Width: 256px (expanded), 80px (collapsed)
- Glass panel with backdrop blur

**Nav Item States:**
- Default: `glass-light`, white/60 icon
- Hover: `glass`, white icon
- Active: `nav-active` class with cyan border & glow

**Bottom Actions:**
- Settings button
- Logout button (red hover)
- Collapse toggle

---

### 6. Top Bar
**Layout:**
- Logo + version badge (left)
- Search bar (center)
- Language, notifications, profile (right)

**Search Bar:**
- Pill-shaped glass with inner shadow
- 20px blur, subtle glow
- Focus state: cyan border & glow

**Profile:**
- Avatar with gradient background
- Name & role display
- Dropdown chevron

---

## 📐 Spacing & Sizing

### Border Radius
- Cards: `16px` (rounded-2xl)
- Hero: `24px` (rounded-3xl)
- Buttons: `9999px` (rounded-full)
- Icons: `12-16px`

### Padding
- Cards: `24px` (p-6)
- Hero: `32px` (p-8)
- Nav items: `14px 16px` (py-3.5 px-4)

### Shadows
- Default: `0 8px 32px rgba(0, 0, 0, 0.3)`
- Hover: `0 12px 48px rgba(0, 0, 0, 0.4)`
- Strong: `0 16px 64px rgba(0, 0, 0, 0.5)`

---

## ✨ Effects & Animations

### Glow Effects
```css
.glow-primary {
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.4),
              0 0 40px rgba(0, 212, 255, 0.2);
}

.glow-secondary {
  box-shadow: 0 0 20px rgba(0, 229, 204, 0.4),
              0 0 40px rgba(0, 229, 204, 0.2);
}

.glow-pink {
  box-shadow: 0 0 20px rgba(255, 0, 110, 0.4),
              0 0 40px rgba(255, 0, 110, 0.2);
}
```

### Gradient Text
```css
.gradient-text {
  background: linear-gradient(135deg, #00d4ff 0%, #00e5cc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

### Floating Animation
```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
```

### Transitions
- Duration: `300ms`
- Timing: `cubic-bezier(0.4, 0, 0.2, 1)`
- Properties: `all` or specific (transform, opacity, colors)

---

## 🔤 Typography

### Font Family
```css
font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', 'Roboto', sans-serif;
```

### Scale
- Hero Heading: `36px` (text-4xl), font-bold
- Section Heading: `24px` (text-2xl), font-bold
- Card Title: `20px` (text-xl), font-bold
- Body: `14px` (text-sm), font-medium
- Caption: `12px` (text-xs), font-semibold

### Text Shadows
- Default: `0 2px 8px rgba(0, 0, 0, 0.3)`
- Strong: `0 4px 12px rgba(0, 0, 0, 0.5)`

### Colors
- Primary: `#ffffff` (white)
- Secondary: `rgba(255, 255, 255, 0.7)` (white/70)
- Muted: `rgba(255, 255, 255, 0.5)` (white/50)
- Disabled: `rgba(255, 255, 255, 0.3)` (white/30)

---

## 🎯 Interactive States

### Buttons
**Default:**
- Background: `glass-strong`
- Border: `rgba(255, 255, 255, 0.1)`
- Padding: `12px 24px`

**Hover:**
- Background: `rgba(255, 255, 255, 0.12)`
- Border: `rgba(0, 212, 255, 0.5)`
- Glow: `0 0 20px rgba(0, 212, 255, 0.3)`
- Transform: `translateY(-1px)`

**Active:**
- Transform: `scale(0.98)`

### Cards
**Default:**
- Glass background with blur
- Subtle shadow

**Hover:**
- Brightness increase
- Scale: `1.01-1.02`
- Shadow increase
- Border brightness

---

## 📱 Responsive Behavior

### Breakpoints
- Mobile: `< 768px`
- Tablet: `768px - 1024px`
- Desktop: `> 1024px`

### Mobile Adaptations
- Sidebar: Hidden, replaced with mobile menu
- Top bar: Compressed, hamburger menu
- Grid: Single column
- Font sizes: Slightly reduced
- Spacing: Reduced padding

### Tablet Adaptations
- Sidebar: Collapsible
- Grid: 2 columns
- Full top bar visible

---

## ♿ Accessibility

### Contrast Ratios
- White on glass: Minimum 4.5:1
- Important text: Darken glass behind (8% opacity)
- Icons: Minimum 3:1

### Focus States
- Visible focus rings
- Cyan glow on focus
- Skip links for keyboard navigation

### Click Targets
- Minimum: 44x44px
- Cards: Full area clickable
- Buttons: Ample padding

---

## 🎨 Usage Guidelines

### DO:
- ✅ Use glass panels for all surfaces
- ✅ Apply consistent border radius
- ✅ Use gradients for icons and accents
- ✅ Add subtle animations on hover
- ✅ Maintain color consistency
- ✅ Use text shadows for depth

### DON'T:
- ❌ Mix flat and glass styles
- ❌ Overuse bright colors
- ❌ Create cluttered layouts
- ❌ Use harsh shadows
- ❌ Skip hover states
- ❌ Ignore spacing system

---

## 🚀 Implementation Example

```tsx
// KPI Metric Card Example
<div className="glass-card metric-blue p-6 relative group">
  {/* Icon */}
  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 
                  flex items-center justify-center shadow-lg">
    <Building2 className="w-7 h-7 text-white" />
  </div>
  
  {/* Trend */}
  <div className="glass-light rounded-full px-3 py-1.5 glow-primary">
    <TrendingUp className="w-3.5 h-3.5 text-green-400" />
    <span className="text-xs font-bold text-green-400">+2</span>
  </div>
  
  {/* Content */}
  <p className="text-white/60 text-sm font-medium">Toplam Mağaza</p>
  <p className="text-5xl font-bold text-white text-shadow">12</p>
  
  {/* Hover overlay */}
  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br 
                  from-white/5 to-transparent opacity-0 
                  group-hover:opacity-100 transition-opacity" />
</div>
```

---

## 📦 Component Library Structure

```
/components
  /ui
    - GlassCard.tsx
    - GlassButton.tsx
    - GlassBadge.tsx
    - KPICard.tsx
    - QuickAccessTile.tsx
    - HeroBanner.tsx
  /navigation
    - Sidebar.tsx
    - TopBar.tsx
    - NavItem.tsx
  /layout
    - Shell.tsx
    - Container.tsx
```

---

## 🎓 Design Principles

1. **Clarity**: Every element serves a purpose
2. **Depth**: Layering creates visual hierarchy
3. **Elegance**: Subtle animations, not jarring
4. **Consistency**: Same patterns throughout
5. **Performance**: Optimize blur effects
6. **Accessibility**: Readable, usable, inclusive

---

**Maintained by:** LeaseOps AI Design Team  
**Last Updated:** December 2025  
**Version:** 0.4.0












