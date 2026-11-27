import type { MessageKey } from '../i18n';
import { useLang } from '../lang';
import { DemoOnly } from './Demo';

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
  return (
    <section className="section" id="reviews">
      <div className="container">
        <h2>{t('reviews.title')}</h2>
        <ul className="card-grid">
          {REVIEWS.map((r) => (
            <li key={r.text} className="card review-card">
              <span className="sample-badge">{t('reviews.sample')}</span>
              <blockquote>{t(r.text)}</blockquote>
              <p className="muted small">{t(r.author)}</p>
            </li>
          ))}
        </ul>
        <DemoOnly>
          <p className="demo-note">{t('reviews.demoNote')}</p>
        </DemoOnly>
      </div>
    </section>
  );
}
