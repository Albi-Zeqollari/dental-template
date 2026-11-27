import type { MessageKey } from '../i18n';
import { useLang } from '../lang';
import { Reveal } from './Motion';
import { CheckIcon } from './Icons';

const REASONS: { title: MessageKey; desc: MessageKey }[] = [
  { title: 'why.1.title', desc: 'why.1.desc' },
  { title: 'why.2.title', desc: 'why.2.desc' },
  { title: 'why.3.title', desc: 'why.3.desc' },
  { title: 'why.4.title', desc: 'why.4.desc' },
];

export function WhyUs() {
  const { t } = useLang();
  return (
    <section className="section section-tint" id="why">
      <div className="container">
        <Reveal>
          <h2>{t('why.title')}</h2>
        </Reveal>
        <ul className="why-grid">
          {REASONS.map((r, i) => (
            <Reveal as="li" key={r.title} delay={i * 90} className="why-item">
              <span className="check-badge">
                <CheckIcon size={18} />
              </span>
              <div>
                <h3>{t(r.title)}</h3>
                <p>{t(r.desc)}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
