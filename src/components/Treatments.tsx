import { CLINIC } from '../config';
import { formatEur } from '../format';
import { useLang } from '../lang';
import { Reveal } from './Motion';
import { ToothIcon } from './Icons';

export function Treatments() {
  const { t, lang } = useLang();
  return (
    <section className="section" id="treatments">
      <div className="container">
        <Reveal>
          <h2>{t('treatments.title')}</h2>
          <p className="section-lead">{t('treatments.subtitle')}</p>
        </Reveal>
        <ul className="card-grid">
          {CLINIC.treatments.map((item, i) => (
            <Reveal as="li" key={item.id} delay={i * 70} className="card treatment-card">
              <span className="icon-badge">
                <ToothIcon size={22} />
              </span>
              <h3>{t(`treatment.${item.id}.name`)}</h3>
              <p>{t(`treatment.${item.id}.desc`)}</p>
              <p className="price-from">
                {t('treatments.from')} <strong>{formatEur(item.tirana, lang)}</strong>
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
