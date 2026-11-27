import { CLINIC } from '../config';
import { LANG_LABELS } from '../i18n';
import { useLang } from '../lang';

export function LanguageSwitcher() {
  const { lang, setLang, t } = useLang();
  return (
    <div className="lang-switcher" role="group" aria-label={t('nav.language')}>
      {CLINIC.languages.map((code) => (
        <button
          key={code}
          type="button"
          className="lang-btn"
          aria-pressed={code === lang}
          onClick={() => setLang(code)}
        >
          {LANG_LABELS[code]}
        </button>
      ))}
    </div>
  );
}
