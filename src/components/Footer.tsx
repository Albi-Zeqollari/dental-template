import { CLINIC } from '../config';
import { pageHref } from '../format';
import { useLang } from '../lang';

export function Footer() {
  const { t, lang } = useLang();
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>
          © {new Date().getFullYear()} {CLINIC.name}. {t('footer.rights')}
        </p>
        <p>
          <a href={pageHref('privacy.html', lang)}>{t('footer.privacy')}</a> · {t('footer.noCookies')}
        </p>
      </div>
    </footer>
  );
}
