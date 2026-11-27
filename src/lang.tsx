import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { CLINIC } from './config';
import { headlineSavingPct } from './format';
import { MESSAGES, type Lang, type MessageKey } from './i18n';

type Vars = Record<string, string | number>;

interface LangContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: MessageKey, vars?: Vars) => string;
}

const LangContext = createContext<LangContextValue | null>(null);
const STORAGE_KEY = 'lang';

function isLang(value: unknown): value is Lang {
  return typeof value === 'string' && (CLINIC.languages as string[]).includes(value);
}

/** ?lang= in the URL wins (shareable links), then the last choice, then the browser, then the default. */
function detectLang(): Lang {
  const fromUrl = new URLSearchParams(window.location.search).get('lang');
  if (isLang(fromUrl)) return fromUrl;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isLang(saved)) return saved;
  } catch {
    /* storage blocked: fall through */
  }
  const fromBrowser = navigator.language?.slice(0, 2);
  if (isLang(fromBrowser)) return fromBrowser;
  return CLINIC.defaultLang;
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(detectLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* not critical */
    }
    const url = new URL(window.location.href);
    if (lang === CLINIC.defaultLang) url.searchParams.delete('lang');
    else url.searchParams.set('lang', lang);
    window.history.replaceState(null, '', url);
  }, [lang]);

  const t = useCallback(
    (key: MessageKey, vars: Vars = {}) => {
      const all: Vars = {
        name: CLINIC.name,
        email: CLINIC.email,
        address: CLINIC.address,
        maxSave: headlineSavingPct(),
        ...vars,
      };
      return MESSAGES[lang][key].replace(/\{(\w+)\}/g, (match, name: string) =>
        name in all ? String(all[name]) : match,
      );
    },
    [lang],
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used inside <LangProvider>');
  return ctx;
}

/** Keeps <title> and the meta description in the current language. */
export function useDocumentMeta(titleKey: MessageKey, descriptionKey?: MessageKey) {
  const { t } = useLang();
  useEffect(() => {
    document.title = t(titleKey);
    if (descriptionKey) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', t(descriptionKey));
    }
  }, [t, titleKey, descriptionKey]);
}
