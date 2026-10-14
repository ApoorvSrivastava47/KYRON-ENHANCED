import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { Hero } from './components/Hero';
import { MetricCards } from './components/MetricCards';
import { PredictionView } from './components/PredictionView';
import { AnalyticsView } from './components/AnalyticsView';
import { AboutView } from './components/AboutView';

export function App() {
  const [currentPage, setCurrentPage] = useState<'Prediction' | 'Analytics' | 'About Project'>(
    'Prediction'
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F9FB] text-slate-900 flex antialiased">
      {/* Sidebar */}
      <Sidebar
        currentPage={currentPage}
        onSelectPage={setCurrentPage}
        isOpenMobile={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen">
        {/* Mobile Header Bar */}
        <div className="md:hidden flex items-center justify-between px-5 py-3.5 bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 shadow-xs">
          <div className="font-extrabold text-base text-slate-900 tracking-tight flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5E00]" />
            <span>KYRON ENGINE</span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-100 hover:bg-orange-50 text-slate-700 hover:text-[#FF5E00] border border-slate-200 transition-colors"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Core Content Container */}
        <main className="flex-1 max-w-[1360px] w-full mx-auto px-4 sm:px-8 lg:px-10 py-8 sm:py-10">
          {/* Hero Section */}
          <Hero />

          {/* Metric Cards Banner */}
          <MetricCards />

          {/* Page Routing */}
          <div className="mt-2">
            {currentPage === 'Prediction' && <PredictionView />}
            {currentPage === 'Analytics' && <AnalyticsView />}
            {currentPage === 'About Project' && <AboutView />}
          </div>

          {/* Footer */}
          <footer className="mt-16 pt-8 pb-6 border-t border-slate-200 text-center text-xs text-slate-400">
            <p>
              KYRON &mdash; Workforce Stability Prediction &amp; Organizational Analytics Engine &middot; MNNIT Prayagraj
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default App;
