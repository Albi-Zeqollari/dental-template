import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { LangProvider } from './lang';
import { PrivacyPage } from './PrivacyPage';
import './styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LangProvider>
      <PrivacyPage />
    </LangProvider>
  </StrictMode>,
);
