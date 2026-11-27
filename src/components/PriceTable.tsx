import { CLINIC } from '../config';
import { formatEur, savingPct } from '../format';
import { useLang } from '../lang';
import { DemoOnly } from './Demo';

export function PriceTable() {
  const { t, lang } = useLang();
  return (
    <section className="section section-tint" id="prices">
      <div className="container">
        <h2>{t('prices.title')}</h2>
        <p className="section-lead">{t('prices.subtitle')}</p>
        <div className="table-wrap">
          <table className="price-table">
            <thead>
              <tr>
                <th scope="col">{t('prices.col.treatment')}</th>
                <th scope="col" className="num">{t('prices.col.italy')}</th>
                <th scope="col" className="num">{t('prices.col.tirana')}</th>
                <th scope="col" className="num">{t('prices.col.save')}</th>
              </tr>
            </thead>
            <tbody>
              {CLINIC.treatments.map((item) => (
                <tr key={item.id}>
                  <th scope="row">{t(`treatment.${item.id}.name`)}</th>
                  <td className="num muted">{formatEur(item.italy, lang)}</td>
                  <td className="num strong">{formatEur(item.tirana, lang)}</td>
                  <td className="num">
                    <span className="save-pill">−{savingPct(item.tirana, item.italy)}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <DemoOnly>
          <p className="demo-note">{t('prices.demoNote')}</p>
        </DemoOnly>
      </div>
    </section>
  );
}
