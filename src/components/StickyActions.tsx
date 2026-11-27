import { CLINIC } from '../config';
import { whatsappUrl } from '../format';
import { useLang } from '../lang';
import { PhoneIcon, WhatsAppIcon } from './Icons';

/** Floating WhatsApp button on desktop, a two-button bar on phones. */
export function StickyActions() {
  const { t } = useLang();
  return (
    <>
      <a
        className="wa-float"
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t('cta.float')}
        title={t('cta.float')}
      >
        <WhatsAppIcon size={28} />
      </a>
      <div className="mobile-bar">
        <a className="btn btn-ghost" href={`tel:${CLINIC.phoneHref}`}>
          <PhoneIcon size={18} /> {t('cta.call')}
        </a>
        <a className="btn btn-primary" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon size={18} /> {t('cta.whatsappShort')}
        </a>
      </div>
    </>
  );
}
