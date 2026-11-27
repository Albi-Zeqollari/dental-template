import { img } from '../format';
import type { MessageKey } from '../i18n';
import { useLang } from '../lang';
import { DemoOnly } from './Demo';
import { Reveal } from './Motion';

// Sample stock photos from Pexels (free licence). Replace with the clinic's own.
const PHOTOS: { file: string; caption: MessageKey; alt: MessageKey; tall?: boolean }[] = [
  { file: 'dentist-loupes.jpg', caption: 'gallery.loupes', alt: 'gallery.loupes.alt' },
  { file: 'checkup.jpg', caption: 'gallery.checkup', alt: 'gallery.checkup.alt', tall: true },
  { file: 'whitening.jpg', caption: 'gallery.whitening', alt: 'gallery.whitening.alt', tall: true },
  { file: 'patient-chair.jpg', caption: 'gallery.chair', alt: 'gallery.chair.alt' },
];

export function Gallery() {
  const { t } = useLang();
  return (
    <section className="section section-dark" id="clinic">
      <div className="container">
        <Reveal>
          <h2>{t('gallery.title')}</h2>
          <p className="section-lead">{t('gallery.subtitle')}</p>
        </Reveal>
        <ul className="gallery">
          {PHOTOS.map((p, i) => (
            <Reveal as="li" key={p.file} delay={i * 90} className={p.tall ? 'gallery-item is-tall' : 'gallery-item'}>
              <figure>
                <img src={img(p.file)} alt={t(p.alt)} loading="lazy" />
                <figcaption>{t(p.caption)}</figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
        <DemoOnly>
          <p className="demo-note">{t('gallery.demoNote')}</p>
        </DemoOnly>
      </div>
    </section>
  );
}
