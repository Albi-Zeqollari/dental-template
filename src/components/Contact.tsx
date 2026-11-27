import { useId, useState, type FormEvent } from 'react';
import { CLINIC, type TreatmentId } from '../config';
import { pageHref, whatsappUrl } from '../format';
import type { MessageKey } from '../i18n';
import { useLang } from '../lang';
import { PhoneIcon, WhatsAppIcon } from './Icons';

interface FormState {
  name: string;
  phone: string;
  country: string;
  treatment: TreatmentId | '';
  message: string;
  consent: boolean;
}

const EMPTY_FORM: FormState = { name: '', phone: '', country: '', treatment: '', message: '', consent: false };

/*
 * No backend: on submit the form opens WhatsApp with a pre-written message,
 * so the website itself never stores patient data. Medical details are
 * deliberately not asked for here.
 */
export function Contact() {
  const { t, lang } = useLang();
  const id = useId();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [error, setError] = useState<MessageKey | null>(null);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return setError('form.errorRequired');
    if (!form.consent) return setError('form.errorConsent');
    setError(null);

    const treatment = form.treatment ? t(`treatment.${form.treatment}.name`) : t('form.treatmentUnsure');
    const text = t('form.waMessage', {
      name: form.name.trim(),
      country: form.country.trim() || '—',
      treatment,
      message: form.message.trim(),
      phone: form.phone.trim(),
    }).replace(/\s{2,}/g, ' ');
    window.open(whatsappUrl(text), '_blank', 'noopener,noreferrer');
  }

  return (
    <section className="section" id="contact">
      <div className="container contact-grid">
        <div>
          <h2>{t('contact.title')}</h2>
          <p className="section-lead">{t('contact.subtitle')}</p>

          <form className="form" onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor={`${id}-name`}>{t('form.name')} *</label>
              <input id={`${id}-name`} autoComplete="name" required value={form.name} onChange={(e) => update('name', e.target.value)} />
            </div>
            <div className="field-row">
              <div className="field">
                <label htmlFor={`${id}-phone`}>{t('form.phone')} *</label>
                <input id={`${id}-phone`} type="tel" autoComplete="tel" required value={form.phone} onChange={(e) => update('phone', e.target.value)} />
              </div>
              <div className="field">
                <label htmlFor={`${id}-country`}>{t('form.country')}</label>
                <input id={`${id}-country`} autoComplete="address-level2" value={form.country} onChange={(e) => update('country', e.target.value)} />
              </div>
            </div>
            <div className="field">
              <label htmlFor={`${id}-treatment`}>{t('form.treatment')}</label>
              <select
                id={`${id}-treatment`}
                value={form.treatment}
                onChange={(e) => update('treatment', e.target.value as TreatmentId | '')}
              >
                <option value="">{t('form.treatmentUnsure')}</option>
                {CLINIC.treatments.map((item) => (
                  <option key={item.id} value={item.id}>
                    {t(`treatment.${item.id}.name`)}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor={`${id}-message`}>{t('form.message')}</label>
              <textarea
                id={`${id}-message`}
                rows={3}
                aria-describedby={`${id}-hint`}
                value={form.message}
                onChange={(e) => update('message', e.target.value)}
              />
              <p id={`${id}-hint`} className="hint">
                {t('form.messageHint')}
              </p>
            </div>
            <label className="consent">
              <input type="checkbox" checked={form.consent} onChange={(e) => update('consent', e.target.checked)} />
              <span>
                {t('form.consent')}
                <a href={pageHref('privacy.html', lang)} target="_blank" rel="noopener">
                  {t('form.privacyLink')}
                </a>
                . *
              </span>
            </label>
            {error && (
              <p className="form-error" role="alert">
                {t(error)}
              </p>
            )}
            <button type="submit" className="btn btn-primary btn-lg btn-block">
              <WhatsAppIcon />
              {t('form.submit')}
            </button>
            <p className="hint">{t('form.note')}</p>
          </form>
        </div>

        <aside className="contact-info">
          <dl>
            <div>
              <dt>{t('contact.address')}</dt>
              <dd>
                {CLINIC.address}
                <br />
                <a href={CLINIC.mapsUrl} target="_blank" rel="noopener noreferrer">
                  {t('contact.openMap')} →
                </a>
              </dd>
            </div>
            <div>
              <dt>{t('contact.hours')}</dt>
              <dd>{t('contact.hoursValue')}</dd>
            </div>
            <div>
              <dt>{t('contact.phone')}</dt>
              <dd>
                <a href={`tel:${CLINIC.phoneHref}`}>{CLINIC.phoneDisplay}</a>
              </dd>
            </div>
            <div>
              <dt>{t('contact.email')}</dt>
              <dd>
                <a href={`mailto:${CLINIC.email}`}>{CLINIC.email}</a>
              </dd>
            </div>
          </dl>
          <div className="contact-buttons">
            <a className="btn btn-primary btn-block" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon /> {t('cta.whatsappShort')}
            </a>
            <a className="btn btn-ghost btn-block" href={`tel:${CLINIC.phoneHref}`}>
              <PhoneIcon /> {t('cta.call')}
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
