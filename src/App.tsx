import { Contact } from './components/Contact';
import { DemoBanner } from './components/Demo';
import { Faq } from './components/Faq';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { PriceTable } from './components/PriceTable';
import { Results } from './components/Results';
import { Reviews } from './components/Reviews';
import { StickyActions } from './components/StickyActions';
import { Team } from './components/Team';
import { Treatments } from './components/Treatments';
import { WhyUs } from './components/WhyUs';
import { useDocumentMeta } from './lang';

export function App() {
  useDocumentMeta('meta.title', 'meta.description');
  return (
    <>
      <DemoBanner />
      <Header />
      <main>
        <Hero />
        <Treatments />
        <PriceTable />
        <HowItWorks />
        <Results />
        <Team />
        <WhyUs />
        <Reviews />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <StickyActions />
    </>
  );
}
