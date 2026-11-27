import { useState } from 'react';
import { useInterval, usePrefersReducedMotion } from '../hooks';
import type { MessageKey } from '../i18n';
import { useLang } from '../lang';
import { DemoOnly } from './Demo';
import { Reveal } from './Motion';

/*
 * SAMPLE reviews, clearly labelled as such. Before going live, replace this
 * section with the clinic's real Google reviews (copied with permission or
 * shown through an embed). Never publish invented reviews as real ones.
 */
const REVIEWS: { text: MessageKey; author: MessageKey }[] = [
  { text: 'reviews.1.text', author: 'reviews.1.author' },
  { text: 'reviews.2.text', author: 'reviews.2.author' },
  { text: 'reviews.3.text', author: 'reviews.3.author' },
];

export function Reviews() {
  const { t } = useLang();
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = REVIEWS.length;
  const go = (i: number) => setIndex((i + n) % n);
  useInterval(() => go(index + 1), 6000, paused || reduced);

  return (
    <section className="section" id="reviews">
      <div className="container container-mid">
        <Reveal>
          <h2>{t('reviews.title')}</h2>
        </Reveal>
        <Reveal delay={100}>
          <div
            className="carousel"
            aria-roledescription="carousel"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            <div className="carousel-viewport" aria-live={paused ? 'polite' : 'off'}>
              <ul className="carousel-track" style={{ transform: `translateX(-${index * 100}%)` }}>
                {REVIEWS.map((r, i) => (
                  <li key={r.text} className="carousel-slide" aria-hidden={i !== index}>
                    <figure className="review">
                      <span className="sample-badge">{t('reviews.sample')}</span>
                      <p className="stars" aria-hidden="true">
                        ★★★★★
                      </p>
                      <blockquote>{t(r.text)}</blockquote>
                      <figcaption className="muted">{t(r.author)}</figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
            </div>
            <div className="carousel-controls">
              <button type="button" className="round-btn" aria-label={t('reviews.prev')} onClick={() => go(index - 1)}>
                ‹
              </button>
              <div className="dots" role="group">
                {REVIEWS.map((r, i) => (
                  <button
                    key={r.text}
                    type="button"
                    className="dot"
                    aria-pressed={i === index}
                    aria-label={t('reviews.goto', { n: i + 1 })}
                    onClick={() => go(i)}
                  />
                ))}
              </div>
              <button type="button" className="round-btn" aria-label={t('reviews.next')} onClick={() => go(index + 1)}>
                ›
              </button>
            </div>
          </div>
        </Reveal>
        <DemoOnly>
          <p className="demo-note">{t('reviews.demoNote')}</p>
        </DemoOnly>
      </div>
    </section>
  );
}
