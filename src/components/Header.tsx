import { useState } from 'react';
import { CLINIC } from '../config';
import { whatsappUrl } from '../format';
import type { MessageKey } from '../i18n';
import { useLang } from '../lang';
import { MenuIcon, ToothIcon, WhatsAppIcon } from './Icons';
import { LanguageSwitcher } from './LanguageSwitcher';

const NAV: { href: string; key: MessageKey }[] = [
  { href: '#treatments', key: 'nav.treatments' },
  { href: '#prices', key: 'nav.prices' },
  { href: '#how', key: 'nav.how' },
  { href: '#reviews', key: 'nav.reviews' },
  { href: '#faq', key: 'nav.faq' },
  { href: '#contact', key: 'nav.contact' },
];

export function Logo({ href = '#top' }: { href?: string }) {
  return (
    <a className="logo" href={href}>
      <span className="logo-mark">
        <ToothIcon size={20} />
      </span>
      <span>
        {CLINIC.name}
        <small>{CLINIC.city}</small>
      </span>
    </a>
  );
}

export function Header() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Logo />
        <nav id="site-nav" className={open ? 'nav open' : 'nav'} aria-label="Main">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {t(item.key)}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <LanguageSwitcher />
          <a className="btn btn-primary btn-sm hide-mobile" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon size={18} />
            {t('cta.whatsappShort')}
          </a>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="site-nav"
            aria-label={t('nav.menu')}
            onClick={() => setOpen((v) => !v)}
          >
            <MenuIcon />
          </button>
        </div>
      </div>
    </header>
  );
}
