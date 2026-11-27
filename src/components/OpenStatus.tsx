import { useState } from 'react';
import { openState } from '../format';
import { LOCALES } from '../i18n';
import { useInterval } from '../hooks';
import { useLang } from '../lang';

/** "Open now" / "Closed now · we reopen tomorrow at 09:00", live in Tirana time. */
export function OpenStatus({ className = '' }: { className?: string }) {
  const { t, lang } = useLang();
  const [state, setState] = useState(openState);
  useInterval(() => setState(openState()), 60_000);

  let detail = '';
  if (state.open) {
    detail = t('open.nowDetail');
  } else if (state.inDays !== null) {
    const when =
      state.inDays === 0
        ? t('open.today')
        : state.inDays === 1
          ? t('open.tomorrow')
          : new Intl.DateTimeFormat(LOCALES[lang], { weekday: 'long' }).format(
              new Date(Date.now() + state.inDays * 86_400_000),
            );
    detail = t('open.closedDetail', { when, time: state.at });
  }

  return (
    <p className={`open-status ${state.open ? 'is-open' : 'is-closed'} ${className}`} role="status">
      <span className="open-dot" aria-hidden="true" />
      <strong>{state.open ? t('open.now') : t('open.closed')}</strong>
      {detail && <span> · {detail}</span>}
    </p>
  );
}
