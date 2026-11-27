import type { MessageKey } from '../i18n';
import { useLang } from '../lang';
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
        <h2>{t('why.title')}</h2>
        <ul className="why-grid">
          {REASONS.map((r) => (
            <li key={r.title} className="why-item">
              <span className="check-badge">
                <CheckIcon size={18} />
              </span>
              <div>
                <h3>{t(r.title)}</h3>
                <p>{t(r.desc)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
