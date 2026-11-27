import { CLINIC } from '../config';
import { formatEur, savingPct, whatsappUrl } from '../format';
import { useLang } from '../lang';
import { CheckIcon, WhatsAppIcon } from './Icons';

export function Hero() {
  const { t, lang } = useLang();
  const example = CLINIC.treatments[0];

  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div>
          <p className="eyebrow">{t('hero.eyebrow')}</p>
          <h1>{t('hero.title')}</h1>
          <p className="lead">{t('hero.subtitle')}</p>
          <div className="hero-ctas">
            <a className="btn btn-primary btn-lg" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon />
              {t('cta.whatsapp')}
            </a>
            <a className="btn btn-ghost btn-lg" href="#prices">
              {t('cta.prices')}
            </a>
          </div>
          <ul className="trust">
            <li>
              <strong>{CLINIC.yearsOfExperience}</strong> {t('trust.years')}
            </li>
            <li>
              <strong>{CLINIC.patientsPerYear}</strong> {t('trust.patients')}
            </li>
            <li>
              <CheckIcon size={16} /> {t('trust.guarantee')}
            </li>
            <li>
              <CheckIcon size={16} /> {t('trust.language')}
            </li>
          </ul>
        </div>

        {example && (
          <aside className="hero-card" aria-label={t('hero.card.title')}>
            <p className="hero-card-title">{t('hero.card.title')}</p>
            <p className="hero-card-treatment">{t(`treatment.${example.id}.name`)}</p>
            <div className="hero-card-row">
              <span>{t('hero.card.italy')}</span>
              <s>{formatEur(example.italy, lang)}</s>
            </div>
            <div className="hero-card-row hero-card-row-main">
              <span>{t('hero.card.tirana')}</span>
              <strong>{formatEur(example.tirana, lang)}</strong>
            </div>
            <p className="hero-card-save">{t('hero.card.save', { pct: savingPct(example.tirana, example.italy) })}</p>
          </aside>
        )}
      </div>
    </section>
  );
}
