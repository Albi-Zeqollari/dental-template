import type { MessageKey } from '../i18n';
import { useLang } from '../lang';

const STEPS: { title: MessageKey; desc: MessageKey }[] = [
  { title: 'how.1.title', desc: 'how.1.desc' },
  { title: 'how.2.title', desc: 'how.2.desc' },
  { title: 'how.3.title', desc: 'how.3.desc' },
  { title: 'how.4.title', desc: 'how.4.desc' },
];

export function HowItWorks() {
  const { t } = useLang();
  return (
    <section className="section" id="how">
      <div className="container">
        <h2>{t('how.title')}</h2>
        <ol className="steps">
          {STEPS.map((step, i) => (
            <li key={step.title} className="step">
              <span className="step-num" aria-hidden="true">
                {i + 1}
              </span>
              <h3>{t(step.title)}</h3>
              <p>{t(step.desc)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
