import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import { Link } from "@tanstack/react-router";
import { Menu, ShieldCheck, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const { t, toggleLang, lang, isRTL } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { to: "/", label: t("navHome") },
    { to: "/pricing", label: t("navPricing") },
    { to: "/booking", label: t("navBooking") },
  ];

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border/60 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo — right side in RTL */}
          <Link
            to="/"
            className="flex flex-col leading-tight min-w-0"
            data-ocid="header.home_link"
          >
            <span className="font-display text-lg font-bold text-primary truncate">
              {t("appName")}
            </span>
            <span className="text-xs text-muted-foreground font-body hidden sm:block">
              {t("appNameEn")}
            </span>
          </Link>

          {/* Desktop nav — center */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label={isRTL ? "التنقل الرئيسي" : "Main navigation"}
          >
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-4 py-2 rounded-lg text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/10 transition-smooth"
                activeProps={{ className: "text-primary bg-primary/10" }}
                data-ocid={`header.nav_link.${link.to.replace("/", "") || "home"}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right-side actions */}
          <div className="flex items-center gap-2">
            {/* Language toggle */}
            <button
              type="button"
              onClick={toggleLang}
              className="text-sm font-medium px-3 py-1.5 rounded-lg border border-border/60 text-muted-foreground hover:text-primary hover:border-primary/40 transition-smooth"
              aria-label={
                lang === "ar" ? "Switch to English" : "التحويل للعربية"
              }
              data-ocid="header.lang_toggle"
            >
              {lang === "ar" ? "English" : "العربية"}
            </button>

            {/* Admin login */}
            <Link to="/admin" data-ocid="header.admin_link">
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:flex items-center gap-2 border-primary/40 text-primary hover:bg-primary/10"
              >
                <ShieldCheck className="w-4 h-4" />
                <span className="hidden lg:inline">{t("navAdminLogin")}</span>
              </Button>
            </Link>

            {/* Mobile menu toggle */}
            <button
              type="button"
              className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-smooth"
              onClick={() => setMobileOpen((o) => !o)}
              aria-expanded={mobileOpen}
              aria-label={isRTL ? "قائمة التنقل" : "Navigation menu"}
              data-ocid="header.mobile_menu_toggle"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border/40 bg-card/95 backdrop-blur-sm">
          <nav className="flex flex-col px-4 py-3 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-4 py-3 rounded-lg text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/10 transition-smooth"
                activeProps={{ className: "text-primary bg-primary/10" }}
                onClick={() => setMobileOpen(false)}
                data-ocid={`header.mobile_nav_link.${link.to.replace("/", "") || "home"}`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/admin" onClick={() => setMobileOpen(false)}>
              <div className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-primary">
                <ShieldCheck className="w-4 h-4" />
                {t("navAdminLogin")}
              </div>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
