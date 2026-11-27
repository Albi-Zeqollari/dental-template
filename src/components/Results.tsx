import { useLang } from '../lang';

/*
 * Replace the placeholder boxes with real photos, e.g.
 *   <img src="/results/case-1-before.webp" alt="..." loading="lazy" />
 * Only publish photos the patient has consented to in writing.
 */
const CASES = [1, 2, 3];

export function Results() {
  const { t } = useLang();
  return (
    <section className="section section-tint" id="results">
      <div className="container">
        <h2>{t('results.title')}</h2>
        <ul className="card-grid">
          {CASES.map((n) => (
            <li key={n} className="card result-card">
              <div className="result-pair">
                <div className="photo-placeholder">{t('results.before')}</div>
                <div className="photo-placeholder photo-placeholder-after">{t('results.after')}</div>
              </div>
            </li>
          ))}
        </ul>
        <p className="small muted">{t('results.note')}</p>
      </div>
    </section>
  );
}
