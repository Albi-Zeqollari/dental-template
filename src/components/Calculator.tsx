import { useState } from 'react';
import { CLINIC, type Preset } from '../config';
import { estimate, formatEur, whatsappUrl, type Selection } from '../format';
import { useLang } from '../lang';
import { DemoOnly } from './Demo';
import { WhatsAppIcon } from './Icons';
import { AnimatedNumber, Reveal } from './Motion';

export function Calculator() {
  const { t, lang } = useLang();
  const [selection, setSelection] = useState<Selection>(CLINIC.presets[0]?.items ?? {});
  const [activePreset, setActivePreset] = useState<Preset['id'] | null>(CLINIC.presets[0]?.id ?? null);

  const est = estimate(selection);
  const eur = (n: number) => formatEur(n, lang);
  const totalPct = est.italy ? Math.min(100, (est.total / est.italy) * 100) : 0;

  function change(id: keyof Selection, delta: number, max: number) {
    setActivePreset(null);
    setSelection((s) => ({ ...s, [id]: Math.min(max, Math.max(0, (s[id] ?? 0) + delta)) }));
  }

  function applyPreset(preset: Preset) {
    setActivePreset(preset.id);
    setSelection(preset.items);
  }

  function sendEstimate() {
    const lines = CLINIC.treatments
      .filter((tr) => (selection[tr.id] ?? 0) > 0)
      .map((tr) => `• ${selection[tr.id]} × ${t(`treatment.${tr.id}.name`)}`);
    const text = [t('calc.waIntro'), ...lines, t('calc.waTotal', { total: eur(est.total) })].join('\n');
    window.open(whatsappUrl(text), '_blank', 'noopener,noreferrer');
  }

  return (
    <section className="section section-tint" id="prices">
      <div className="container">
        <Reveal>
          <h2>{t('calc.title')}</h2>
          <p className="section-lead">{t('calc.subtitle')}</p>
        </Reveal>

        <div className="calc">
          <Reveal className="calc-picker">
            <div className="presets" role="group" aria-label={t('calc.presets')}>
              <span className="presets-label">{t('calc.presets')}</span>
              {CLINIC.presets.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className="chip"
                  aria-pressed={activePreset === p.id}
                  onClick={() => applyPreset(p)}
                >
                  {t(`preset.${p.id}`)}
                </button>
              ))}
              <button
                type="button"
                className="chip chip-quiet"
                onClick={() => {
                  setActivePreset(null);
                  setSelection({});
                }}
              >
                {t('calc.reset')}
              </button>
            </div>

            {!est.empty && (
              <a className="calc-mini" href="#calc-summary">
                <span>{t('calc.save')}</span>
                <strong>
                  <AnimatedNumber value={est.saving} format={eur} />
                </strong>
                <span className="calc-mini-pct">−{est.savingPct}% ↓</span>
              </a>
            )}

            <ul className="calc-list">
              {CLINIC.treatments.map((tr) => {
                const qty = selection[tr.id] ?? 0;
                const name = t(`treatment.${tr.id}.name`);
                return (
                  <li key={tr.id} className={qty ? 'calc-row is-selected' : 'calc-row'}>
                    <div className="calc-row-text">
                      <span className="calc-name">{name}</span>
                      <span className="calc-prices">
                        <s>{eur(tr.italy)}</s> <strong>{eur(tr.tirana)}</strong> {t('calc.each')}
                      </span>
                    </div>
                    <div className="stepper">
                      <button
                        type="button"
                        aria-label={t('calc.decrease', { name })}
                        disabled={qty === 0}
                        onClick={() => change(tr.id, -1, tr.maxQty)}
                      >
                        −
                      </button>
                      <output aria-live="polite" aria-label={name}>
                        {qty}
                      </output>
                      <button
                        type="button"
                        aria-label={t('calc.increase', { name })}
                        disabled={qty >= tr.maxQty}
                        onClick={() => change(tr.id, 1, tr.maxQty)}
                      >
                        +
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal as="aside" id="calc-summary" delay={120} className="calc-summary">
            {est.empty ? (
              <p className="calc-empty">{t('calc.empty')}</p>
            ) : (
              <>
                <div className="calc-bars" aria-hidden="true">
                  <div className="calc-bar">
                    <span className="calc-bar-label">{t('hero.card.italy')}</span>
                    <span className="calc-bar-track">
                      <span className="calc-bar-fill calc-bar-italy" style={{ width: '100%' }} />
                    </span>
                  </div>
                  <div className="calc-bar">
                    <span className="calc-bar-label">{t('hero.card.tirana')}</span>
                    <span className="calc-bar-track">
                      <span className="calc-bar-fill calc-bar-tirana" style={{ width: `${totalPct}%` }} />
                    </span>
                  </div>
                </div>

                <dl className="calc-lines">
                  <div>
                    <dt>{t('calc.italy')}</dt>
                    <dd className="strike">
                      <AnimatedNumber value={est.italy} format={eur} />
                    </dd>
                  </div>
                  <div>
                    <dt>{t('calc.treatment')}</dt>
                    <dd>
                      <AnimatedNumber value={est.treatment} format={eur} />
                    </dd>
                  </div>
                  <div>
                    <dt>{t('calc.trip', { trips: est.trips, nights: est.nights })}</dt>
                    <dd>
                      <AnimatedNumber value={est.travel} format={eur} />
                    </dd>
                  </div>
                  <div className="calc-total">
                    <dt>{t('calc.total')}</dt>
                    <dd>
                      <AnimatedNumber value={est.total} format={eur} />
                    </dd>
                  </div>
                </dl>

                <div className="calc-saving">
                  <span>{t('calc.save')}</span>
                  <strong>
                    <AnimatedNumber value={est.saving} format={eur} />
                  </strong>
                  <span className="save-pill">−{est.savingPct}%</span>
                </div>

                <button type="button" className="btn btn-primary btn-lg btn-block" onClick={sendEstimate}>
                  <WhatsAppIcon />
                  {t('calc.send')}
                </button>
              </>
            )}
            <p className="hint">{t('calc.disclaimer')}</p>
          </Reveal>
        </div>

        <DemoOnly>
          <p className="demo-note">{t('prices.demoNote')}</p>
        </DemoOnly>
      </div>
    </section>
  );
}
