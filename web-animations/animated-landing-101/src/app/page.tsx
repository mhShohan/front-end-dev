import { FeaturesSection } from '@/components/features.section';
import { HeroSection } from '@/components/hero-section';
import { StatsSection } from '@/components/states=section';

export default function Home() {
  return (
    <main className='min-h-screen'>
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      {/* Add more sections as needed */}
    </main>
  );
}
