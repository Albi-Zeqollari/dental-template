import type { ReactNode } from 'react';
import { CLINIC } from '../config';
import { useLang } from '../lang';

/** Renders only while CLINIC.demo is true. Wrap sample-only notes in it. */
export function DemoOnly({ children }: { children: ReactNode }) {
  return CLINIC.demo ? <>{children}</> : null;
}

export function DemoBanner() {
  const { t } = useLang();
  return (
    <DemoOnly>
      <div className="demo-banner" role="note">
        {t('demo.banner')}
      </div>
    </DemoOnly>
  );
}
