import Header from "@/components/Header";
import { useLanguage } from "@/contexts/language-context";
import type { ReactNode } from "react";

const currentYear = new Date().getFullYear();

function Footer() {
  const { t, isRTL } = useLanguage();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="bg-card border-t border-border/60 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <h3 className="font-display text-xl font-bold text-primary">
              {t("appName")}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t("footerTagline")}
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span
                className="inline-block w-8 h-0.5 bg-primary/40"
                aria-hidden="true"
              />
              <span>{t("slogan")}</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground/80 uppercase tracking-wider">
              {t("footerLinks")}
            </h4>
            <nav
              className="flex flex-col gap-1"
              aria-label={isRTL ? "روابط سريعة" : "Quick links"}
            >
              {[
                { href: "/", label: t("navHome") },
                { href: "/pricing", label: t("navPricing") },
                { href: "/booking", label: t("navBooking") },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Stats */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground/80 uppercase tracking-wider">
              {t("storeCount")}
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full bg-primary"
                  aria-hidden="true"
                />
                <span className="text-sm text-muted-foreground">
                  {t("storeCountSmall")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full bg-primary/60"
                  aria-hidden="true"
                />
                <span className="text-sm text-muted-foreground">
                  {t("storeCountLarge")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>
            &copy; {currentYear} {t("appName")} — {t("copyrightRights")}
          </span>
          <a
            href={caffeineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            {t("copyrightBuilt")}
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
