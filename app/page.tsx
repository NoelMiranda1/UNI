import { Hero } from '@/components/hero';
import { NewsSection } from '@/components/news-section';
import { EventsSection } from '@/components/events-section';
import { MultimediaSection } from '@/components/multimedia-section';
import { QuickAccess } from '@/components/quick-access';
import { StatsSection } from '@/components/stats-section';

export default function Home() {
  return (
    <div>
      <Hero />
      <StatsSection />
      <QuickAccess />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <NewsSection />
        <div className="mt-16">
          {/* <div className="space-y-8"> */}
            <EventsSection />
          {/* </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">Multimedia</h2>
            <MultimediaSection />
          </div> */}
        </div>
      </div>
      
    </div>
  );
}