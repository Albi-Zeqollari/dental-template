import { DemoBanner } from './components/Demo';
import { Footer } from './components/Footer';
import { Logo } from './components/Header';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { pageHref } from './format';
import type { MessageKey } from './i18n';
import { useDocumentMeta, useLang } from './lang';

const SECTIONS: { h: MessageKey; p: MessageKey }[] = [
  { h: 'privacy.controller.h', p: 'privacy.controller.p' },
  { h: 'privacy.data.h', p: 'privacy.data.p' },
  { h: 'privacy.purpose.h', p: 'privacy.purpose.p' },
  { h: 'privacy.retention.h', p: 'privacy.retention.p' },
  { h: 'privacy.rights.h', p: 'privacy.rights.p' },
  { h: 'privacy.processors.h', p: 'privacy.processors.p' },
];

export function PrivacyPage() {
  const { t, lang } = useLang();
  useDocumentMeta('privacy.title');
  const home = pageHref('./', lang);

  return (
    <>
      <DemoBanner />
      <header className="site-header">
        <div className="container header-inner">
          <Logo href={home} />
          <LanguageSwitcher />
        </div>
      </header>
      <main className="section">
        <article className="container container-narrow prose">
          <h1>{t('privacy.title')}</h1>
          <p className="demo-note">{t('privacy.template')}</p>
          {SECTIONS.map((s) => (
            <section key={s.h}>
              <h2>{t(s.h)}</h2>
              <p>{t(s.p)}</p>
            </section>
          ))}
          <p>
            <a href={home}>← {t('footer.back')}</a>
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
