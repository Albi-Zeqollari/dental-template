import type { MessageKey } from '../i18n';
import { useLang } from '../lang';
import { Reveal } from './Motion';

const QUESTIONS: { q: MessageKey; a: MessageKey }[] = [
  { q: 'faq.1.q', a: 'faq.1.a' },
  { q: 'faq.2.q', a: 'faq.2.a' },
  { q: 'faq.3.q', a: 'faq.3.a' },
  { q: 'faq.4.q', a: 'faq.4.a' },
  { q: 'faq.5.q', a: 'faq.5.a' },
];

export function Faq() {
  const { t } = useLang();
  return (
    <section className="section section-tint" id="faq">
      <div className="container container-narrow">
        <Reveal>
          <h2>{t('faq.title')}</h2>
        </Reveal>
        <Reveal delay={100} className="faq">
          {QUESTIONS.map((item) => (
            <details key={item.q}>
              <summary>{t(item.q)}</summary>
              <p>{t(item.a)}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
