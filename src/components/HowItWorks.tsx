import type { MessageKey } from '../i18n';
import { useLang } from '../lang';
import { Reveal } from './Motion';

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
        <Reveal>
          <h2>{t('how.title')}</h2>
        </Reveal>
        <ol className="steps">
          {STEPS.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 110} className="step">
              <span className="step-num" aria-hidden="true">
                {i + 1}
              </span>
              <h3>{t(step.title)}</h3>
              <p>{t(step.desc)}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
