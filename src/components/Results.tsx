import { useState, type CSSProperties } from 'react';
import { img } from '../format';
import { useLang } from '../lang';
import { DemoOnly } from './Demo';
import { Reveal } from './Motion';

/*
 * Before/after slider. In the demo, both sides are the SAME stock photo:
 * "before" only has a colour filter (see .ba-before in styles.css).
 * For a real clinic, replace both images with a real case — photographed
 * the same way — and only with the patient's written consent. Then remove
 * the filter class.
 */
export function Results() {
  const { t } = useLang();
  const [pos, setPos] = useState(50);

  return (
    <section className="section section-tint" id="results">
      <div className="container container-mid">
        <Reveal>
          <h2>{t('results.title')}</h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="ba" style={{ '--pos': `${pos}%` } as CSSProperties}>
            <img className="ba-img ba-before" src={img('smile-closeup.jpg')} alt="" loading="lazy" width={1400} height={934} />
            <img
              className="ba-img ba-after"
              src={img('smile-closeup.jpg')}
              alt={t('results.photoAlt')}
              loading="lazy"
              width={1400}
              height={934}
            />
            <span className="ba-tag ba-tag-before">{t('results.before')}</span>
            <span className="ba-tag ba-tag-after">{t('results.after')}</span>
            <span className="ba-handle" aria-hidden="true">
              <span className="ba-knob">‹ ›</span>
            </span>
            <input
              className="ba-range"
              type="range"
              min={0}
              max={100}
              value={pos}
              aria-label={t('results.sliderLabel')}
              onChange={(e) => setPos(Number(e.target.value))}
            />
          </div>
          <p className="ba-hint">{t('results.drag')}</p>
        </Reveal>
        <p className="small muted">{t('results.note')}</p>
        <DemoOnly>
          <p className="demo-note">{t('results.demoNote')}</p>
        </DemoOnly>
      </div>
    </section>
  );
}
