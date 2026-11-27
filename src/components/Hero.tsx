import { useState } from 'react';
import { CLINIC } from '../config';
import { formatEur, img, savingPct, whatsappUrl } from '../format';
import { useInterval, usePrefersReducedMotion } from '../hooks';
import { LOCALES } from '../i18n';
import { useLang } from '../lang';
import { CheckIcon, WhatsAppIcon } from './Icons';
import { AnimatedNumber, CountUp } from './Motion';
import { OpenStatus } from './OpenStatus';

export function Hero() {
  const { t, lang } = useLang();
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = CLINIC.treatments.length;
  useInterval(() => setIndex((i) => (i + 1) % count), 3200, paused || reduced || count < 2);

  const item = CLINIC.treatments[index];
  const eur = (n: number) => formatEur(n, lang);
  const num = (n: number) => new Intl.NumberFormat(LOCALES[lang]).format(n);

  return (
    <section className="hero" id="top">
      <div className="hero-blob hero-blob-a" aria-hidden="true" />
      <div className="hero-blob hero-blob-b" aria-hidden="true" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <OpenStatus />
          <p className="eyebrow">{t('hero.eyebrow')}</p>
          <h1>{t('hero.title')}</h1>
          <p className="lead">{t('hero.subtitle')}</p>
          <div className="hero-ctas">
            <a className="btn btn-primary btn-lg btn-pulse" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon />
              {t('cta.whatsapp')}
            </a>
            <a className="btn btn-ghost btn-lg" href="#prices">
              {t('cta.prices')}
            </a>
          </div>
          <ul className="trust">
            <li>
              <strong>
                <CountUp to={CLINIC.yearsOfExperience} format={num} />
              </strong>{' '}
              {t('trust.years')}
            </li>
            <li>
              <strong>
                <CountUp to={CLINIC.patientsPerYear} format={(n) => `${num(n)}+`} />
              </strong>{' '}
              {t('trust.patients')}
            </li>
            <li>
              <CheckIcon size={16} /> {t('trust.guarantee')}
            </li>
            <li>
              <CheckIcon size={16} /> {t('trust.language')}
            </li>
          </ul>
        </div>

        <div className="hero-visual">
          <img
            className="hero-photo"
            src={img('hero-smile.jpg')}
            alt={t('hero.photoAlt')}
            width={800}
            height={1200}
            fetchPriority="high"
          />
          {item && (
            <aside
              className="hero-card"
              aria-label={t('hero.card.title')}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onFocus={() => setPaused(true)}
              onBlur={() => setPaused(false)}
            >
              <p className="hero-card-title">{t('hero.card.title')}</p>
              <p key={item.id} className="hero-card-treatment swap-in">
                {t(`treatment.${item.id}.name`)}
              </p>
              <div className="hero-card-row">
                <span>{t('hero.card.italy')}</span>
                <s>
                  <AnimatedNumber value={item.italy} format={eur} />
                </s>
              </div>
              <div className="hero-card-row hero-card-row-main">
                <span>{t('hero.card.tirana')}</span>
                <strong>
                  <AnimatedNumber value={item.tirana} format={eur} />
                </strong>
              </div>
              <div className="hero-card-foot">
                <p className="hero-card-save">
                  {t('hero.card.save', { pct: savingPct(item.tirana, item.italy) })}
                </p>
                <div className="dots" role="group">
                  {CLINIC.treatments.map((tr, i) => (
                    <button
                      key={tr.id}
                      type="button"
                      className="dot"
                      aria-pressed={i === index}
                      aria-label={t('hero.card.show', { name: t(`treatment.${tr.id}.name`) })}
                      onClick={() => setIndex(i)}
                    />
                  ))}
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}
