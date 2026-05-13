import { t as translate } from "@/i18n/translations";
import type { Language } from "@/types";
import { type ReactNode, createContext, useContext, useState } from "react";

interface LanguageContextValue {
  lang: Language;
  toggleLang: () => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("ar");

  const toggleLang = () => setLang((l) => (l === "ar" ? "en" : "ar"));
  const isRTL = lang === "ar";
  const t = (key: string) => translate(lang, key);

  // Update HTML dir attribute reactively
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", lang);
  }

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
